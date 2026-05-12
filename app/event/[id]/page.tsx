"use client";

import { use, useEffect, useState } from "react";
import { BasicSection } from "@/components/basic-section";
import { EventHero } from "@/components/event-hero";
import { ProfileCard } from "@/components/profile-card";
import { EventDetails } from "@/components/event-details";
import { getEvent, type Event } from "@/services/events-service";
import {
  formatEventDate,
  formatEventDateLong,
  formatEventTimeRange,
} from "@/utils/date";

type EventPageProps = {
  params: Promise<{ id: string }>;
};

export default function EventPage({ params }: EventPageProps) {
  const { id } = use(params);
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);
    setError(null);
    setNotFound(false);

    getEvent(id, controller.signal)
      .then((data) => {
        if (data === null) {
          setNotFound(true);
        } else {
          setEvent(data);
        }
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Unable to load event");
      })
      .finally(() => setIsLoading(false));

    return () => controller.abort();
  }, [id]);

  if (isLoading) {
    return (
      <main className="w-full">
        <p className="text-sm text-slate-500">Loading event…</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="w-full">
        <p className="text-sm text-rose-600">{error}</p>
      </main>
    );
  }

  if (notFound || !event) {
    return (
      <main className="w-full">
        <p className="text-sm text-slate-500">Event not found.</p>
      </main>
    );
  }

  const heroDate = `${formatEventDate(event.startsAt)}${
    event.endsAt
      ? ` – ${formatEventTimeRange(event.endsAt, null, event.timezone)}`
      : event.timezone
        ? ` ${event.timezone}`
        : ""
  }`;

  const detailsDate = formatEventDateLong(event.startsAt);
  const detailsTime = formatEventTimeRange(
    event.startsAt,
    event.endsAt,
    event.timezone,
  );

  const locationLabel =
    event.locationName ?? event.address ?? "Location TBA";
  const mapUrl = event.address
    ? `https://maps.google.com/?q=${encodeURIComponent(event.address)}`
    : undefined;
  const directionsUrl = event.address
    ? `https://maps.google.com/maps/dir/?api=1&destination=${encodeURIComponent(event.address)}`
    : undefined;

  return (
    <main className="w-full flex flex-col gap-8">
      <div className="mb-10">
        <EventHero
          category={event.category?.title ?? "Event"}
          title={event.title}
          date={heroDate}
          location={locationLabel}
          going={event.goingCount}
          interested={event.interestedCount}
          attendeeAvatars={event.attendeeAvatars}
          description={event.description}
          imageUrl={event.imageUrl ?? "/images/cross.png"}
          imageAlt={event.title}
        />
      </div>

      {/* Two-column layout beneath the hero */}
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        {/* Left column: main content */}
        <div className="flex flex-1 flex-col gap-8 mr-20">
          <BasicSection title="About the Event">
            {event.description ? (
              event.description
                .split(/\n+/)
                .filter((paragraph) => paragraph.trim().length > 0)
                .map((paragraph, idx) => <p key={idx}>{paragraph}</p>)
            ) : (
              <p>No description provided for this event yet.</p>
            )}
          </BasicSection>

          {event.hostedBy && (
            <BasicSection title="About the Host">
              <ProfileCard
                name={event.hostedBy}
                description="Helping people find and follow Jesus."
                link="#"
                verified
              />
            </BasicSection>
          )}

          {event.attendeeAvatars.length > 0 && (
            <BasicSection title="People Going">
              <div className="flex flex-wrap gap-2">
                {event.attendeeAvatars.map((avatar, idx) => (
                  <img
                    key={`${avatar}-${idx}`}
                    src={avatar}
                    alt="Attendee"
                    className="w-20 h-20 rounded-full"
                  />
                ))}
              </div>
            </BasicSection>
          )}
        </div>

        {/* Right column: event details sidebar */}
        <div className="w-full lg:w-96 lg:shrink-0 lg:sticky lg:top-4 self-start">
          <EventDetails
            date={detailsDate}
            time={detailsTime}
            locationName={locationLabel}
            address={event.address ?? ""}
            mapUrl={mapUrl}
            directionsUrl={directionsUrl}
            isInPerson={event.isInPerson}
            audience={event.audience ?? undefined}
            ageRestriction={event.ageRestriction ?? undefined}
            going={event.goingCount}
            attendeeAvatars={event.attendeeAvatars}
          />
        </div>
      </div>
    </main>
  );
}
