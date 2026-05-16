import { BasicSection } from "@/components/basic-section";
import { EventCard } from "@/components/event-card";
import { getEvents } from "@/server/events/getEvents";
import { formatEventDate } from "@/utils/date";

export const EventsNearMe = async () => {
  const events = await getEvents();

  return (
    <BasicSection title="Events Near Me" highlightColor="violet" highlightText="">
      {events.length === 0 ? (
        <p className="text-sm text-slate-500">No events found.</p>
      ) : (
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
