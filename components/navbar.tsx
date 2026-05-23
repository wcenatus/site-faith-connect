"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import { signOutUser } from "@/server/auth/signOut";
import { getInitials, type SessionUser } from "@/types/session-user";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Explore", href: "/explore" },
  { label: "Events", href: "/events", icon: "mdi:calendar-month" },
  { label: "Groups", href: "/groups", icon: "mdi:account-group" },
  { label: "Messages", href: "/messages", icon: "mdi:message" },
];

type NavbarProps = {
  user: SessionUser | null;
};

export function Navbar({ user }: NavbarProps) {
  const pathname = usePathname();

  return (
    <nav className="w-full border-b border-slate-200 bg-white">
      <div className="flex h-14 items-center gap-5 px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Icon
            icon="mdi:cross"
            width={22}
            height={22}
            className="text-indigo-600"
          />
          <span className="text-base font-bold text-slate-900">
            FaithConnect
          </span>
        </Link>

        <button className="flex w-60 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-left">
          <Icon
            icon="mdi:magnify"
            width={16}
            height={16}
            className="shrink-0 text-slate-400"
          />
          <span className="flex-1 truncate text-sm text-slate-400">
            Search events, groups, people...
          </span>
        </button>

        <div className="flex h-full flex-1 items-stretch gap-0.5">
          {NAV_ITEMS.map(({ label, href, icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={[
                  "relative flex items-center gap-1.5 px-3 text-sm font-semibold transition-colors",
                  isActive
                    ? "text-indigo-600"
                    : "text-slate-600 hover:text-slate-900",
                ].join(" ")}
              >
                {icon && (
                  <Icon
                    icon={icon}
                    width={16}
                    height={16}
                    className={isActive ? "text-indigo-600" : "text-slate-400"}
                  />
                )}
                {label}
                {isActive && (
                  <span className="absolute right-0 bottom-0 left-0 h-0.5 rounded-t-full bg-indigo-600" />
                )}
              </Link>
            );
          })}
        </div>

        <button className="relative shrink-0 rounded-full p-1.5 transition-colors hover:bg-slate-100">
          <Icon
            icon="mdi:bell-outline"
            width={22}
            height={22}
            className="text-slate-600"
          />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-orange-400 ring-2 ring-white" />
        </button>

        {user ? (
          <div className="flex shrink-0 items-center gap-3">
            <div className="flex items-center gap-2">
              {user.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.image}
                  alt=""
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-violet-500 to-indigo-600">
                  <span className="text-sm font-semibold text-white select-none">
                    {getInitials(user.name)}
                  </span>
                </div>
              )}
              <span className="max-w-32 truncate text-sm font-medium text-slate-700">
                {user.name ?? user.email}
              </span>
            </div>
            <form action={signOutUser}>
              <button
                type="submit"
                className="rounded-lg px-3 py-1.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
              >
                Sign out
              </button>
            </form>
          </div>
        ) : (
          <div className="flex shrink-0 items-center gap-2">
            <Link
              href="/login"
              className="rounded-lg px-3 py-1.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
            >
              Log in
            </Link>
            <Link
              href="/create-account"
              className="rounded-lg bg-[#2c4a32] px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-[#23391f]"
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
