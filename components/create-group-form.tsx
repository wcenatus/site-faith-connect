"use client";

import { useActionState, useEffect, useId } from "react";
import { useFormStatus } from "react-dom";
import { createGroup } from "@/server/groups/createGroup";
import {
  INITIAL_CREATE_GROUP_STATE,
  type CreateGroupState,
} from "@/types/create-group";
import type { CategoryOption } from "@/server/categories/getCategories";
import { Button } from "@/components/button";
import { Field } from "@/components/field";

export type CreateGroupFormProps = {
  categories: CategoryOption[];
  /** Fires once the action returns a successful state. */
  onSuccess?: (groupId: string | undefined) => void;
  /** Called when the user clicks the secondary "Cancel" button. */
  onCancel?: () => void;
};

export function CreateGroupForm({
  categories,
  onSuccess,
  onCancel,
}: CreateGroupFormProps) {
  const [state, formAction] = useActionState<CreateGroupState, FormData>(
    createGroup,
    INITIAL_CREATE_GROUP_STATE
  );

  useEffect(() => {
    if (state.status === "success") {
      onSuccess?.(state.createdGroupId);
    }
  }, [state.status, state.createdGroupId, onSuccess]);

  const nameId = useId();
  const descriptionId = useId();
  const cityId = useId();
  const frequencyId = useId();
  const iconId = useId();
  const coverId = useId();
  const categoryId = useId();

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <Field
        id={nameId}
        name="name"
        label="Group name"
        required
        defaultValue={state.values.name}
        error={state.errors.name}
        placeholder="Tuesday Bible Study"
      />

      <Field
        id={categoryId}
        name="categoryId"
        label="Category"
        required
        error={state.errors.categoryId}
        defaultValue={state.values.categoryId}
        as="select"
      >
        <option value="">Select a category…</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.title}
          </option>
        ))}
      </Field>

      <Field
        id={descriptionId}
        name="description"
        label="Description"
        as="textarea"
        rows={3}
        defaultValue={state.values.description}
        error={state.errors.description}
        placeholder="What is this group about? Who is it for?"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field
          id={cityId}
          name="city"
          label="City"
          defaultValue={state.values.city}
          error={state.errors.city}
          placeholder="Atlanta, GA"
        />
        <Field
          id={frequencyId}
          name="meetFrequency"
          label="Meets"
          defaultValue={state.values.meetFrequency}
          error={state.errors.meetFrequency}
          placeholder="Every Tuesday at 7pm"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field
          id={iconId}
          name="iconName"
          label="Icon name"
          defaultValue={state.values.iconName}
          error={state.errors.iconName}
          placeholder="mdi:book-open-variant"
          hint="Any Iconify icon name. Defaults to the category icon."
        />
        <Field
          id={coverId}
          name="coverImageUrl"
          label="Cover image URL"
          type="url"
          defaultValue={state.values.coverImageUrl}
          error={state.errors.coverImageUrl}
          placeholder="https://…"
        />
      </div>

      {state.status === "error" && state.message && (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
        >
          {state.message}
        </p>
      )}
      {state.status === "success" && state.message && (
        <p
          role="status"
          className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700"
        >
          {state.message}
        </p>
      )}

      <div className="mt-1 flex items-center justify-end gap-2">
        {onCancel && (
          <Button
            type="button"
            color="outline"
            size="md"
            onClick={onCancel}
          >
            Cancel
          </Button>
        )}
        <SubmitButton />
      </div>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" color="primary" size="md" disabled={pending}>
      {pending ? "Creating…" : "Create group"}
    </Button>
  );
}

