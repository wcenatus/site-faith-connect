"use client";

import { useEffect, useState } from "react";
import { BasicSection } from "@/components/basic-section";
import { EventCard } from "@/components/event-card";
import { getEvents, type Event } from "@/services/events-service";
import { formatEventDate } from "@/utils/date";

export const EventsNearMe = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);
    setError(null);

    getEvents(controller.signal)
      .then((data) => setEvents(data))
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Unable to load events");
      })
      .finally(() => setIsLoading(false));

    return () => controller.abort();
  }, []);

  const getLocation = () => {
    alert("update location");
  };

  return (
    <BasicSection
      title="Events Near Me"
      highlightColor="violet"
      highlightText=""
      onClick={getLocation}
    >
      {isLoading && (
        <p className="text-sm text-slate-500">Loading events…</p>
      )}

      {error && !isLoading && (
        <p className="text-sm text-rose-600">{error}</p>
      )}

      {!isLoading && !error && events.length === 0 && (
        <p className="text-sm text-slate-500">No events found.</p>
      )}

      {!isLoading && !error && events.length > 0 && (
        <div className="flex flex-row gap-4 overflow-x-auto pb-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {events.map((event) => (
            <EventCard
              key={event.id}
              id={event.id}
              title={event.title}
              date={formatEventDate(event.startsAt)}
              hostedBy={event.hostedBy ?? "Unknown host"}
              rating={event.averageRating ?? undefined}
              attendees={event.goingCount}
              imageUrl={event.imageUrl ?? ""}
              imageAlt={event.title}
            />
          ))}
        </div>
      )}
    </BasicSection>
  );
};
