import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../generated/prisma/client";
import { mockCategories } from "../mocks/categories";
import { mockEvents } from "../mocks/events";
import { mockGroups } from "../mocks/groups";

const url = process.env.DATABASE_URL;
if (!url) {
  throw new Error("DATABASE_URL is not set in .env");
}

const prisma = new PrismaClient({
  adapter: new PrismaBetterSqlite3({ url }),
});

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Map a mock event title to its category slug.
function eventCategorySlug(title: string): string {
  const t = title.toLowerCase();
  if (t.includes("worship") || t.includes("praise")) return "worship";
  if (t.includes("bible")) return "bible-study";
  if (t.includes("youth")) return "youth";
  if (t.includes("prayer")) return "prayer";
  if (t.includes("outreach") || t.includes("food")) return "outreach";
  return "bible-study";
}

// Parse a free-form mock date like "Sun, May 12 · 6:00 PM" → Date.
// We assume year 2025 for the seed (mock dates have no year).
function parseMockDate(value: string, year = 2025): Date {
  const cleaned = value.split("·")[0]?.split("–")[0]?.split("-")[0]?.trim() ?? value;
  const time = value.includes("·") ? value.split("·")[1]?.trim() : undefined;
  const composite = `${cleaned} ${year}${time ? ` ${time}` : ""}`;
  const parsed = new Date(composite);
  if (Number.isNaN(parsed.getTime())) {
    return new Date(`${cleaned} ${year}`);
  }
  return parsed;
}

const SEED_USERS = [
  { name: "Sarah Mitchell", email: "sarah@faithconnect.dev", avatar: "https://i.pravatar.cc/150?img=20", city: "New York, NY" },
  { name: "James Carter", email: "james@faithconnect.dev", avatar: "https://i.pravatar.cc/150?img=1", city: "Atlanta, GA" },
  { name: "Priya Shah", email: "priya@faithconnect.dev", avatar: "https://i.pravatar.cc/150?img=2", city: "Atlanta, GA" },
  { name: "Marcus Lee", email: "marcus@faithconnect.dev", avatar: "https://i.pravatar.cc/150?img=3", city: "Atlanta, GA" },
  { name: "Sofia Reyes", email: "sofia@faithconnect.dev", avatar: "https://i.pravatar.cc/150?img=4", city: "Atlanta, GA" },
  { name: "Deborah Kim", email: "deborah@faithconnect.dev", avatar: "https://i.pravatar.cc/150?img=5", city: "Houston, TX" },
  { name: "Nathan Brooks", email: "nathan@faithconnect.dev", avatar: "https://i.pravatar.cc/150?img=6", city: "Houston, TX" },
  { name: "Grace Thompson", email: "grace@faithconnect.dev", avatar: "https://i.pravatar.cc/150?img=7", city: "Houston, TX" },
  { name: "Caleb Anderson", email: "caleb@faithconnect.dev", avatar: "https://i.pravatar.cc/150?img=8", city: "Dallas, TX" },
  { name: "Aisha Williams", email: "aisha@faithconnect.dev", avatar: "https://i.pravatar.cc/150?img=9", city: "Dallas, TX" },
  { name: "Tyler Park", email: "tyler@faithconnect.dev", avatar: "https://i.pravatar.cc/150?img=10", city: "Dallas, TX" },
  { name: "Zoe Ramirez", email: "zoe@faithconnect.dev", avatar: "https://i.pravatar.cc/150?img=11", city: "Dallas, TX" },
  { name: "David Cohen", email: "david@faithconnect.dev", avatar: "https://i.pravatar.cc/150?img=12", city: "Charlotte, NC" },
  { name: "Emmanuel Adeyemi", email: "emmanuel@faithconnect.dev", avatar: "https://i.pravatar.cc/150?img=13", city: "Charlotte, NC" },
  { name: "Joseph Nguyen", email: "joseph@faithconnect.dev", avatar: "https://i.pravatar.cc/150?img=14", city: "Charlotte, NC" },
  { name: "Lydia Patel", email: "lydia@faithconnect.dev", avatar: "https://i.pravatar.cc/150?img=15", city: "Nashville, TN" },
  { name: "Aaron Bennett", email: "aaron@faithconnect.dev", avatar: "https://i.pravatar.cc/150?img=16", city: "Nashville, TN" },
  { name: "Hannah Wright", email: "hannah@faithconnect.dev", avatar: "https://i.pravatar.cc/150?img=17", city: "Nashville, TN" },
  { name: "Luke Foster", email: "luke@faithconnect.dev", avatar: "https://i.pravatar.cc/150?img=18", city: "Nashville, TN" },
];

