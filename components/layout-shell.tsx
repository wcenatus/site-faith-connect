"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar";
import type { SessionUser } from "@/types/session-user";

const AUTH_PATH_PREFIXES = ["/login", "/create-account"];

type LayoutShellProps = {
  children: React.ReactNode;
  user: SessionUser | null;
};

export function LayoutShell({ children, user }: LayoutShellProps) {
  const pathname = usePathname();
  const isAuthRoute = AUTH_PATH_PREFIXES.some((path) =>
    pathname.startsWith(path),
  );

  if (isAuthRoute) {
    return children;
  }

  return (
    <>
      <Navbar user={user} />
      <main className="mx-auto w-full max-w-[1400px] px-1 py-8">{children}</main>
    </>
  );
}
