import Image from "next/image";
import { Icon } from "@iconify/react";
import Link from "next/link";
export type EventCardProps = {
  title: string;
  date: string;
  hostedBy: string;
  id: string;
  rating?: number;
  attendees: number;
  imageUrl: string;
  imageAlt?: string;
};

export function EventCard({
  title,
  date,
  hostedBy,
  id,
  rating,
  attendees,
  imageUrl,
  imageAlt = "",
}: EventCardProps) {
  return (
    <Link
      href={`/event/${id}`}
      className="group flex w-80 flex-col gap-3 cursor-pointer rounded-2xl p-1 transition-colors hover:bg-zinc-100"
    >
      {/* Image stands alone with its own rounded corners */}
      <div className="relative h-44 w-full overflow-hidden rounded-2xl">
        {imageUrl ? (
          <Image src={imageUrl} alt={imageAlt} fill className="object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-200 object-cover">
            <span className="text-slate-400">No Image</span>
          </div>
        )}
      </div>

      {/* Text sits freely below the image, no card container */}
      <div className="flex flex-col gap-1 px-1">
        <h3 className="text-base font-bold leading-snug text-slate-900">
          {title}
        </h3>
        <p className="text-sm text-slate-500">{date}</p>
        <div className="flex items-center gap-1 text-sm text-slate-500">
          <span>by {hostedBy}</span>
          {rating !== undefined && (
            <>
              <span className="mx-1 text-slate-300">•</span>
              <span className="font-medium text-slate-700">
                {rating.toFixed(1)}
              </span>
              <Icon
                icon="mdi:star"
                className="text-yellow-400"
                width={14}
                height={14}
              />
            </>
          )}
        </div>
        <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
          <Icon
            icon="mdi:account-circle"
            width={22}
            height={22}
            className="text-slate-400"
          />
          <span>{attendees} attendees</span>
        </div>
      </div>
    </Link>
  );
}