const SEED_CHURCHES = [
  { name: "Grace Community Church", description: "Helping people find and follow Jesus. We exist to love God, love people, and make disciples.", verified: true, city: "New York, NY", address: "123 Main St, New York, NY 10001" },
  { name: "Grace Fellowship Church", description: "A vibrant community of believers in worship and word.", verified: true, city: "Atlanta, GA", address: "200 Peachtree St, Atlanta, GA 30303" },
  { name: "Cornerstone Community", description: "Building lives on the Cornerstone, Jesus Christ.", verified: false, city: "Houston, TX", address: "800 Texas Ave, Houston, TX 77002" },
  { name: "Harvest Life Ministries", description: "Equipping the next generation to live boldly for Christ.", verified: true, city: "Dallas, TX", address: "500 N Akard St, Dallas, TX 75201" },
  { name: "River of Life Church", description: "Streams of living water for every season of life.", verified: false, city: "Charlotte, NC", address: "300 S Tryon St, Charlotte, NC 28202" },
  { name: "New Hope Baptist", description: "Sharing hope through service and love.", verified: false, city: "Nashville, TN", address: "150 4th Ave N, Nashville, TN 37219" },
];

const SEED_TAGS = [
  { label: "Faith & Growth", color: "violet" },
  { label: "Bible Study", color: "violet" },
  { label: "All Ages", color: "blue" },
  { label: "Prayer", color: "purple" },
  { label: "Early Morning", color: "orange" },
  { label: "Youth", color: "green" },
  { label: "High School", color: "cyan" },
  { label: "College", color: "blue" },
  { label: "Men's Ministry", color: "orange" },
  { label: "Accountability", color: "purple" },
  { label: "Worship", color: "violet" },
  { label: "Music", color: "cyan" },
  { label: "Fellowship", color: "orange" },
  { label: "Community Service", color: "blue" },
];

// Map mock event hostedBy → church name in SEED_CHURCHES
function churchFromHost(hostedBy: string): string {
  if (hostedBy.includes("Grace Fellowship")) return "Grace Fellowship Church";
  if (hostedBy.includes("Cornerstone")) return "Cornerstone Community";
  if (hostedBy.includes("Harvest")) return "Harvest Life Ministries";
  if (hostedBy.includes("River")) return "River of Life Church";
  if (hostedBy.includes("New Hope")) return "New Hope Baptist";
  return "Grace Community Church";
}

