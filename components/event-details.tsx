"use client";

import { useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";

export type EventDetailsProps = {
  date: string;
  time: string;
  locationName: string;
  address: string;
  mapUrl?: string;
  directionsUrl?: string;
  isInPerson?: boolean;
  audience?: string;
  ageRestriction?: string;
  going?: number;
  friendsGoing?: number;
  attendeeAvatars?: string[];
};

export function EventDetails({
  date,
  time,
  locationName,
  address,
  mapUrl = "#",
  directionsUrl = "#",
  isInPerson = true,
  audience,
  ageRestriction,
  going = 0,
  friendsGoing = 0,
  attendeeAvatars = [],
}: EventDetailsProps) {
  const [joined, setJoined] = useState(false);
  const [interested, setInterested] = useState(false);

  const visibleAvatars = attendeeAvatars.slice(0, 4);

  return (
    <aside className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      {/* RSVP block */}
      <div className="flex flex-col gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Want to join us?</h2>
          <p className="text-sm text-slate-500">Be part of what God is doing in our community.</p>
        </div>

        <button
          onClick={() => setJoined((v) => !v)}
          className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
            joined
              ? "bg-violet-200 text-violet-800"
              : "bg-violet-600 text-white hover:bg-violet-700"
          }`}
        >
          <Icon icon="mdi:account-multiple-outline" width={18} height={18} />
          {joined ? "You're Going!" : "Join Event"}
        </button>

        <button
          onClick={() => setInterested((v) => !v)}
          className={`flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${
            interested
              ? "border-violet-400 bg-violet-50 text-violet-700"
              : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
          }`}
        >
          <Icon
            icon={interested ? "mdi:star" : "mdi:star-outline"}
            width={18}
            height={18}
            className={interested ? "text-violet-500" : "text-slate-400"}
          />
          {interested ? "Interested" : "I'm Interested"}
        </button>

        {/* Attendees row */}
        {going > 0 && (
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {visibleAvatars.map((src, i) => (
                <div
                  key={i}
                  className="relative h-8 w-8 overflow-hidden rounded-full ring-2 ring-white"
                >
                  <Image src={src} alt={`Attendee ${i + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-slate-800">{going} people are going</span>
              {friendsGoing > 0 && (
                <span className="text-xs text-slate-500">{friendsGoing} of your friends are going</span>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="h-px bg-slate-100" />

      <h3 className="text-base font-bold text-slate-800">Event details</h3>

      <ul className="flex flex-col gap-3">
        {/* Date */}
        <li className="flex items-start gap-3">
          <Icon
            icon="mdi:calendar-month-outline"
            width={20}
            height={20}
            className="mt-0.5 shrink-0 text-slate-500"
          />
          <span className="text-sm text-slate-700">{date}</span>
        </li>

        {/* Time */}
        <li className="flex items-start gap-3">
          <Icon
            icon="mdi:clock-outline"
            width={20}
            height={20}
            className="mt-0.5 shrink-0 text-slate-500"
          />
          <span className="text-sm text-slate-700">{time}</span>
        </li>

        {/* Location */}
        <li className="flex items-start gap-3">
          <Icon
            icon="mdi:map-marker-outline"
            width={20}
            height={20}
            className="mt-0.5 shrink-0 text-slate-500"
          />
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium text-slate-700">{locationName}</span>
            <span className="text-xs text-slate-500">{address}</span>
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-violet-600 hover:underline"
            >
              View on map
            </a>
          </div>
        </li>

        {/* In-person / online */}
        {isInPerson !== undefined && (
          <li className="flex items-start gap-3">
            <Icon
              icon="mdi:home-outline"
              width={20}
              height={20}
              className="mt-0.5 shrink-0 text-slate-500"
            />
            <span className="text-sm text-slate-700">
              {isInPerson ? "In-person event" : "Online event"}
            </span>
          </li>
        )}

        {/* Audience */}
        {audience && (
          <li className="flex items-start gap-3">
            <Icon
              icon="mdi:account-group-outline"
              width={20}
              height={20}
              className="mt-0.5 shrink-0 text-slate-500"
            />
            <span className="text-sm text-slate-700">{audience}</span>
          </li>
        )}

        {/* Age restriction */}
        {ageRestriction && (
          <li className="flex items-start gap-3">
            <Icon
              icon="mdi:shield-account-outline"
              width={20}
              height={20}
              className="mt-0.5 shrink-0 text-slate-500"
            />
            <span className="text-sm text-slate-700">{ageRestriction}</span>
          </li>
        )}
      </ul>

      {/* Map thumbnail */}
      <div className="overflow-hidden rounded-xl">
        <iframe
          title="Event location map"
          width="100%"
          height="200"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
        />
      </div>

      {/* Get directions button */}
      <a
        href={directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 rounded-xl bg-violet-100 px-4 py-3 text-sm font-semibold text-violet-700 transition-colors hover:bg-violet-200"
      >
        <Icon icon="mdi:navigation" width={18} height={18} />
        Get directions
      </a>
    </aside>
  );
}
