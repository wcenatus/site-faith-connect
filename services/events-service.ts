import type {
  Event,
  GetEventResponse,
  GetEventsResponse,
} from "@/types/event";

export type { Event };

// Calls GET /api/events and returns the list of events.
// Designed for client-side use (relative URL hits the same Next.js origin).
export async function getEvents(signal?: AbortSignal): Promise<Event[]> {
  const res = await fetch("/api/events", {
    method: "GET",
    headers: { Accept: "application/json" },
    signal,
  });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch events: ${res.status} ${res.statusText}`,
    );
  }

  const body = (await res.json()) as GetEventsResponse;
  return body.events;
}

// Calls GET /api/events/:id and returns a single event, or null if missing.
export async function getEvent(
  id: string,
  signal?: AbortSignal,
): Promise<Event | null> {
  const res = await fetch(`/api/events/${encodeURIComponent(id)}`, {
    method: "GET",
    headers: { Accept: "application/json" },
    signal,
  });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error(
      `Failed to fetch event: ${res.status} ${res.statusText}`,
    );
  }

  const body = (await res.json()) as GetEventResponse;
  return body.event;
}
