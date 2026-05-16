"use client";

import useEmblaCarousel from "embla-carousel-react";
import { GroupCard, type TagColor } from "@/components/group-card";
import type { Group } from "@/types/group";

const KNOWN_TAG_COLORS: readonly TagColor[] = [
  "purple",
  "green",
  "orange",
  "blue",
  "violet",
  "cyan",
];

// Narrow the free-form color string coming from the DB into the TagColor union
// the GroupCard understands. Unknown values fall back to "violet".
function toTagColor(color: string): TagColor {
  return (KNOWN_TAG_COLORS as readonly string[]).includes(color)
    ? (color as TagColor)
    : "violet";
}

type GroupsCarouselProps = {
  groups: Group[];
};

export const GroupsCarousel = ({ groups }: GroupsCarouselProps) => {
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 2,
    loop: false,
  });

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex gap-5">
        {groups.map((group) => (
          <div key={group.id} className="shrink-0">
            <GroupCard
              href={`/group/${group.id}`}
              category={group.category?.title ?? "Group"}
              coverImageUrl={group.coverImageUrl ?? ""}
              coverImageAlt={group.name}
              groupIconName={group.iconName ?? undefined}
              groupName={group.name}
              description={group.description ?? ""}
              memberCount={group.memberCount}
              location={group.city ?? group.hostedBy ?? "—"}
              meetFrequency={group.meetFrequency ?? "—"}
              isActive={group.isActive}
              tags={group.tags.map((tag) => ({
                label: tag.label,
                color: toTagColor(tag.color),
              }))}
              previewMembers={group.previewMembers.map((m) => ({
                name: m.name,
                imageUrl: m.avatarUrl,
              }))}
              extraMemberCount={group.extraMemberCount}
              rating={group.averageRating ?? 0}
              ratingCount={group.ratingCount}
              friendsInGroup={0}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
