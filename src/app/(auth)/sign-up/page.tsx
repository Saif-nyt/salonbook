import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthShell } from "@/components/auth/auth-shell";
import { SignUpForm } from "@/components/auth/sign-up-form";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Create an account",
  description: "Create a SalonBook account to book salon appointments online.",
};

function FormFallback() {
  return (
    <div className="space-y-5">
      <Skeleton className="h-11 w-full" />
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton key={index} className="h-11 w-full" />
      ))}
      <Skeleton className="h-11 w-full" />
    </div>
  );
}

export default function SignUpPage() {
  return (
    <AuthShell
      title="Meet your new ritual."
      subtitle="Create an account to request appointments with our hair, skin, nail and body specialists."
      footer={
        <p className="text-xs leading-relaxed text-muted">
          New accounts are customer accounts. Salon access is managed separately by the
          SalonBook team.
        </p>
      }
    >
      <Suspense fallback={<FormFallback />}>
        <SignUpForm />
      </Suspense>
    </AuthShell>
  );
}
