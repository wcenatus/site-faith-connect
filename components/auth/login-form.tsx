"use client";

import { useActionState, useId } from "react";
import { useFormStatus } from "react-dom";
import { login } from "@/server/auth/login";
import { INITIAL_LOGIN_STATE, type LoginState } from "@/types/login";
import { Button } from "@/components/button";
import { Field } from "@/components/field";

export function LoginForm() {
  const [state, formAction] = useActionState<LoginState, FormData>(
    login,
    INITIAL_LOGIN_STATE,
  );

  const emailId = useId();
  const passwordId = useId();

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <Field
        id={emailId}
        name="email"
        label="Email"
        type="email"
        required
        autoComplete="email"
        placeholder="you@example.com"
        defaultValue={state.values.email}
        error={state.errors.email}
      />

      <Field
        id={passwordId}
        name="password"
        label="Password"
        type="password"
        required
        autoComplete="current-password"
        placeholder="Enter your password"
        error={state.errors.password}
      />

      {state.status === "error" && state.message && (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
        >
          {state.message}
        </p>
      )}

      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      color="primary"
      size="md"
      className="mt-2 w-full"
      disabled={pending}
    >
      {pending ? "Logging in…" : "Log in"}
    </Button>
  );
}
