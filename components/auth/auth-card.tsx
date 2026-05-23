import Link from "next/link";
import { Icon } from "@iconify/react";

type AuthCardProps = {
  title: string;
  description: string;
  children: React.ReactNode;
  footer: React.ReactNode;
};

export function AuthCard({ title, description, children, footer }: AuthCardProps) {
  return (
    <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-slate-900"
      >
        <Icon
          icon="mdi:cross"
          width={22}
          height={22}
          className="text-indigo-600"
          aria-hidden
        />
        <span className="text-base font-bold">FaithConnect</span>
      </Link>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
        <p className="mt-1 text-sm text-slate-600">{description}</p>
      </div>

      {children}

      <div className="mt-6 text-center text-sm text-slate-600">{footer}</div>
    </div>
  );
}
