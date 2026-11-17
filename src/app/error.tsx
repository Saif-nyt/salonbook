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

  return (
    <div className="flex min-h-screen flex-col bg-ivory">
      <div className="container-page flex h-20 items-center">
        <Logo />
      </div>
      <main className="container-page flex flex-1 items-center py-16">
        <div className="mx-auto max-w-xl text-center">
          <p className="eyebrow">Something went wrong</p>
          <h1 className="mt-4 font-display text-5xl leading-tight text-ink">
            We dropped a pin.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            An unexpected error interrupted this page. Nothing has been charged and your
            appointments are safe. Try again, or return to the salon.
          </p>
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
        </div>
      </main>
    </div>
  );
}
