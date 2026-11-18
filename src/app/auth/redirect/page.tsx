"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Logo } from "@/components/ui/logo";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Hand-off page for OAuth sign-in. The provider callback lands here, the session
 * is hydrated, and the user is sent to the dashboard that matches their role.
 */
export default function AuthRedirectPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      router.replace("/sign-in");
      return;
    }
    router.replace(user.role === "admin" ? "/admin" : "/dashboard");
  }, [isLoading, user, router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-warm-cream px-6 text-center">
      <Logo />
      <p className="mt-8 max-w-sm text-[15px] leading-relaxed text-muted">
        Signing you in and opening the right dashboard…
      </p>
      <div className="mt-6 w-full max-w-xs space-y-3">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3 mx-auto" />
      </div>
    </div>
  );
}
