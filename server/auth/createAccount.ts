"use server";

import { redirect } from "next/navigation";
import { hashPassword } from "@/lib/password";
import { prisma } from "@/lib/prisma";
import {
  type CreateAccountFieldErrors,
  type CreateAccountState,
} from "@/types/create-account";

const MIN_PASSWORD_LENGTH = 8;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function readPassword(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

export async function createAccount(
  _prevState: CreateAccountState,
  formData: FormData,
): Promise<CreateAccountState> {
  const name = readString(formData, "name");
  const email = readString(formData, "email").toLowerCase();
  const password = readPassword(formData, "password");
  const confirmPassword = readPassword(formData, "confirmPassword");

  const values = { name, email };
  const errors: CreateAccountFieldErrors = {};

  if (!name) {
    errors.name = "Name is required.";
  } else if (name.length < 2) {
    errors.name = "Name must be at least 2 characters.";
  } else if (name.length > 100) {
    errors.name = "Name must be 100 characters or fewer.";
  }

  if (!email) {
    errors.email = "Email is required.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!password) {
    errors.password = "Password is required.";
  } else if (password.length < MIN_PASSWORD_LENGTH) {
    errors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`;
  }

  if (!confirmPassword) {
    errors.confirmPassword = "Please confirm your password.";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      errors,
      values,
    };
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });

  if (existingUser) {
    return {
      status: "error",
      message: "An account with this email already exists.",
      errors: { email: "This email is already registered." },
      values,
    };
  }

  try {
    const passwordHash = await hashPassword(password);

    await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
      },
    });
  } catch (error) {
    console.error("Failed to create account", error);
    return {
      status: "error",
      message: "Something went wrong creating your account. Please try again.",
      errors: {},
      values,
    };
  }

  redirect("/login?registered=1");
}
