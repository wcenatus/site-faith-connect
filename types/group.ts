// Domain shape for a group as it travels between the API, services, and UI.
// JSON-friendly (no Date objects) so it can flow over fetch unchanged.

export type GroupTagDto = {
  label: string;
  // DB stores tag color as a free-form string; the UI narrows it to a known
  // TagColor at render time and falls back gracefully on unknown values.
  color: string;
};

export type GroupMemberPreviewDto = {
  name: string;
  avatarUrl: string;
};

export type Group = {
  id: string;
  name: string;
  description: string | null;
  coverImageUrl: string | null;
  iconName: string | null;
  city: string | null;
  // Street address for the group's regular meeting location, when known.
  // Sourced from the hosting church's address since groups don't carry their
  // own address column. Used by the detail page for the map / directions.
  address: string | null;
  meetFrequency: string | null;
  isActive: boolean;
  hostedBy: string | null;
  category: { id: string; slug: string; title: string } | null;
  tags: GroupTagDto[];
  memberCount: number;
  previewMembers: GroupMemberPreviewDto[];
  extraMemberCount: number;
  // Wider strip of member avatars surfaced by the detail loader for the
  // "Members" people grid. Empty for the list loader.
  memberAvatars: string[];
  averageRating: number | null;
  ratingCount: number;
};

export type GetGroupsResponse = {
  groups: Group[];
};

export type GetGroupResponse = {
  group: Group;
};
