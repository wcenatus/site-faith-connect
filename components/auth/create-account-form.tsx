"use client";

import { useActionState, useId } from "react";
import { useFormStatus } from "react-dom";
import { createAccount } from "@/server/auth/createAccount";
import {
  INITIAL_CREATE_ACCOUNT_STATE,
  type CreateAccountState,
} from "@/types/create-account";
import { Button } from "@/components/button";
import { Field } from "@/components/field";

export function CreateAccountForm() {
  const [state, formAction] = useActionState<CreateAccountState, FormData>(
    createAccount,
    INITIAL_CREATE_ACCOUNT_STATE,
  );

  const nameId = useId();
  const emailId = useId();
  const passwordId = useId();
  const confirmPasswordId = useId();

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <Field
        id={nameId}
        name="name"
        label="Full name"
        required
        autoComplete="name"
        placeholder="Sarah Mitchell"
        defaultValue={state.values.name}
        error={state.errors.name}
      />

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
        autoComplete="new-password"
        placeholder="Create a password"
        hint="Use at least 8 characters."
        error={state.errors.password}
      />

      <Field
        id={confirmPasswordId}
        name="confirmPassword"
        label="Confirm password"
        type="password"
        required
        autoComplete="new-password"
        placeholder="Re-enter your password"
        error={state.errors.confirmPassword}
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
      {pending ? "Creating account…" : "Create account"}
    </Button>
  );
}
