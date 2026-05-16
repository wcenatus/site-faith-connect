"use client";

import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { AvatarStack, type AvatarStackPerson } from "@/components/avatar-stack";

export type GroupHeroMember = AvatarStackPerson;

export type GroupHeroProps = {
  category: string;
  groupName: string;
  description?: string | null;
  iconName?: string;
  previewMembers?: GroupHeroMember[];
  extraMemberCount?: number;
  /** Optional photographic image used as the right-side backdrop. */
  imageUrl?: string;
  imageAlt?: string;
  /** Href for the "Back to groups" link. Defaults to `/`. */
  backHref?: string;
  backLabel?: string;
};

export function GroupHero({
  category,
  groupName,
  description,
  iconName = "mdi:leaf",
  previewMembers = [],
  extraMemberCount = 0,
  imageUrl,
  imageAlt = "",
  backHref = "/",
  backLabel = "Back to groups",
}: GroupHeroProps) {
  return (
    <section className="relative left-1/2 ml-[-50vw] w-screen overflow-hidden bg-[#f5ebd6]">
      {/* Right-side photographic backdrop */}
      {imageUrl && (
        <div className="pointer-events-none absolute inset-0">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-right"
          />
          {/* Cream wash anchored to the left so the photo only shows on the right */}
          <div
            aria-hidden
            className="absolute inset-0 bg-linear-to-r from-[#f5ebd6] from-30% via-[#f5ebd6]/85 via-55% to-transparent"
          />
        </div>
      )}

      {/* Content — constrained to match the page max width */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col gap-5 px-1 py-6 md:py-7">
        {/* Back link */}
        <Link
          href={backHref}
          className="inline-flex w-fit items-center gap-2 text-sm font-medium text-slate-700 transition hover:text-slate-900"
        >
          <Icon icon="mdi:arrow-left" width={18} height={18} />
          {backLabel}
        </Link>

        {/* Avatar + main info */}
        <div className="flex items-start gap-5 md:gap-7">
          {/* Leaf avatar */}
          <div
            className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-black/5 md:h-32 md:w-32"
            aria-hidden
          >
            <Icon
              icon={iconName}
              width={52}
              height={52}
              className="text-[#7e9b5e]"
            />
          </div>

          <div className="flex min-w-0 flex-col gap-3">
            {/* Category badge */}
            <span className="inline-flex w-fit items-center rounded-full bg-[#b39669] px-3.5 py-1 text-xs font-bold uppercase tracking-wide text-white">
              {category}
            </span>

            {/* Title */}
            <h1 className="font-serif text-3xl font-bold leading-tight text-[#2c4a32] md:text-4xl">
              {groupName}
            </h1>

            {/* Description */}
            {description && (
              <p className="max-w-md text-sm leading-relaxed text-slate-600 md:text-base">
                {description}
              </p>
            )}

            <AvatarStack
              people={previewMembers}
              max={5}
              size="md"
              extraCount={extraMemberCount}
              className="pt-1"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
