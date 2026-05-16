"use client";

import { useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";

export type GroupDetailsProps = {
  meetFrequency: string;
  locationName: string;
  address: string;
  mapUrl?: string;
  directionsUrl?: string;
  isActive?: boolean;
  category?: string;
  memberCount?: number;
  friendsInGroup?: number;
  memberAvatars?: string[];
};

export function GroupDetails({
  meetFrequency,
  locationName,
  address,
  mapUrl = "#",
  directionsUrl = "#",
  isActive = true,
  category,
  memberCount = 0,
  friendsInGroup = 0,
  memberAvatars = [],
}: GroupDetailsProps) {
  const [joined, setJoined] = useState(false);
  const [saved, setSaved] = useState(false);

  const visibleAvatars = memberAvatars.slice(0, 4);
  const hasAddress = address.trim().length > 0;

  return (
    <aside className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      {/* Join block */}
      <div className="flex flex-col gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Want to join us?</h2>
          <p className="text-sm text-slate-500">
            Grow alongside others walking the same road.
          </p>
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
          {joined ? "You're a Member!" : "Join Group"}
        </button>

        <button
          onClick={() => setSaved((v) => !v)}
          className={`flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${
            saved
              ? "border-violet-400 bg-violet-50 text-violet-700"
              : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
          }`}
        >
          <Icon
            icon={saved ? "mdi:bookmark" : "mdi:bookmark-outline"}
            width={18}
            height={18}
            className={saved ? "text-violet-500" : "text-slate-400"}
          />
          {saved ? "Saved" : "Save Group"}
        </button>

        {/* Members row */}
        {memberCount > 0 && (
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {visibleAvatars.map((src, i) => (
                <div
                  key={i}
                  className="relative h-8 w-8 overflow-hidden rounded-full ring-2 ring-white"
                >
                  <Image
                    src={src}
                    alt={`Member ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-slate-800">
                {memberCount} members
              </span>
              {friendsInGroup > 0 && (
                <span className="text-xs text-slate-500">
                  {friendsInGroup} of your friends are here
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="h-px bg-slate-100" />

      <h3 className="text-base font-bold text-slate-800">Group details</h3>

      <ul className="flex flex-col gap-3">
        {/* Meet frequency */}
        <li className="flex items-start gap-3">
          <Icon
            icon="mdi:calendar-blank-outline"
            width={20}
            height={20}
            className="mt-0.5 shrink-0 text-slate-500"
          />
          <span className="text-sm text-slate-700">{meetFrequency}</span>
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
            <span className="text-sm font-medium text-slate-700">
              {locationName}
            </span>
            {hasAddress && (
              <>
                <span className="text-xs text-slate-500">{address}</span>
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-violet-600 hover:underline"
                >
                  View on map
                </a>
              </>
            )}
          </div>
        </li>

        {/* Active status */}
        <li className="flex items-start gap-3">
          <Icon
            icon={isActive ? "mdi:circle-slice-8" : "mdi:circle-outline"}
            width={20}
            height={20}
            className={`mt-0.5 shrink-0 ${
              isActive ? "text-emerald-500" : "text-slate-400"
            }`}
          />
          <span className="text-sm text-slate-700">
            {isActive ? "Active group" : "Inactive group"}
          </span>
        </li>

        {/* Category */}
        {category && (
          <li className="flex items-start gap-3">
            <Icon
              icon="mdi:tag-outline"
              width={20}
              height={20}
              className="mt-0.5 shrink-0 text-slate-500"
            />
            <span className="text-sm text-slate-700">{category}</span>
          </li>
        )}
      </ul>

      {/* Map thumbnail */}
      {hasAddress && (
        <div className="overflow-hidden rounded-xl">
          <iframe
            title="Group meeting location map"
            width="100%"
            height="200"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(
              address,
            )}&output=embed`}
          />
        </div>
      )}

      {/* Get directions button */}
      {hasAddress && (
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-xl bg-violet-100 px-4 py-3 text-sm font-semibold text-violet-700 transition-colors hover:bg-violet-200"
        >
          <Icon icon="mdi:navigation" width={18} height={18} />
          Get directions
        </a>
      )}
    </aside>
  );
}
