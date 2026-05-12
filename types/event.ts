// Domain shape for an event as it travels between the API, services, and UI.
// JSON-friendly (dates are ISO strings) so it can flow over fetch unchanged.
export type Event = {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  startsAt: string;
  endsAt: string | null;
  timezone: string | null;
  isInPerson: boolean;
  locationName: string | null;
  address: string | null;
  audience: string | null;
  ageRestriction: string | null;
  hostedBy: string | null;
  category: { id: string; slug: string; title: string } | null;
  goingCount: number;
  interestedCount: number;
  averageRating: number | null;
  attendeeAvatars: string[];
};

export type GetEventsResponse = {
  events: Event[];
};

export type GetEventResponse = {
  event: Event;
};
