import type { Metadata } from "next";
import Link from "next/link";
import { AuthCard } from "@/components/auth/auth-card";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Log in | FaithConnect",
  description: "Log in to your FaithConnect account.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ registered?: string }>;
}) {
  const { registered } = await searchParams;
  const showRegisteredMessage = registered === "1";

  return (
    <AuthCard
      title="Welcome back"
      description="Log in to connect with your church community."
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link
            href="/create-account"
            className="font-semibold text-[#2c4a32] hover:underline"
          >
            Create one
          </Link>
        </>
      }
    >
      {showRegisteredMessage && (
        <p
          role="status"
          className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700"
        >
          Account created. Log in with your email and password.
        </p>
      )}
      <LoginForm />
    </AuthCard>
  );
}
