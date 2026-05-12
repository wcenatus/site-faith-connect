"use client";
import { BasicSection } from "@/components/basic-section";
import { GroupHero } from "@/components/group-hero";
import { MeetingDateInfo } from "@/components/meeting-date-info";
import { Tabs, type TabItem } from "@/components/tabs";
import { mockGroup as group } from "@/mocks/group";
import { useState } from "react";

const GROUP_TABS: TabItem[] = [
  { id: "about", label: "About" },
  { id: "meetings", label: "Meetings" },
  { id: "members", label: "Members" },
  { id: "chat", label: "Chat" },
  { id: "resources", label: "Resources" },
  { id: "prayers", label: "Prayers" },
];
export const GroupContent = () => {
  const [activeTab, setActiveTab] = useState<string>("about");
  const onTabChange = (id: string) => {
    setActiveTab(id);
  };
  return (
    <div className="flex flex-col gap-6">
      <GroupHero
        category={group.category.title}
        groupName={group.name}
        description={group.description}
        iconName={group.iconName}
        memberCount={group.memberCount}
        meetFrequency={group.meetFrequency}
        hostedBy={group.hostedBy}
        previewMembers={group.previewMembers}
        extraMemberCount={group.extraMemberCount}
      />
      <Tabs tabs={GROUP_TABS} defaultActiveId="about" onChange={onTabChange} />
      <div>
        {activeTab === "about" && <About />}
        {activeTab === "meetings" && <Meetings />}
        {activeTab === "members" && <Members />}
        {activeTab === "chat" && <Chat />}
        {activeTab === "resources" && <Resources />}
        {activeTab === "prayers" && <Prayers />}
      </div>
    </div>
  );
};

//_______________________TABS CONTENT_______________________

const About = () => {
  return (
    <div>
      <BasicSection
        title="About"
        highlightColor="violet"
        highlightText="See All"
      >
        <MeetingDateInfo
          date="2026-05-23T19:00:00"
          title="Philippians 2: Growing in Humility"
          timeRange="7:00 PM – 8:30 PM"
          location="Grace Community Church · Room 204"
          goingCount={18}
          attendees={[
            { name: "Sara", imageUrl: "/avatars/1.jpg" },
            { name: "Maria", imageUrl: "/avatars/2.jpg" },
            { name: "Joy", imageUrl: "/avatars/3.jpg" },
          ]}
        />
      </BasicSection>
    </div>
  );
};

const Meetings = () => {
  return <div>Meetings</div>;
};

const Members = () => {
  return <div>Members</div>;
};

const Chat = () => {
  return <div>Chat</div>;
};

const Resources = () => {
  return <div>Resources</div>;
};

const Prayers = () => {
  return <div>Prayers</div>;
};
