import Image from "next/image";

export type PeopleGridPerson = {
  name?: string;
  imageUrl: string;
};

export type PeopleGridProps = {
  /** People to render as a grid of large circular avatars. */
  people: PeopleGridPerson[];
  /** Optional cap on how many avatars are rendered. */
  max?: number;
  /** Fallback alt text used when an entry has no `name`. */
  fallbackAlt?: string;
  className?: string;
};

export const PeopleGrid = ({
  people,
  max,
  fallbackAlt = "Person",
  className,
}: PeopleGridProps) => {
  const visible = typeof max === "number" ? people.slice(0, max) : people;

  if (visible.length === 0) {
    return null;
  }

  return (
    <div
      className={["flex flex-wrap gap-2", className].filter(Boolean).join(" ")}
    >
      {visible.map((person, idx) => (
        <div
          key={`${person.imageUrl}-${idx}`}
          className="relative h-20 w-20 overflow-hidden rounded-full"
        >
          <Image
            src={person.imageUrl}
            alt={person.name ?? fallbackAlt}
            fill
            sizes="80px"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
};
