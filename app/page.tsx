import { BrowseCategories } from "@/components/sections/browse-categories";
import { EventsNearMe } from "@/components/sections/events-near-me";
import { GroupsNearMe } from "@/components/sections/groups-near-me";
import { CreateGroupButton } from "@/components/create-group-button";
import { CreateEventButton } from "@/components/create-event-button";
import { getCategories } from "@/server/categories/getCategories";

export default async function Home() {
  const categories = await getCategories();

  return (
    <div className="flex flex-col gap-10">
      <div>
        <div className="flex justify-end">
          <CreateGroupButton categories={categories} />
        </div>
        <GroupsNearMe />
      </div>
      <BrowseCategories />
      <div>
        <div className="flex justify-end">
          <CreateEventButton categories={categories} />
        </div>
        <EventsNearMe />
      </div>
    </div>
  );
}
