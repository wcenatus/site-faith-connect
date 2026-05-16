"use client";

import { useActionState, useEffect, useId } from "react";
import { useFormStatus } from "react-dom";
import { createEvent } from "@/server/events/createEvent";
import {
  INITIAL_CREATE_EVENT_STATE,
  type CreateEventState,
} from "@/types/create-event";
import type { CategoryOption } from "@/server/categories/getCategories";
import { Button } from "@/components/button";

export type CreateEventFormProps = {
  categories: CategoryOption[];
  /** Fires once the action returns a successful state. */
  onSuccess?: (eventId: string | undefined) => void;
  /** Called when the user clicks the secondary "Cancel" button. */
  onCancel?: () => void;
};

export function CreateEventForm({
  categories,
  onSuccess,
  onCancel,
}: CreateEventFormProps) {
  const [state, formAction] = useActionState<CreateEventState, FormData>(
    createEvent,
    INITIAL_CREATE_EVENT_STATE
  );

  useEffect(() => {
    if (state.status === "success") {
      onSuccess?.(state.createdEventId);
    }
  }, [state.status, state.createdEventId, onSuccess]);

  const titleId = useId();
  const categoryFieldId = useId();
  const descriptionId = useId();
  const startsAtId = useId();
  const endsAtId = useId();
  const isInPersonId = useId();
  const locationNameId = useId();
  const addressId = useId();
  const audienceId = useId();
  const ageRestrictionId = useId();
  const imageUrlId = useId();

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <Field
        id={titleId}
        name="title"
        label="Event title"
        required
        defaultValue={state.values.title}
        error={state.errors.title}
        placeholder="Sunday Worship Service"
      />

      <Field
        id={categoryFieldId}
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
        placeholder="What's happening, and who should come?"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field
          id={startsAtId}
          name="startsAt"
          label="Starts"
          type="datetime-local"
          required
          defaultValue={state.values.startsAt}
          error={state.errors.startsAt}
        />
        <Field
          id={endsAtId}
          name="endsAt"
          label="Ends"
          type="datetime-local"
          defaultValue={state.values.endsAt}
          error={state.errors.endsAt}
          hint="Optional."
        />
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor={isInPersonId}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-700"
        >
          <input
            id={isInPersonId}
            type="checkbox"
            name="isInPerson"
            defaultChecked={state.values.isInPerson}
            className="h-4 w-4 rounded border-slate-300 text-[#2c4a32] focus:ring-[#2c4a32]/30"
          />
          In-person event
        </label>
        {state.errors.isInPerson && (
          <p className="text-xs text-red-600">{state.errors.isInPerson}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field
          id={locationNameId}
          name="locationName"
          label="Location name"
          defaultValue={state.values.locationName}
          error={state.errors.locationName}
          placeholder="Grace Community Church"
          hint="Required for in-person events."
        />
        <Field
          id={addressId}
          name="address"
          label="Address"
          defaultValue={state.values.address}
          error={state.errors.address}
          placeholder="123 Main St, Atlanta, GA"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field
          id={audienceId}
          name="audience"
          label="Audience"
          defaultValue={state.values.audience}
          error={state.errors.audience}
          placeholder="Women only"
        />
        <Field
          id={ageRestrictionId}
          name="ageRestriction"
          label="Age restriction"
          defaultValue={state.values.ageRestriction}
          error={state.errors.ageRestriction}
          placeholder="Ages 18+"
        />
      </div>

      <Field
        id={imageUrlId}
        name="imageUrl"
        label="Cover image URL"
        type="url"
        defaultValue={state.values.imageUrl}
        error={state.errors.imageUrl}
        placeholder="https://…"
      />

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
      {pending ? "Creating…" : "Create event"}
    </Button>
  );
}

type BaseFieldProps = {
  id: string;
  name: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  defaultValue?: string;
  placeholder?: string;
};

type InputFieldProps = BaseFieldProps & {
  as?: "input";
  type?: string;
};

type TextareaFieldProps = BaseFieldProps & {
  as: "textarea";
  rows?: number;
};

type SelectFieldProps = BaseFieldProps & {
  as: "select";
  children: React.ReactNode;
};

type FieldProps = InputFieldProps | TextareaFieldProps | SelectFieldProps;

function Field(props: FieldProps) {
  const {
    id,
    name,
    label,
    required,
    error,
    hint,
    defaultValue,
    placeholder,
  } = props;

  const baseControlClass = [
    "w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400",
    "focus:outline-none focus:ring-2 focus:ring-[#2c4a32]/30",
    error
      ? "border-red-300 focus:border-red-400"
      : "border-slate-200 focus:border-[#2c4a32]/50",
  ].join(" ");

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={id}
        className="text-sm font-medium text-slate-700"
      >
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>

      {props.as === "textarea" ? (
        <textarea
          id={id}
          name={name}
          required={required}
          defaultValue={defaultValue}
          placeholder={placeholder}
          rows={props.rows ?? 3}
          className={baseControlClass}
        />
      ) : props.as === "select" ? (
        <select
          id={id}
          name={name}
          required={required}
          defaultValue={defaultValue ?? ""}
          className={baseControlClass}
        >
          {props.children}
        </select>
      ) : (
        <input
          id={id}
          name={name}
          type={props.type ?? "text"}
          required={required}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className={baseControlClass}
        />
      )}

      {error ? (
        <p className="text-xs text-red-600">{error}</p>
      ) : hint ? (
        <p className="text-xs text-slate-500">{hint}</p>
      ) : null}
    </div>
  );
}
