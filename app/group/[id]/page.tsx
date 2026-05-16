import { BasicSection } from "@/components/basic-section";
import { GroupHero } from "@/components/group-hero";
import { ProfileCard } from "@/components/profile-card";
import { GroupDetails } from "@/components/group-details";
import { PeopleGrid } from "@/components/people-grid";
import { getGroupById } from "@/server/groups/getGroupById";
import { Tabs } from "@/components/tabs";

type GroupPageProps = {
  params: Promise<{ id: string }>;
};

export default async function GroupPage({ params }: GroupPageProps) {
  const { id } = await params;
  const group = await getGroupById(id);

  if (!group) {
    return (
      <main className="w-full">
        <p className="text-sm text-slate-500">Group not found.</p>
      </main>
    );
  }

  const locationLabel = group.city ?? group.hostedBy ?? "Location TBA";
  const mapUrl = group.address
    ? `https://maps.google.com/?q=${encodeURIComponent(group.address)}`
    : undefined;
  const directionsUrl = group.address
    ? `https://maps.google.com/maps/dir/?api=1&destination=${encodeURIComponent(group.address)}`
    : undefined;

  return (
    <main className="w-full flex flex-col gap-8">
      <div className="mb-10">
        <GroupHero
          category={group.category?.title ?? "Group"}
          groupName={group.name}
          description={group.description}
          iconName={group.iconName ?? undefined}
          previewMembers={group.previewMembers.map((m) => ({
            name: m.name,
            imageUrl: m.avatarUrl,
          }))}
          extraMemberCount={group.extraMemberCount}
          imageUrl={group.coverImageUrl ?? undefined}
          imageAlt={group.name}
        />
      </div>
      {/* Two-column layout beneath the hero */}
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        {/* Left column: main content */}
        <div className="flex flex-1 flex-col gap-8 mr-20">
          <Tabs
            tabs={[
              {
                id: "about",
                label: "About",
                content: <div>About the group</div>,
              },
              {
                id: "members",
                label: "Members",
                content: <div>Members of the group</div>,
              },
            ]}
          />
          <BasicSection title="About the Group">
            {group.description ? (
              group.description
                .split(/\n+/)
                .filter((paragraph) => paragraph.trim().length > 0)
                .map((paragraph, idx) => <p key={idx}>{paragraph}</p>)
            ) : (
              <p>No description provided for this group yet.</p>
            )}
          </BasicSection>

          {group.hostedBy && (
            <BasicSection title="About the Host">
              <ProfileCard
                name={group.hostedBy}
                description="Helping people find and follow Jesus."
                link="#"
                verified
              />
            </BasicSection>
          )}

          {group.memberAvatars.length > 0 && (
            <BasicSection title="Members">
              <PeopleGrid
                people={group.memberAvatars.map((imageUrl) => ({ imageUrl }))}
                fallbackAlt="Member"
              />
            </BasicSection>
          )}
        </div>

        {/* Right column: group details sidebar */}
        <div className="w-full lg:w-96 lg:shrink-0 lg:sticky lg:top-4 self-start">
          <GroupDetails
            meetFrequency={group.meetFrequency ?? "—"}
            locationName={locationLabel}
            address={group.address ?? ""}
            mapUrl={mapUrl}
            directionsUrl={directionsUrl}
            isActive={group.isActive}
            category={group.category?.title}
            memberCount={group.memberCount}
            memberAvatars={group.memberAvatars}
          />
        </div>
      </div>
    </main>
  );
}
