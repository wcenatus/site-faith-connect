import type { ReactNode } from "react";

export type CategoryCardProps = {
  title: string;
  icon: ReactNode;
  number_of_events: number;
  color: string;
};

export function CategoryCard({ title, icon, number_of_events, color }: CategoryCardProps) {
  const colorClass = `bg-${color}-50 text-${color}-500`;
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl w-50 bg-zinc-100 px-6 py-5">
      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${colorClass}`}>
        {icon}
      </div>
      <div className="flex flex-col items-center gap-0.5 text-center">
        <span className="text-sm font-semibold text-slate-800">{title}</span>
        <span className="text-xs text-slate-400">
          {number_of_events} {number_of_events === 1 ? "Event" : "Events"}
        </span>
      </div>
    </div>
  );
}
