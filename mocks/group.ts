import type { GroupHeroMember } from "@/components/group-hero";

// Shape consumed by the group detail page. Mirrors the fields of the domain
// `Group` type the page reaches into (`group.category.title`, `group.name`,
// etc.), but uses `imageUrl` on preview members so it can be passed straight
// into <GroupHero /> without a transform.
export type MockGroup = {
  id: string;
  name: string;
  description: string;
  iconName: string;
  category: { title: string };
  memberCount: number;
  meetFrequency: string;
  hostedBy: string;
  previewMembers: GroupHeroMember[];
  extraMemberCount: number;
};

export const mockGroup: MockGroup = {
  id: "women-of-purpose",
  name: "Women of Purpose",
  description:
    "Encouraging women to grow in their identity in Christ and walk in purpose.",
  iconName: "mdi:leaf",
  category: { title: "Bible Study" },
  memberCount: 24,
  meetFrequency: "Meets Weekly",
  hostedBy: "Grace Community Church",
  previewMembers: [
    { name: "Sarah", imageUrl: "https://i.pravatar.cc/150?img=20" },
    { name: "Maria", imageUrl: "https://i.pravatar.cc/150?img=21" },
    { name: "Rachel", imageUrl: "https://i.pravatar.cc/150?img=22" },
    { name: "Hannah", imageUrl: "https://i.pravatar.cc/150?img=23" },
    { name: "Esther", imageUrl: "https://i.pravatar.cc/150?img=24" },
  ],
  extraMemberCount: 19,
};
