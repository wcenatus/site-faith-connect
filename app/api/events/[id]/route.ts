import { prisma } from "@/lib/prisma";
import type { Event, GetEventResponse } from "@/types/event";

export async function GET(
  _request: Request,
  { params }: RouteContext<"/api/events/[id]">,
): Promise<Response> {
  const { id } = await params;

  const row = await prisma.event.findUnique({
    where: { id },
    include: {
      category: true,
      church: { select: { name: true } },
      rsvps: {
        select: {
          status: true,
          user: { select: { avatarUrl: true } },
        },
      },
      reviews: { select: { score: true } },
    },
  });

  if (!row) {
    return Response.json({ error: "Event not found" }, { status: 404 });
  }

  const goingCount = row.rsvps.filter((r) => r.status === "GOING").length;
  const interestedCount = row.rsvps.filter(
    (r) => r.status === "INTERESTED",
  ).length;

  const averageRating =
    row.reviews.length > 0
      ? row.reviews.reduce((sum, r) => sum + r.score, 0) / row.reviews.length
      : null;

  // Surface up to ~12 attendee avatars for hero/details strips.
  const attendeeAvatars = row.rsvps
    .filter((r) => r.status === "GOING" && r.user.avatarUrl)
    .map((r) => r.user.avatarUrl as string)
    .slice(0, 12);

  const event: Event = {
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

  const body: GetEventResponse = { event };
  return Response.json(body);
}