// Rich-text (HTML) descriptions keyed by event title. Output is the kind of
// markup TipTap / ProseMirror / Lexical editors produce: <p>, <h3>, <ul>,
// <strong>, <em>, <blockquote>, <a>. Stored as String on the Event model.
const EVENT_DESCRIPTIONS: Record<string, string> = {
  "Sunday Worship & Praise Night": `
    <h3>An evening of worship</h3>
    <p>Join us for a <strong>spirit-filled night of praise</strong> as we lift our voices together and welcome the presence of God.</p>
    <p>The evening will include:</p>
    <ul>
      <li>Live worship led by our <em>house band</em></li>
      <li>A short devotional from Pastor James</li>
      <li>Open prayer and ministry time</li>
    </ul>
    <blockquote>“Let everything that has breath praise the Lord.” — Psalm 150:6</blockquote>
    <p>Doors open at <strong>5:30 PM</strong>. Light refreshments will be served after the service.</p>
  `.trim(),

  "Men's Bible Study Breakfast": `
    <h3>Word &amp; waffles</h3>
    <p>Start your Saturday with <strong>brothers in Christ</strong>, a hot breakfast, and an honest conversation about how Scripture meets real life.</p>
    <p>This month we're walking through <em>The Book of James</em> — practical faith for everyday men.</p>
    <ul>
      <li>Breakfast served at <strong>8:00 AM</strong></li>
      <li>Discussion from 8:30 – 9:30 AM</li>
      <li>Bring your Bible (or use the app)</li>
    </ul>
    <p>New here? <em>You're especially welcome.</em> No prep required.</p>
  `.trim(),

  "Youth Revival Conference": `
    <h3>Three days. One generation. One King.</h3>
    <p>A <strong>weekend-long encounter</strong> for students in grades 6–12, packed with worship, teaching, breakout sessions, and late-night fun.</p>
    <p><strong>What to expect:</strong></p>
    <ul>
      <li>Friday: Opening night with guest speaker <em>Tyler Brooks</em></li>
      <li>Saturday: Workshops, sports, and an evening worship rally</li>
      <li>Sunday: Commissioning service &amp; baptisms</li>
    </ul>
    <p>Registration includes meals, a conference t-shirt, and access to all sessions. Scholarships available — <a href="mailto:youth@harvestlife.org">contact our youth team</a>.</p>
    <blockquote>“Don't let anyone look down on you because you are young.” — 1 Timothy 4:12</blockquote>
  `.trim(),

  "Women's Prayer Retreat": `
    <h3>Come away and be still</h3>
    <p>A <strong>one-day retreat</strong> for women of all seasons — a chance to step back from the noise and meet with the Lord.</p>
    <p>Our time together will include:</p>
    <ul>
      <li>Guided <em>lectio divina</em> through Psalm 23</li>
      <li>Small-group prayer in the chapel garden</li>
      <li>Personal reflection time with provided journals</li>
      <li>A shared lunch and worship to close the day</li>
    </ul>
    <p><strong>Childcare is provided</strong> for ages 0–10. Please indicate when you RSVP.</p>
  `.trim(),

  "Community Outreach & Food Drive": `
    <h3>Faith with feet on it</h3>
    <p>We're partnering with <strong>local food banks</strong> to serve our neighbors and share the love of Jesus in tangible ways.</p>
    <p><strong>How you can help:</strong></p>
    <ol>
      <li>Bring non-perishable goods to the fellowship hall</li>
      <li>Join a packing team after the 11 AM service</li>
      <li>Volunteer for door-to-door delivery in the afternoon</li>
    </ol>
    <p><em>All ages welcome.</em> Wear comfortable shoes — we'll be on our feet!</p>
    <blockquote>“Religion that God accepts as pure and faultless is this: to look after orphans and widows in their distress…” — James 1:27</blockquote>
  `.trim(),
};

const DEFAULT_EVENT_DESCRIPTION = `
  <p>Join us for a <strong>meaningful gathering</strong> of fellowship, worship, and growing in faith together.</p>
  <p>All are welcome. Come as you are.</p>
`.trim();

// Short rich-text snippets used as review comments so the seeded data
// exercises rendering of inline tags as well as block tags.
const REVIEW_COMMENTS: string[] = [
  "<p>What a <strong>blessing</strong> to be part of this!</p>",
  "<p>Truly <em>refreshing</em>. I left encouraged and renewed.</p>",
  "<p>One of the <strong>best gatherings</strong> I've been to all year.</p>",
];

