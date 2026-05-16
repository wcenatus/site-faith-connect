import "server-only";

import { cache } from "react";
import { prisma } from "@/lib/prisma";
import type { Group } from "@/types/group";

const PREVIEW_MEMBER_LIMIT = 4;

// Server-only loader for the groups list. Server components `await getGroups()`
// directly so we skip the HTTP hop a route handler would impose. Wrapped in
// React.cache so multiple components rendered in the same request share a
// single query.
export const getGroups = cache(async (): Promise<Group[]> => {
  const rows = await prisma.group.findMany({
    orderBy: { createdAt: "desc" },
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

  return rows.map((group) => {
    const memberCount = group.members.length;

    const previewMembers = group.members
      .filter((m) => m.user.avatarUrl)
      .slice(0, PREVIEW_MEMBER_LIMIT)
      .map((m) => ({
        name: m.user.name,
        avatarUrl: m.user.avatarUrl as string,
      }));

    const extraMemberCount = Math.max(0, memberCount - previewMembers.length);

    const averageRating =
      group.reviews.length > 0
        ? group.reviews.reduce((sum, r) => sum + r.score, 0) /
          group.reviews.length
        : null;

    return {
      id: group.id,
      name: group.name,
      description: group.description,
      coverImageUrl: group.coverImageUrl,
      iconName: group.iconName,
      city: group.city,
      address: group.church?.address ?? null,
      meetFrequency: group.meetFrequency,
      isActive: group.isActive,
      hostedBy: group.church?.name ?? null,
      category: group.category
        ? {
            id: group.category.id,
            slug: group.category.slug,
            title: group.category.title,
          }
        : null,
      tags: group.tags.map((gt) => ({
        label: gt.tag.label,
        color: gt.tag.color,
      })),
      memberCount,
      previewMembers,
      extraMemberCount,
      // The list view doesn't ship wide member avatars; the detail loader does.
      memberAvatars: [],
      averageRating,
      ratingCount: group.reviews.length,
    };
  });
});
