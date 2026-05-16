import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";

export type TagColor =
  | "purple"
  | "green"
  | "orange"
  | "blue"
  | "violet"
  | "cyan";

const tagStyles: Record<TagColor, string> = {
  purple: "bg-purple-50 text-purple-500",
  violet: "bg-violet-50 text-violet-500",
  green: "bg-green-50 text-green-500",
  orange: "bg-orange-50 text-orange-500",
  blue: "bg-sky-50 text-sky-500",
  cyan: "bg-cyan-50 text-cyan-500",
};

export type GroupTag = {
  label: string;
  color: TagColor;
};

export type GroupMemberPreview = {
  imageUrl: string;
  name: string;
};

export type GroupCardProps = {
  category: string;
  coverImageUrl: string;
  coverImageAlt?: string;
  groupIconName?: string;
  groupName: string;
  description: string;
  memberCount: number;
  location: string;
  meetFrequency: string;
  isActive: boolean;
  tags: GroupTag[];
  previewMembers: GroupMemberPreview[];
  extraMemberCount?: number;
  rating: number;
  ratingCount: number;
  friendsInGroup: number;
  onFavorite?: () => void;
  onViewGroup?: () => void;
  /** When provided, "View Group" renders as a Link to this href. */
  href?: string;
};

export function GroupCard({
  category,
  coverImageUrl,
  coverImageAlt = "",
  groupIconName = "mdi:leaf",
  groupName,
  description,
  memberCount,
  location,
  meetFrequency,
  isActive,
  tags,
  previewMembers,
  extraMemberCount = 0,
  rating,
  ratingCount,
  friendsInGroup,
  onFavorite,
  onViewGroup,
  href,
}: GroupCardProps) {
  const viewGroupClassName =
    "rounded-full bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700 active:scale-95";
  return (
    <div className="flex w-[530px] flex-col gap-3">
      {/* ── Hero image — stands alone with its own rounded corners ── */}
      <div className="relative h-72 w-full overflow-hidden rounded-3xl">
        {coverImageUrl ? (
          <Image
            src={coverImageUrl}
            alt={coverImageAlt}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-200 object-cover">
            <span className="text-slate-400">No Image</span>
          </div>
        )}

        {/* dark gradient over the bottom half */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

        {/* Category badge — top left */}
        {/* <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-violet-600 px-3 py-1.5">
          <Icon icon="mdi:account-group" width={16} height={16} className="text-white" />
          <span className="text-xs font-bold uppercase tracking-wide text-white">
            {category}
          </span>
        </div> */}

        {/* Favorite button — top right */}
        {/* <button
          onClick={onFavorite}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 backdrop-blur-sm transition hover:bg-black/80"
          aria-label="Save to favourites"
        >
          <Icon icon="mdi:heart-outline" width={20} height={20} className="text-white" />
        </button> */}

        {/* Group info overlay — bottom of hero */}
        <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-3 px-4 pb-4">
          {/* Icon + name + description */}
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white shadow">
              <Icon
                icon={groupIconName}
                width={24}
                height={24}
                className="text-slate-700"
              />
            </div>
            <div className="flex flex-col">
              <h2 className="text-lg font-bold leading-snug text-white">
                {groupName}
              </h2>
              <p className="text-sm text-white/80">{description}</p>
            </div>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/90">
            <span className="flex items-center gap-1">
              <Icon icon="mdi:account-multiple" width={14} height={14} />
              {memberCount} Members
            </span>
            <span className="text-white/40">|</span>
            <span className="flex items-center gap-1">
              <Icon icon="mdi:map-marker-outline" width={14} height={14} />
              {location}
            </span>
            <span className="text-white/40">|</span>
            <span className="flex items-center gap-1">
              <Icon icon="mdi:calendar-blank-outline" width={14} height={14} />
              {meetFrequency}
            </span>
            <span className="text-white/40">|</span>
            <span className="flex items-center gap-1.5">
              <span
                className={`h-2 w-2 rounded-full ${isActive ? "bg-green-400" : "bg-slate-400"}`}
              />
              {isActive ? "Active Now" : "Inactive"}
            </span>
          </div>

          {/* Tag pills */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag.label}
                className={`rounded-lg px-3 py-1 text-xs font-medium ${tagStyles[tag.color]}`}
              >
                {tag.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Footer — sits freely below the image, no card container ── */}
      <div className="flex items-center justify-between px-1">
        {/* Member avatar stack */}
        <div className="flex items-center gap-3">
          <div className="flex -space-x-3">
            {previewMembers.slice(0, 4).map((member, i) => (
              <div
                key={member.name}
                className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-white"
                style={{ zIndex: previewMembers.length - i }}
              >
                <Image
                  src={member.imageUrl}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
            {extraMemberCount > 0 && (
              <div
                className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-violet-100 text-xs font-semibold text-violet-700"
                style={{ zIndex: 0 }}
              >
                +{extraMemberCount}
              </div>
            )}
          </div>
        </div>

        {/* Rating */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1">
            <Icon
              icon="mdi:star-outline"
              width={18}
              height={18}
              className="text-violet-400"
            />
            <span className="text-sm font-semibold text-slate-800">
              {rating.toFixed(1)}{" "}
              <span className="font-normal text-slate-500">
                ({ratingCount})
              </span>
            </span>
          </div>
          <span className="text-xs text-slate-400">Member Rating</span>
        </div>

        {/* Friends in group */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1">
            <Icon
              icon="mdi:account-multiple-outline"
              width={18}
              height={18}
              className="text-violet-400"
            />
            <span className="text-sm font-semibold text-slate-800">
              {friendsInGroup} Friends
            </span>
          </div>
          <span className="text-xs text-slate-400">In This Group</span>
        </div>

        {/* CTA button */}
        {href ? (
          <Link href={href} className={viewGroupClassName}>
            View Group
          </Link>
        ) : (
          <button onClick={onViewGroup} className={viewGroupClassName}>
            View Group
          </button>
        )}
      </div>
    </div>
  );
}
