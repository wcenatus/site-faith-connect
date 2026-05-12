import { prisma } from "@/lib/prisma";
import type { Group, GetGroupsResponse } from "@/types/group";

const PREVIEW_MEMBER_LIMIT = 4;

export async function GET(): Promise<Response> {
  const rows = await prisma.group.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      category: true,
      church: { select: { name: true } },
      tags: { include: { tag: true } },
      members: {
        include: { user: { select: { name: true, avatarUrl: true } } },
      },
      reviews: { select: { score: true } },
    },
  });

  const groups: Group[] = rows.map((group) => {
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
      averageRating,
      ratingCount: group.reviews.length,
    };
  });

  const body: GetGroupsResponse = { groups };
  return Response.json(body);
}