async function main() {
  console.log("→ Wiping existing data…");
  // Order matters: child tables first.
  await prisma.review.deleteMany();
  await prisma.savedEvent.deleteMany();
  await prisma.savedGroup.deleteMany();
  await prisma.rsvp.deleteMany();
  await prisma.groupMembership.deleteMany();
  await prisma.groupTag.deleteMany();
  await prisma.friendship.deleteMany();
  await prisma.event.deleteMany();
  await prisma.group.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.category.deleteMany();
  await prisma.church.deleteMany();
  await prisma.user.deleteMany();

  console.log("→ Seeding categories…");
  const categories = await Promise.all(
    mockCategories.map((c) =>
      prisma.category.create({
        data: {
          slug: slugify(c.title),
          title: c.title,
          iconName: c.iconName,
          color: c.color,
        },
      })
    )
  );
  const catBySlug = new Map(categories.map((c) => [c.slug, c]));

  console.log("→ Seeding tags…");
  const tags = await Promise.all(
    SEED_TAGS.map((t) =>
      prisma.tag.create({ data: { label: t.label, color: t.color } })
    )
  );
  const tagByLabel = new Map(tags.map((t) => [t.label, t]));

  console.log("→ Seeding users…");
  const users = await Promise.all(
    SEED_USERS.map((u) =>
      prisma.user.create({
        data: {
          name: u.name,
          email: u.email,
          avatarUrl: u.avatar,
          city: u.city,
        },
      })
    )
  );
  const userByEmail = new Map(users.map((u) => [u.email, u]));
  const sarah = userByEmail.get("sarah@faithconnect.dev")!;

  console.log("→ Seeding churches…");
  const churches = await Promise.all(
    SEED_CHURCHES.map((c) =>
      prisma.church.create({
        data: {
          name: c.name,
          description: c.description,
          verified: c.verified,
          city: c.city,
          address: c.address,
        },
      })
    )
  );
  const churchByName = new Map(churches.map((c) => [c.name, c]));

  console.log("→ Seeding groups…");
  for (const g of mockGroups) {
    const category =
      catBySlug.get(slugify(g.category)) ?? catBySlug.get("bible-study")!;
    const church = Array.from(churchByName.values()).find((ch) =>
      ch.city === g.location
    );
    const owner = users[Math.floor(Math.random() * users.length)];

    const created = await prisma.group.create({
      data: {
        name: g.groupName,
        description: g.description,
        coverImageUrl: g.coverImageUrl,
        iconName: g.groupIconName,
        city: g.location,
        meetFrequency: g.meetFrequency,
        isActive: g.isActive,
        categoryId: category.id,
        churchId: church?.id,
        ownerId: owner.id,
        tags: {
          create: g.tags
            .map((t) => tagByLabel.get(t.label))
            .filter((t): t is NonNullable<typeof t> => Boolean(t))
            .map((t) => ({ tagId: t.id })),
        },
      },
    });

    // Add some memberships so counts are non-zero.
    const sampleMembers = users.slice(0, 6);
    await Promise.all(
      sampleMembers.map((u) =>
        prisma.groupMembership.create({
          data: {
            userId: u.id,
            groupId: created.id,
            role: u.id === owner.id ? "OWNER" : "MEMBER",
          },
        })
      )
    );
  }

  console.log("→ Seeding events…");
  for (const e of mockEvents) {
    const slug = eventCategorySlug(e.title);
    const category = catBySlug.get(slug) ?? catBySlug.get("bible-study")!;
    const churchName = churchFromHost(e.hostedBy);
    const church = churchByName.get(churchName)!;

    const startsAt = parseMockDate(e.date);
    const endsAt = new Date(startsAt.getTime() + 90 * 60 * 1000);

    const created = await prisma.event.create({
      data: {
        title: e.title,
        description: EVENT_DESCRIPTIONS[e.title] ?? DEFAULT_EVENT_DESCRIPTION,
        imageUrl: e.imageUrl,
        startsAt,
        endsAt,
        timezone: "America/New_York",
        isInPerson: true,
        locationName: church.name,
        address: church.address,
        categoryId: category.id,
        churchId: church.id,
        createdById: sarah.id,
      },
    });

    // Sprinkle RSVPs across users.
    const goingCount = Math.min(users.length - 2, Math.max(3, Math.floor(e.attendees / 30)));
    const goingUsers = users.slice(0, goingCount);
    const interestedUsers = users.slice(goingCount, goingCount + 2);

    await Promise.all([
      ...goingUsers.map((u) =>
        prisma.rsvp.create({
          data: { userId: u.id, eventId: created.id, status: "GOING" },
        })
      ),
      ...interestedUsers.map((u) =>
        prisma.rsvp.create({
          data: { userId: u.id, eventId: created.id, status: "INTERESTED" },
        })
      ),
    ]);

    if (e.rating !== undefined) {
      await Promise.all(
        goingUsers.slice(0, 3).map((u, i) =>
          prisma.review.create({
            data: {
              authorId: u.id,
              eventId: created.id,
              score: Math.round(e.rating!),
              comment: REVIEW_COMMENTS[i % REVIEW_COMMENTS.length],
            },
          })
        )
      );
    }
  }

  console.log("→ Seeding friendships (Sarah ↔ a few)…");
  const friends = users.filter((u) => u.id !== sarah.id).slice(0, 4);
  await Promise.all(
    friends.map((f) =>
      prisma.friendship.create({
        data: {
          fromId: sarah.id,
          toId: f.id,
          acceptedAt: new Date(),
        },
      })
    )
  );

  console.log("✅ Seed complete.");
}

main()
  .catch((err) => {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
