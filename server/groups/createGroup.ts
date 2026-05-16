"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import {
  EMPTY_CREATE_GROUP_VALUES,
  type CreateGroupFieldErrors,
  type CreateGroupState,
} from "@/types/create-group";

function readString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

// Server Action that backs the Create Group form. Using the `useActionState`
// signature: receives the previous state, returns the next state.
export async function createGroup(
  _prevState: CreateGroupState,
  formData: FormData
): Promise<CreateGroupState> {
  const values = {
    name: readString(formData, "name"),
    description: readString(formData, "description"),
    city: readString(formData, "city"),
    meetFrequency: readString(formData, "meetFrequency"),
    iconName: readString(formData, "iconName"),
    coverImageUrl: readString(formData, "coverImageUrl"),
    categoryId: readString(formData, "categoryId"),
  };

  const errors: CreateGroupFieldErrors = {};

  if (!values.name) {
    errors.name = "Name is required.";
  } else if (values.name.length < 3) {
    errors.name = "Name must be at least 3 characters.";
  } else if (values.name.length > 80) {
    errors.name = "Name must be 80 characters or fewer.";
  }

  if (values.description && values.description.length > 500) {
    errors.description = "Description must be 500 characters or fewer.";
  }

  if (!values.categoryId) {
    errors.categoryId = "Pick a category.";
  }

  if (values.coverImageUrl && !isValidUrl(values.coverImageUrl)) {
    errors.coverImageUrl = "Enter a valid http(s) URL.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      errors,
      values,
    };
  }

  // No auth yet — pick a deterministic owner so created groups have a member
  // and the home page can render them through the existing loader.
  const owner = await prisma.user.findFirst({ orderBy: { createdAt: "asc" } });
  if (!owner) {
    return {
      status: "error",
      message: "No users exist yet. Seed the database before creating groups.",
      errors: {},
      values,
    };
  }

  const category = await prisma.category.findUnique({
    where: { id: values.categoryId },
  });
  if (!category) {
    return {
      status: "error",
      message: "That category no longer exists.",
      errors: { categoryId: "Pick a category." },
      values,
    };
  }

  try {
    const group = await prisma.group.create({
      data: {
        name: values.name,
        description: values.description || null,
        city: values.city || null,
        meetFrequency: values.meetFrequency || null,
        iconName: values.iconName || category.iconName,
        coverImageUrl: values.coverImageUrl || null,
        isActive: true,
        category: { connect: { id: category.id } },
        owner: { connect: { id: owner.id } },
        members: {
          create: { userId: owner.id, role: "OWNER" },
        },
      },
    });

    revalidatePath("/");
    revalidatePath("/group/[id]", "page");

    return {
      status: "success",
      message: `Created "${group.name}".`,
      errors: {},
      values: EMPTY_CREATE_GROUP_VALUES,
      createdGroupId: group.id,
    };
  } catch (error) {
    console.error("Failed to create group", error);
    return {
      status: "error",
      message: "Something went wrong creating the group. Please try again.",
      errors: {},
      values,
    };
  }
}
