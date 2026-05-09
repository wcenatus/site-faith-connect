"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Explore", href: "/explore" },
  { label: "Events", href: "/events", icon: "mdi:calendar-month" },
  { label: "Groups", href: "/groups", icon: "mdi:account-group" },
  { label: "Messages", href: "/messages", icon: "mdi:message" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="w-full bg-white border-b border-slate-200">
      <div className="flex items-center gap-5 px-6 h-14">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Icon
            icon="mdi:cross"
            width={22}
            height={22}
            className="text-indigo-600"
          />
          <span className="font-bold text-slate-900 text-base">
            FaithConnect
          </span>
        </Link>

        {/* Search */}
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 w-60 text-left">
          <Icon
            icon="mdi:magnify"
            width={16}
            height={16}
            className="text-slate-400 shrink-0"
          />
          <span className="text-sm text-slate-400 flex-1 truncate">
            Search events, groups, people...
          </span>
        </button>

        {/* Nav items */}
        <div className="flex items-stretch gap-0.5 flex-1 h-full">
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
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-t-full" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Bell */}
        <button className="relative p-1.5 rounded-full hover:bg-slate-100 transition-colors shrink-0">
          <Icon
            icon="mdi:bell-outline"
            width={22}
            height={22}
            className="text-slate-600"
          />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-400 rounded-full ring-2 ring-white" />
        </button>

        {/* User */}
        <button className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-full bg-linear-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
            <span className="text-white text-sm font-semibold select-none">
              S
            </span>
          </div>
          <span className="text-sm font-medium text-slate-700">Sarah</span>
          <Icon
            icon="mdi:chevron-down"
            width={16}
            height={16}
            className="text-slate-500"
          />
        </button>
      </div>
    </nav>
  );
}
