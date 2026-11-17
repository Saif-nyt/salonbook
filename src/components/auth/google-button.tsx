"use client";

import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

function GoogleGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
      <path
        fill="#4285F4"
        d="M21.6 12.227c0-.709-.064-1.39-.182-2.045H12v3.868h5.382a4.6 4.6 0 0 1-1.996 3.018v2.51h3.232c1.891-1.742 2.982-4.305 2.982-7.351Z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.7 0 4.964-.895 6.618-2.422l-3.232-2.51c-.895.6-2.04.955-3.386.955-2.605 0-4.81-1.76-5.595-4.122H3.064v2.59A9.996 9.996 0 0 0 12 22Z"
      />
      <path
        fill="#FBBC05"
        d="M6.405 13.901a6.01 6.01 0 0 1 0-3.802v-2.59H3.064a9.996 9.996 0 0 0 0 8.982l3.341-2.59Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.977c1.468 0 2.786.505 3.823 1.496l2.868-2.868C16.959 2.991 14.695 2 12 2a9.996 9.996 0 0 0-8.936 5.509l3.341 2.59C7.19 7.736 9.395 5.977 12 5.977Z"
      />
    </svg>
  );
}

export function GoogleButton({
  callbackPath,
  label = "Continue with Google",
}: {
  callbackPath: string;
  label?: string;
}) {
  const [isPending, setIsPending] = useState(false);
  const enabled = process.env.NEXT_PUBLIC_GOOGLE_AUTH_ENABLED !== "false";

  if (!enabled) return null;

  const handleClick = async () => {
    setIsPending(true);
    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: `${window.location.origin}${callbackPath}`,
        errorCallbackURL: `${window.location.origin}/sign-in?error=google`,
      });

      if (error) {
        toast.error(
          error.message ??
            "Google sign-in is not available right now. Please use your email instead.",
        );
        setIsPending(false);
      }
    } catch {
      toast.error(
        "Google sign-in is not available right now. Please use your email instead.",
      );
      setIsPending(false);
    }
  };

  return (
    <button
      type="button"
      onClick={() => void handleClick()}
      disabled={isPending}
      className="flex h-11 w-full items-center justify-center gap-3 rounded-md border border-line bg-cream text-sm font-medium text-ink transition-colors hover:border-terracotta/40 hover:bg-sand/40 disabled:opacity-60"
    >
      {isPending ? <Loader2 className="size-4 animate-spin" /> : <GoogleGlyph />}
      {label}
    </button>
  );
}
