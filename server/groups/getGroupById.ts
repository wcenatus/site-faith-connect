import "server-only";

import { cache } from "react";
import { prisma } from "@/lib/prisma";
import type { Group } from "@/types/group";

const PREVIEW_MEMBER_LIMIT = 4;
const MEMBER_AVATAR_LIMIT = 12;

// Server-only loader for a single group. Returns null if the group doesn't
// exist so callers can decide between an inline message and a 404 boundary.
// Wrapped in React.cache so multiple server components rendered in the same
// request (e.g. metadata + page) share a single query.
export const getGroupById = cache(async (id: string): Promise<Group | null> => {
  const row = await prisma.group.findUnique({
    where: { id },
    include: {
      category: true,
      church: { select: { name: true, address: true } },
      tags: { include: { tag: true } },
      members: {
        include: { user: { select: { name: true, avatarUrl: true } } },
      },
      reviews: { select: { score: true } },
    },
  });

  if (!row) {
    return null;
  }

  const memberCount = row.members.length;

  const previewMembers = row.members
    .filter((m) => m.user.avatarUrl)
    .slice(0, PREVIEW_MEMBER_LIMIT)
    .map((m) => ({
      name: m.user.name,
      avatarUrl: m.user.avatarUrl as string,
    }));

  const extraMemberCount = Math.max(0, memberCount - previewMembers.length);

  // Capped strip of member avatars for the "Members" people grid on the
  // detail page. Mirrors the attendee-avatar strip on the event detail page.
  const memberAvatars = row.members
    .filter((m) => m.user.avatarUrl)
    .map((m) => m.user.avatarUrl as string)
    .slice(0, MEMBER_AVATAR_LIMIT);

  const averageRating =
    row.reviews.length > 0
      ? row.reviews.reduce((sum, r) => sum + r.score, 0) / row.reviews.length
      : null;

  return {
    id: row.id,
    name: row.name,
    description: row.description,
    coverImageUrl: row.coverImageUrl,
    iconName: row.iconName,
    city: row.city,
    address: row.church?.address ?? null,
    meetFrequency: row.meetFrequency,
    isActive: row.isActive,
    hostedBy: row.church?.name ?? null,
    category: row.category
      ? {
          id: row.category.id,
          slug: row.category.slug,
          title: row.category.title,
        }
      : null,
    tags: row.tags.map((gt) => ({
      label: gt.tag.label,
      color: gt.tag.color,
    })),
    memberCount,
    previewMembers,
    extraMemberCount,
    memberAvatars,
    averageRating,
    ratingCount: row.reviews.length,
  };
});
