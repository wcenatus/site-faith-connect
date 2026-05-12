"use client";

import { Icon } from "@iconify/react";
import { useState } from "react";
import { Button } from "@/components/button";
import { AvatarStack, type AvatarStackPerson } from "@/components/avatar-stack";

export type MeetingAttendee = AvatarStackPerson;

export type MeetingDateInfoProps = {
  /** Full date for the meeting. Used to derive month / day / weekday labels. */
  date: Date | string;
  title: string;
  /** Pre-formatted time range, e.g. "7:00 PM – 8:30 PM". */
  timeRange: string;
  location: string;
  attendees?: MeetingAttendee[];
  goingCount: number;
  isGoing?: boolean;
  onToggleGoing?: (next: boolean) => void;
  className?: string;
};

function formatDateParts(input: Date | string) {
  const d = typeof input === "string" ? new Date(input) : input;
  return {
    month: d.toLocaleString("en-US", { month: "short" }).toUpperCase(),
    day: d.getDate().toString().padStart(2, "0"),
    weekday: d.toLocaleString("en-US", { weekday: "short" }).toUpperCase(),
  };
}

export function MeetingDateInfo({
  date,
  title,
  timeRange,
  location,
  attendees = [],
  goingCount,
  isGoing,
  onToggleGoing,
  className = "",
}: MeetingDateInfoProps) {
  const [internalGoing, setInternalGoing] = useState(false);
  const going = isGoing ?? internalGoing;

  const handleToggle = () => {
    const next = !going;
    if (onToggleGoing) onToggleGoing(next);
    else setInternalGoing(next);
  };

  const { month, day, weekday } = formatDateParts(date);

  return (
    <article
      className={[
        "flex items-center gap-4 rounded-2xl bg-white md:gap-5",
        className,
      ].join(" ")}
    >
      {/* Date column */}
      <div
        className="flex h-20 w-16 shrink-0 flex-col items-center justify-center gap-0.5 rounded-lg bg-[#f5ebd6] leading-none text-[#2c4a32]"
        aria-label={`${weekday} ${month} ${day}`}
      >
        <span className="text-[11px] font-semibold tracking-wide">{month}</span>
        <span className="font-serif text-2xl font-bold md:text-3xl">{day}</span>
        <span className="text-[11px] font-semibold tracking-wide">
          {weekday}
        </span>
      </div>

      {/* Main info */}
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <h3 className="truncate text-base font-bold text-[#2c4a32] md:text-lg">
          {title}
        </h3>

        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-700">
          <span className="inline-flex items-center gap-1.5">
            <Icon
              icon="mdi:clock-outline"
              width={16}
              height={16}
              className="text-slate-500"
            />
            {timeRange}
          </span>
          <span aria-hidden className="text-slate-400">
            ·
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Icon
              icon="mdi:map-marker-outline"
              width={16}
              height={16}
              className="text-slate-500"
            />
            {location}
          </span>
        </div>

        {(attendees.length > 0 || goingCount > 0) && (
          <AvatarStack
            people={attendees}
            max={3}
            size="sm"
            variant="label"
            label={`${goingCount} going`}
            className="mt-1"
          />
        )}
      </div>

      {/* RSVP */}
      <Button
        color={going ? "primary" : "outline"}
        radius="default"
        size="md"
        onClick={handleToggle}
        aria-pressed={going}
        className="shrink-0"
      >
        {going ? "Going" : "I'm Going"}
      </Button>
    </article>
  );
}
