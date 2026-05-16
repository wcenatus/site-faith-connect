import "server-only";

import { cache } from "react";
import { prisma } from "@/lib/prisma";
import type { Event } from "@/types/event";

// Server-only loader for the events list. Server components `await getEvents()`
// directly so we skip the HTTP hop a route handler would impose. Wrapped in
// React.cache so multiple components rendered in the same request share a
// single query.
export const getEvents = cache(async (): Promise<Event[]> => {
  const rows = await prisma.event.findMany({
    orderBy: { startsAt: "asc" },
    include: {
      category: true,
      church: { select: { name: true } },
      rsvps: { select: { status: true } },
      reviews: { select: { score: true } },
    },
  });

  return rows.map((event) => {
    const goingCount = event.rsvps.filter((r) => r.status === "GOING").length;
    const interestedCount = event.rsvps.filter(
      (r) => r.status === "INTERESTED",
    ).length;

    const averageRating =
      event.reviews.length > 0
        ? event.reviews.reduce((sum, r) => sum + r.score, 0) /
          event.reviews.length
        : null;

    return {
      id: event.id,
      title: event.title,
      description: event.description,
      imageUrl: event.imageUrl,
      startsAt: event.startsAt.toISOString(),
      endsAt: event.endsAt ? event.endsAt.toISOString() : null,
      timezone: event.timezone,
      isInPerson: event.isInPerson,
      locationName: event.locationName,
      address: event.address,
      audience: event.audience,
      ageRestriction: event.ageRestriction,
      hostedBy: event.church?.name ?? event.locationName ?? null,
      category: event.category
        ? {
            id: event.category.id,
            slug: event.category.slug,
            title: event.category.title,
          }
        : null,
      goingCount,
      interestedCount,
      averageRating,
      // The list view doesn't ship attendee avatars; the detail loader does.
      attendeeAvatars: [],
    };
  });
});
