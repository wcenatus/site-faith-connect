import type { GetGroupsResponse, Group } from "@/types/group";

export type { Group };

// Calls GET /api/groups and returns the list of groups.
// Designed for client-side use (relative URL hits the same Next.js origin).
export async function getGroups(signal?: AbortSignal): Promise<Group[]> {
  const res = await fetch("/api/groups", {
    method: "GET",
    headers: { Accept: "application/json" },
    signal,
  });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch groups: ${res.status} ${res.statusText}`,
    );
  }

  const body = (await res.json()) as GetGroupsResponse;
  return body.groups;
}
