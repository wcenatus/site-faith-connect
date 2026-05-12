"use client";

import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { BasicSection } from "@/components/basic-section";
import { GroupCard, type TagColor } from "@/components/group-card";
import { getGroups, type Group } from "@/services/groups-service";

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

export const GroupsNearMe = () => {
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 2,
    loop: false,
  });

  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);
    setError(null);

    getGroups(controller.signal)
      .then((data) => setGroups(data))
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Unable to load groups");
      })
      .finally(() => setIsLoading(false));

    return () => controller.abort();
  }, []);

  return (
    <BasicSection title="Groups Near Me" highlightColor="violet" highlightText="See All">
      {isLoading && (
        <p className="text-sm text-slate-500">Loading groups…</p>
      )}

      {error && !isLoading && (
        <p className="text-sm text-rose-600">{error}</p>
      )}

      {!isLoading && !error && groups.length === 0 && (
        <p className="text-sm text-slate-500">No groups found.</p>
      )}

      {!isLoading && !error && groups.length > 0 && (
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-5">
            {groups.map((group) => (
              <div key={group.id} className="shrink-0">
                <GroupCard
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
      )}
    </BasicSection>
  );
};
