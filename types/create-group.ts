// Shared types + initial state for the Create Group flow.
// Kept in a plain module (no "use server" directive) so the client receives the
// real values — a "use server" file may only export async functions, and every
// non-async export is replaced with a server reference at build time.

export type CreateGroupFieldErrors = Partial<{
  name: string;
  description: string;
  city: string;
  meetFrequency: string;
  iconName: string;
  coverImageUrl: string;
  categoryId: string;
}>;

export type CreateGroupValues = {
  name: string;
  description: string;
  city: string;
  meetFrequency: string;
  iconName: string;
  coverImageUrl: string;
  categoryId: string;
};

export type CreateGroupState = {
  status: "idle" | "success" | "error";
  message: string;
  errors: CreateGroupFieldErrors;
  // Echo back the submitted values so the client can re-populate the form
  // when validation fails. Untouched on success.
  values: CreateGroupValues;
  // Populated on success so client can react (e.g. close the modal, route).
  createdGroupId?: string;
};

export const EMPTY_CREATE_GROUP_VALUES: CreateGroupValues = {
  name: "",
  description: "",
  city: "",
  meetFrequency: "",
  iconName: "",
  coverImageUrl: "",
  categoryId: "",
};

export const INITIAL_CREATE_GROUP_STATE: CreateGroupState = {
  status: "idle",
  message: "",
  errors: {},
  values: EMPTY_CREATE_GROUP_VALUES,
};
