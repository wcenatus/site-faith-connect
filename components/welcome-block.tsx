import Image from "next/image";

const DEFAULT_BG = "/images/cross.png";

type BibleVerseResponse = {
  bookname: string;
  chapter: string;
  verse: string;
  text: string;
}[];

async function fetchVerseOfTheDay(): Promise<{
  text: string;
  citation: string;
}> {
  try {
    const res = await fetch(
      "https://labs.bible.org/api/?passage=votd&type=json",
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) throw new Error("API error");
    const data: BibleVerseResponse = await res.json();
    const { bookname, chapter, verse, text } = data[0];
    return {
      text: text.replace(/&#(\d+);/g, (_, code) =>
        String.fromCharCode(Number(code))
      ),
      citation: `${bookname} ${chapter}:${verse}`,
    };
  } catch {
    return {
      text: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.",
      citation: "Joshua 1:9",
    };
  }
}

export type WelcomeBlockProps = {
  name: string;
  /** Public URL or path under `public/` (e.g. `/images/my-banner.png`). */
  bgImage?: string;
  className?: string;
};

export async function WelcomeBlock({
  name,
  bgImage = DEFAULT_BG,
  className = "",
}: WelcomeBlockProps) {
  const { text, citation } = await fetchVerseOfTheDay();

  return (
    <section
      className={[
        "relative isolate w-full min-h-44 overflow-hidden rounded-xl shadow-md ring-1 ring-black/5 md:min-h-52",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Image
        src={bgImage}
        alt=""
        fill
        priority
        className="object-cover object-[center_right]"
        sizes="100vw"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/85 via-white/45 to-transparent md:from-white/75 md:via-white/35"
        aria-hidden
      />
      <div className="relative z-[1] flex max-w-xl flex-col gap-2 px-6 py-6 pr-28 text-left md:gap-3 md:px-8 md:py-8 md:pr-36">
        <h2 className="font-sans text-xl font-bold leading-tight text-slate-900 md:text-2xl">
          Welcome back, {name}! 👋
        </h2>
        <p className="font-sans text-sm leading-snug text-slate-800 md:text-base">
          &ldquo;{text}&rdquo;
        </p>
        <p className="font-sans text-sm font-bold text-slate-900 md:text-base">
          {citation}
        </p>
      </div>
    </section>
  );
}
