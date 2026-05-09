import { WelcomeBlock } from "@/components/welcome-block";
import { BrowseCategories } from "@/components/sections/browse-categories";
import { EventsNearMe } from "@/components/sections/events-near-me";
import { GroupsNearMe } from "@/components/sections/groups-near-me";

export default function Home() {
  return (
    <div className="flex flex-col gap-10">
      <WelcomeBlock name="Sarah" />
      <BrowseCategories />
      <EventsNearMe />
      <GroupsNearMe />
    </div>
  );
}
