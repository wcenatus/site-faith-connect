"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import {
  EMPTY_CREATE_EVENT_VALUES,
  type CreateEventFieldErrors,
  type CreateEventState,
  type CreateEventValues,
} from "@/types/create-event";

function readString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function readBool(formData: FormData, key: string): boolean {
  // Standard HTML checkbox behavior: present in FormData iff checked.
  return formData.has(key);
}

function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

// `datetime-local` produces strings like "2026-05-20T19:00" (no tz). `new Date`
// interprets these as local time, which is what we want for now.
function parseDateTimeLocal(value: string): Date | null {
  if (!value) return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export async function createEvent(
  _prevState: CreateEventState,
  formData: FormData
): Promise<CreateEventState> {
  const values: CreateEventValues = {
    title: readString(formData, "title"),
    description: readString(formData, "description"),
    startsAt: readString(formData, "startsAt"),
    endsAt: readString(formData, "endsAt"),
    isInPerson: readBool(formData, "isInPerson"),
    locationName: readString(formData, "locationName"),
    address: readString(formData, "address"),
    audience: readString(formData, "audience"),
    ageRestriction: readString(formData, "ageRestriction"),
    imageUrl: readString(formData, "imageUrl"),
    categoryId: readString(formData, "categoryId"),
  };

  const errors: CreateEventFieldErrors = {};

  if (!values.title) {
    errors.title = "Title is required.";
  } else if (values.title.length < 3) {
    errors.title = "Title must be at least 3 characters.";
  } else if (values.title.length > 120) {
    errors.title = "Title must be 120 characters or fewer.";
  }

  if (values.description && values.description.length > 1000) {
    errors.description = "Description must be 1000 characters or fewer.";
  }

  if (!values.categoryId) {
    errors.categoryId = "Pick a category.";
  }

  const startsAtDate = parseDateTimeLocal(values.startsAt);
  if (!values.startsAt) {
    errors.startsAt = "Start date and time is required.";
  } else if (!startsAtDate) {
    errors.startsAt = "Enter a valid start date and time.";
  }

  const endsAtDate = parseDateTimeLocal(values.endsAt);
  if (values.endsAt && !endsAtDate) {
    errors.endsAt = "Enter a valid end date and time.";
  } else if (startsAtDate && endsAtDate && endsAtDate <= startsAtDate) {
    errors.endsAt = "End must be after start.";
  }

  if (values.isInPerson && !values.locationName) {
    errors.locationName = "Location name is required for in-person events.";
  }

  if (values.imageUrl && !isValidUrl(values.imageUrl)) {
    errors.imageUrl = "Enter a valid http(s) URL.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      errors,
      values,
    };
  }

  // No auth yet — pick a deterministic creator so the FK is satisfied.
  const creator = await prisma.user.findFirst({
    orderBy: { createdAt: "asc" },
  });
  if (!creator) {
    return {
      status: "error",
      message: "No users exist yet. Seed the database before creating events.",
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
    const event = await prisma.event.create({
      data: {
        title: values.title,
        description: values.description || null,
        imageUrl: values.imageUrl || null,
        // Validation above guarantees startsAtDate is non-null.
        startsAt: startsAtDate as Date,
        endsAt: endsAtDate ?? null,
        isInPerson: values.isInPerson,
        locationName: values.locationName || null,
        address: values.address || null,
        audience: values.audience || null,
        ageRestriction: values.ageRestriction || null,
        category: { connect: { id: category.id } },
        createdBy: { connect: { id: creator.id } },
      },
    });

    revalidatePath("/");
    revalidatePath("/event/[id]", "page");

    return {
      status: "success",
      message: `Created "${event.title}".`,
      errors: {},
      values: EMPTY_CREATE_EVENT_VALUES,
      createdEventId: event.id,
    };
  } catch (error) {
    console.error("Failed to create event", error);
    return {
      status: "error",
      message: "Something went wrong creating the event. Please try again.",
      errors: {},
      values,
    };
  }
}
