import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthShell } from "@/components/auth/auth-shell";
import { SignInForm } from "@/components/auth/sign-in-form";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to manage your SalonBook appointments.",
};

function FormFallback() {
  return (
    <div className="space-y-5">
      <Skeleton className="h-11 w-full" />
      <Skeleton className="h-11 w-full" />
      <Skeleton className="h-11 w-full" />
      <Skeleton className="h-11 w-full" />
    </div>
  );
}

export default function SignInPage() {
  return (
    <AuthShell
      title="Welcome back."
      subtitle="Sign in to request appointments, manage your bookings and keep track of payments."
      footer={
        <p className="text-xs leading-relaxed text-muted">
          By signing in you agree to our booking terms. Payment is only collected after
          the salon confirms your appointment.
        </p>
      }
    >
      <Suspense fallback={<FormFallback />}>
        <SignInForm />
      </Suspense>
    </AuthShell>
  );
}
