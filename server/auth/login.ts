"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { type LoginFieldErrors, type LoginState } from "@/types/login";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function readPassword(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

export async function login(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = readString(formData, "email").toLowerCase();
  const password = readPassword(formData, "password");

  const values = { email };
  const errors: LoginFieldErrors = {};

  if (!email) {
    errors.email = "Email is required.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!password) {
    errors.password = "Password is required.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      errors,
      values,
    };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        status: "error",
        message: "Invalid email or password.",
        errors: {},
        values,
      };
    }

    throw error;
  }

  // Unreachable — signIn redirects on success.
  return {
    status: "idle",
    message: "",
    errors: {},
    values: { email: "" },
  };
}
