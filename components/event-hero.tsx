"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { AvatarStack } from "@/components/avatar-stack";

export type EventHeroProps = {
  category: string;
  title: string;
  date: string;
  location: string;
  going: number;
  interested: number;
  attendeeAvatars?: string[];
  description?: string | null;
  imageUrl: string;
  imageAlt?: string;
};

export function EventHero({
  category,
  title,
  date,
  location,
  going,
  interested,
  attendeeAvatars = [],
  description,
  imageUrl,
  imageAlt = "",
}: EventHeroProps) {
  const [saved, setSaved] = useState(false);

  const attendeePeople = attendeeAvatars.map((src, i) => ({
    name: `Attendee ${i + 1}`,
    imageUrl: src,
  }));
  const overflow = Math.max(
    going + interested - Math.min(attendeePeople.length, 5),
    0,
  );

  return (
    <div className="relative w-full overflow-hidden rounded-3xl">
      {/* Background image fills the entire component */}
      <div className="relative w-full" style={{ minHeight: "420px" }}>
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover"
          priority
        />
        {/* Gradient: light at top, heavy at bottom to keep all text readable */}
        <div className="absolute inset-0 bg-linear-to-b from-black/25 via-black/40 to-black/80" />

        {/* Top row: category badge + save button */}
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
          <span className="rounded-full bg-emerald-400 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
            {category}
          </span>
          <button
            onClick={() => setSaved((s) => !s)}
            aria-label={saved ? "Unsave event" : "Save event"}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md transition-transform active:scale-90"
          >
            <Icon
              icon={saved ? "mdi:heart" : "mdi:heart-outline"}
              width={20}
              height={20}
              className={saved ? "text-rose-500" : "text-slate-500"}
            />
          </button>
        </div>

        {/* All content pinned to the bottom, inside the image */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 px-5 pb-6">
          <h1 className="text-2xl font-bold leading-tight text-white md:text-3xl">
            {title}
          </h1>

          {/* Meta rows */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-sm text-white/90">
              <Icon icon="mdi:calendar-month-outline" width={16} height={16} className="shrink-0" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/90">
              <Icon icon="mdi:map-marker-outline" width={16} height={16} className="shrink-0" />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/90">
              <Icon icon="mdi:account-multiple-outline" width={16} height={16} className="shrink-0" />
              <span>
                {going} going · {interested} interested
              </span>
            </div>
          </div>

          <AvatarStack
            people={attendeePeople}
            max={5}
            size="md"
            extraCount={overflow}
          />

          {/* Description inside the image */}
          <p className="text-sm leading-relaxed text-white/80">{description}</p>
        </div>
      </div>
    </div>
  );
}
