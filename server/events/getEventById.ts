import "server-only";

import { cache } from "react";
import { prisma } from "@/lib/prisma";
import type { Event } from "@/types/event";

const ATTENDEE_AVATAR_LIMIT = 12;

// Server-only loader for a single event. Returns null if the event doesn't
// exist so callers can decide between an inline message and a 404 boundary.
// Wrapped in React.cache so multiple server components rendered in the same
// request (e.g. metadata + page) share a single query.
export const getEventById = cache(async (id: string): Promise<Event | null> => {
  const row = await prisma.event.findUnique({
    where: { id },
    include: {
      category: true,
      church: { select: { name: true } },
      rsvps: {
        select: {
          status: true,
          user: { select: { image: true } },
        },
      },
      reviews: { select: { score: true } },
    },
  });

  if (!row) {
    return null;
  }

  const goingCount = row.rsvps.filter((r) => r.status === "GOING").length;
  const interestedCount = row.rsvps.filter(
    (r) => r.status === "INTERESTED",
  ).length;

  const averageRating =
    row.reviews.length > 0
      ? row.reviews.reduce((sum, r) => sum + r.score, 0) / row.reviews.length
      : null;

  // Surface a capped strip of attendee avatars for the hero / details panels.
  const attendeeAvatars = row.rsvps
    .filter((r) => r.status === "GOING" && r.user.image)
    .map((r) => r.user.image as string)
    .slice(0, ATTENDEE_AVATAR_LIMIT);

  return {
    id: row.id,
    title: row.title,
    description: row.description,
    imageUrl: row.imageUrl,
    startsAt: row.startsAt.toISOString(),
    endsAt: row.endsAt ? row.endsAt.toISOString() : null,
    timezone: row.timezone,
    isInPerson: row.isInPerson,
    locationName: row.locationName,
    address: row.address,
    audience: row.audience,
    ageRestriction: row.ageRestriction,
    hostedBy: row.church?.name ?? row.locationName ?? null,
    category: row.category
      ? {
          id: row.category.id,
          slug: row.category.slug,
          title: row.category.title,
        }
      : null,
    goingCount,
    interestedCount,
    averageRating,
    attendeeAvatars,
  };
});
