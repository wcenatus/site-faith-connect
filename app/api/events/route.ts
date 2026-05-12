import { prisma } from "@/lib/prisma";
import type { Event, GetEventsResponse } from "@/types/event";

export async function GET(): Promise<Response> {
  const rows = await prisma.event.findMany({
    orderBy: { startsAt: "asc" },
    include: {
      category: true,
      church: { select: { name: true } },
      rsvps: { select: { status: true } },
      reviews: { select: { score: true } },
    },
  });

  const events: Event[] = rows.map((event) => {
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
      // The list view doesn't show avatars; the detail endpoint fills this in.
      attendeeAvatars: [],
    };
  });

  const body: GetEventsResponse = { events };
  return Response.json(body);
}
