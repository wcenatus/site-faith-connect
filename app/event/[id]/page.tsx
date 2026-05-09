import { BasicSection } from "@/components/basic-section";
import { EventHero } from "@/components/event-hero";
import { ProfileCard } from "@/components/profile-card";
import { EventDetails } from "@/components/event-details";

const MOCK_AVATARS = [
  "https://i.pravatar.cc/64?img=1",
  "https://i.pravatar.cc/64?img=5",
  "https://i.pravatar.cc/64?img=9",
  "https://i.pravatar.cc/64?img=16",
  "https://i.pravatar.cc/64?img=20",
];

export default function EventPage() {
  return (
    <main className="w-full flex flex-col gap-8">
        <div className="mb-10">

      <EventHero
        category="Bible Study"
        title="Women's Bible Study"
        date="Sat, May 18 · 7:00 PM – 8:30 PM EDT"
        location="Grace Community Church"
        going={18}
        interested={2}
        attendeeAvatars={MOCK_AVATARS}
        description="Join us as we study God's Word together, grow in faith, and encourage one another in our daily walk with Jesus."
        imageUrl="https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=1400&q=80"
        imageAlt="Women's Bible Study"
      />
        </div>

      {/* Two-column layout beneath the hero */}
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        {/* Left column: main content */}
        <div className="flex flex-1 flex-col gap-8 mr-20">
          <BasicSection title="About the Event">
            <p>
              This women's Bible study is a place to connect, learn, and be encouraged through God's Word. We'll be going through the book of
              Philippians together, discovering what it means to have joy, peace, and purpose in every season.
            </p>
            <p>
              All women are welcome—whether you're new to studying the Bible or have been walking with Jesus for years, there's a place for you here. We believe that faith grows best in community, where honest questions are embraced, prayers are shared, and friendships are formed that last beyond just one evening.
            </p>
            <p>
              Each week, we'll reflect on a different passage, engage in open discussion, and spend time praying for one another. No previous Bible knowledge is required; just bring a heart open to learning and sharing. Study guides will be provided, and feel free to bring your Bible if you have one.
            </p>
            <p>
              Join us as we build a supportive environment for women to deepen their relationship with God and with each other. Whether you're seeking answers, encouragement, or simply some meaningful connection, you'll find that here as we journey through Philippians together.
            </p>
       

            <blockquote className="flex gap-3 rounded-xl bg-violet-50 px-5 py-4">
              <span className="mt-0.5 shrink-0 text-5xl font-serif leading-none text-violet-400">&ldquo;</span>
              <div className="flex flex-col gap-1">
                <p className="italic leading-relaxed text-slate-700">
                  Let us hold unswervingly to the hope we profess, for he who promised is faithful.
                </p>
                <footer>
                  <p className="font-semibold text-violet-500">Hebrews 10:23</p>
                </footer>
              </div>
            </blockquote>
          </BasicSection>

          <BasicSection title="About the Host">
            <ProfileCard
              name="Grace Community Church"
              description="Helping people find and follow Jesus. We exist to love God, love people, and make disciples."
              link="/church/grace-community"
              verified
            />
          </BasicSection>

          <BasicSection title="People Going">
            <div className="flex flex-wrap gap-2">
              {MOCK_AVATARS.map((avatar) => (
                <img key={avatar} src={avatar} alt="Attendee" className="w-20 h-20 rounded-full" />
              ))}
            </div>
          </BasicSection>
        </div>

        {/* Right column: event details sidebar */}
        <div className="w-full lg:w-96 lg:shrink-0 lg:sticky lg:top-4 self-start">
          <EventDetails
            date="Sat, May 18, 2024"
            time="7:00 PM – 8:30 PM EDT"
            locationName="Grace Community Church"
            address="123 Main St, New York, NY 10001"
            mapUrl="https://maps.google.com/?q=123+Main+St,+New+York,+NY+10001"
            directionsUrl="https://maps.google.com/maps/dir/?api=1&destination=123+Main+St,+New+York,+NY+10001"
            isInPerson
            audience="Women only"
            ageRestriction="Ages 18+"
            going={18}
            friendsGoing={2}
            attendeeAvatars={MOCK_AVATARS}
          />
        </div>
      </div>
    </main>
  );
}
