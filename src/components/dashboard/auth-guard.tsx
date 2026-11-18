"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ShieldAlert } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { buttonStyles } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { Role } from "@/lib/types";

export function AuthGuard({
  role,
  children,
}: {
  role: Role;
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading || user) return;
    router.replace(`/sign-in?redirect=${encodeURIComponent(pathname)}`);
  }, [isLoading, user, pathname, router]);

  if (isLoading) {
    return (
      <div className="container-page py-12">
        <Skeleton className="h-8 w-48" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-32 w-full rounded-lg" />
          ))}
        </div>
        <Skeleton className="mt-8 h-96 w-full rounded-lg" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container-page py-24 text-center">
        <p className="font-display text-3xl text-charcoal">Taking you to sign in…</p>
      </div>
    );
  }

  if (user.role !== role) {
    return (
      <div className="container-page py-20">
        <div className="mx-auto max-w-lg rounded-[22px] border border-warm-taupe/40 bg-soft-ivory p-8 text-center shadow-elevated sm:p-10">
          <span className="mx-auto grid size-12 place-items-center rounded-full bg-[#f7e6e4] text-[#8f241d]">
            <ShieldAlert className="size-5" />
          </span>
          <h1 className="mt-5 font-display text-4xl leading-tight text-charcoal">
            This area isn&apos;t for your account.
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">
            You&apos;re signed in as a {user.role}. Use the area that matches your account, or
            return to the salon.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href={user.role === "admin" ? "/admin" : "/dashboard"}
              className={buttonStyles({ variant: "secondary", size: "sm" })}
            >
              Go to my dashboard
            </Link>
            <Link href="/services" className={buttonStyles({ size: "sm" })}>
              Browse services
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
