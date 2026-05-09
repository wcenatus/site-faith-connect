import { Icon } from "@iconify/react";

export type ProfileCardProps = {
  name: string;
  description: string;
  link: string;
  linkLabel?: string;
  logoUrl?: string;
  verified?: boolean;
};

export function ProfileCard({
  name,
  description,
  link,
  linkLabel = "View church profile",
  logoUrl,
  verified = false,
}: ProfileCardProps) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4 w-full">
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 overflow-hidden">
        {logoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={logoUrl} alt={name} className="h-full w-full object-cover" />
        ) : (
          <Icon icon="mdi:account-circle" width={28} height={28} className="text-slate-400" />
        )}
      </div>

      <div className="flex flex-col gap-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-bold text-slate-900">{name}</span>
          {verified && (
            <Icon icon="mdi:check-decagram" width={16} height={16} className="text-blue-500 shrink-0" />
          )}
        </div>

        <p className="text-xs text-slate-500 leading-relaxed">{description}</p>

        <a
          href={link}
          className="mt-0.5 text-xs font-semibold text-indigo-600 hover:underline"
        >
          {linkLabel}
        </a>
      </div>
    </div>
  );
}
