import { BasicSection } from "@/components/basic-section";
import { EventCard } from "@/components/event-card";
//Temporary mock data
import { mockEvents } from "@/mocks/events";

export const EventsNearMe = () => {
  const getLocation = () => {
    alert("update location");
  };

  return (
    <BasicSection title="Events Near Me" highlightColor="violet" highlightText="" onClick={getLocation}>
      <div className="flex flex-row gap-4 overflow-x-auto pb-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {mockEvents.map((event) => (
          <EventCard key={event.title} {...event} />
        ))}
      </div>
    </BasicSection>
  );
};  