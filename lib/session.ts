import { auth } from "@/auth";
import type { SessionUser } from "@/types/session-user";

export async function getCurrentUser(): Promise<SessionUser | null> {
  const session = await auth();
  return session?.user ?? null;
}
