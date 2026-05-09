import { CategoryCard } from "@/components/category-card";
import { EventCard } from "@/components/event-card";
import { GroupCard } from "@/components/group-card";
import { WelcomeBlock } from "@/components/welcome-block";
import { Icon } from "@iconify/react";

export default function Page() {
  return (
    <div className="flex flex-col gap-8">
    <WelcomeBlock name="Sarah" />
    <CategoryCard
      title="Bible Study"
      icon={<Icon icon="mdi:book-open-page-variant" width={24} height={24} />}
      number_of_events={12}
      color="violet"
    />
    <EventCard
      title="40's & Over Happy Hour (Drink Specials)"
      date="Thu, May 14 · 6:30 PM EDT"
      hostedBy="NYC Introverts That Want To Be E..."
      rating={3.8}
      attendees={26}
      imageUrl="/images/cross.png"
      imageAlt="Event cover"
    />
    <GroupCard
      category="Young Adults"
      coverImageUrl="/images/cross.png"
      coverImageAlt="Rooted Young Adults group"
      groupIconName="mdi:sprout-outline"
      groupName="Rooted Young Adults"
      description="A community of 20s & 30s pursuing God, purpose, and real friendships."
      memberCount={58}
      location="New York, NY"
      meetFrequency="Meets Weekly"
      isActive={true}
      tags={[
        { label: "Faith & Growth", color: "violet" },
        { label: "Bible Study", color: "green" },
        { label: "Fellowship", color: "orange" },
        { label: "Community Service", color: "blue" },
      ]}
      previewMembers={[
        { imageUrl: "/images/welcome-banner.png", name: "Member 1" },
        { imageUrl: "/images/welcome-banner.png", name: "Member 2" },
        { imageUrl: "/images/welcome-banner.png", name: "Member 3" },
        { imageUrl: "/images/welcome-banner.png", name: "Member 4" },
      ]}
      extraMemberCount={23}
      rating={4.8}
      ratingCount={32}
      friendsInGroup={3}
    />
  </div>
  );
};