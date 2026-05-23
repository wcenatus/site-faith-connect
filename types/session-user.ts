import type { Session } from "next-auth";

export type SessionUser = NonNullable<Session["user"]>;

export function getInitials(name: string | null | undefined): string {
  if (!name?.trim()) {
    return "?";
  }

  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
    .slice(0, 2);
}
