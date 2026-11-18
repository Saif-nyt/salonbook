"use client";

import Link from "next/link";
import { useEffect } from "react";
import { RotateCcw } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { Button, buttonStyles } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const isDev = process.env.NODE_ENV === "development";

  return (
    <div className="flex min-h-screen flex-col bg-warm-cream">
      <div className="container-page flex h-20 items-center">
        <Logo />
      </div>
      <main className="container-page flex flex-1 items-center py-16">
        <div className="mx-auto max-w-xl rounded-lg border border-warm-taupe/50 bg-soft-ivory p-8 text-center shadow-card sm:p-10">
          <p className="eyebrow">Something went wrong</p>
          <h1 className="mt-4 font-display text-5xl leading-tight text-charcoal">
            We couldn&apos;t load this page.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
            An unexpected error interrupted this page. Your appointments and account are
            safe. Please try again, or return home.
          </p>
          {isDev && error.message ? (
            <p className="mt-4 rounded-md border border-warm-taupe/50 bg-warm-cream px-3 py-2 text-left text-xs text-charcoal">
              {error.message}
            </p>
          ) : null}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button onClick={reset}>
              <RotateCcw className="size-4" />
              Try again
            </Button>
            <Link href="/" className={buttonStyles({ variant: "outline" })}>
              Back home
            </Link>
          </div>
          {error.digest ? (
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
              Reference {error.digest}
            </p>
          ) : null}
          {isDev && error.stack ? (
            <pre className="mt-4 max-h-48 overflow-auto rounded-md border border-warm-taupe/50 bg-warm-cream p-3 text-left text-[10px] leading-relaxed text-muted">
              {error.stack}
            </pre>
          ) : null}
        </div>
      </main>
    </div>
  );
}
