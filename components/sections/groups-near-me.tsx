import { BasicSection } from "@/components/basic-section";
import { GroupsCarousel } from "@/components/sections/groups-carousel";
import { getGroups } from "@/server/groups/getGroups";

export const GroupsNearMe = async () => {
  const groups = await getGroups();

  return (
    <BasicSection title="Groups Near Me" highlightColor="violet" highlightText="See All">
      {groups.length === 0 ? (
        <p className="text-sm text-slate-500">No groups found.</p>
      ) : (
        <GroupsCarousel groups={groups} />
      )}
    </BasicSection>
  );
};
