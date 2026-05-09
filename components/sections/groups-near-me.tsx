"use client";

import useEmblaCarousel from "embla-carousel-react";
import { BasicSection } from "@/components/basic-section";
import { GroupCard } from "@/components/group-card";
import { mockGroups } from "@/mocks/groups";

export const GroupsNearMe = () => {
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 2,
    loop: false,
  });

  return (
    <BasicSection title="Groups Near Me" highlightColor="violet" highlightText="See All">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-5">
          {mockGroups.map((group) => (
            <div key={group.groupName} className="shrink-0">
              <GroupCard {...group} />
            </div>
          ))}
        </div>
      </div>
    </BasicSection>
  );
};
