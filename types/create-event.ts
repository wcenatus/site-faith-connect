// Shared types + initial state for the Create Event flow.
// Plain module (no "use server" directive) so the client receives the real
// values — a "use server" file may only export async functions.

export type CreateEventFieldErrors = Partial<{
  title: string;
  description: string;
  startsAt: string;
  endsAt: string;
  locationName: string;
  address: string;
  audience: string;
  ageRestriction: string;
  imageUrl: string;
  categoryId: string;
  isInPerson: string;
}>;

export type CreateEventValues = {
  title: string;
  description: string;
  // `startsAt` / `endsAt` are stored as the raw `datetime-local` strings the
  // user typed (e.g. "2026-05-20T19:00"). The server action parses them.
  startsAt: string;
  endsAt: string;
  isInPerson: boolean;
  locationName: string;
  address: string;
  audience: string;
  ageRestriction: string;
  imageUrl: string;
  categoryId: string;
};

export type CreateEventState = {
  status: "idle" | "success" | "error";
  message: string;
  errors: CreateEventFieldErrors;
  values: CreateEventValues;
  createdEventId?: string;
};

export const EMPTY_CREATE_EVENT_VALUES: CreateEventValues = {
  title: "",
  description: "",
  startsAt: "",
  endsAt: "",
  isInPerson: true,
  locationName: "",
  address: "",
  audience: "",
  ageRestriction: "",
  imageUrl: "",
  categoryId: "",
};

export const INITIAL_CREATE_EVENT_STATE: CreateEventState = {
  status: "idle",
  message: "",
  errors: {},
  values: EMPTY_CREATE_EVENT_VALUES,
};
