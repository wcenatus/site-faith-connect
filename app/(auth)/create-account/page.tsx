import type { Metadata } from "next";
import Link from "next/link";
import { AuthCard } from "@/components/auth/auth-card";
import { CreateAccountForm } from "@/components/auth/create-account-form";

export const metadata: Metadata = {
  title: "Create account | FaithConnect",
  description: "Create your FaithConnect account.",
};

export default function CreateAccountPage() {
  return (
    <AuthCard
      title="Create your account"
      description="Join FaithConnect to discover events, groups, and people near you."
      footer={
        <>
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-[#2c4a32] hover:underline"
          >
            Log in
          </Link>
        </>
      }
    >
      <CreateAccountForm />
    </AuthCard>
  );
}
