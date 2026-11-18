"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useAuth } from "@/lib/auth-context";
import { safeRedirect } from "@/lib/utils";
import { Field, Input } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { GoogleButton } from "./google-button";

const schema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
  password: z.string().min(1, "Enter your password"),
});

type Values = z.infer<typeof schema>;

export function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { completeSignIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const requestedRedirect = searchParams.get("redirect");
  const redirectTo = safeRedirect(requestedRedirect);

  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    const { error } = await authClient.signIn.email({
      email: values.email.trim(),
      password: values.password,
    });

    if (error) {
      const message =
        error.status === 403
          ? "This account has been blocked. Please contact the salon."
          : error.status === 401
            ? "That email and password combination doesn't match our records."
            : error.message ?? "We couldn't sign you in. Please try again.";
      form.setError("root", { message });
      toast.error(message);
      return;
    }

    const user = await completeSignIn();
    toast.success("Welcome back", {
      description: user ? `Signed in as ${user.name}.` : "You're signed in.",
    });

    const destination =
      requestedRedirect && requestedRedirect !== "/dashboard"
        ? redirectTo
        : user?.role === "admin"
          ? "/admin"
          : redirectTo;

    router.push(destination);
    router.refresh();
  });

  return (
    <div className="space-y-6">
      <GoogleButton callbackPath={redirectTo} />

      <div className="flex items-center gap-3">
        <span className="h-px flex-1 bg-line" />
        <span className="text-[10px] uppercase tracking-[0.2em] text-muted">
          or with email
        </span>
        <span className="h-px flex-1 bg-line" />
      </div>

      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <Field
          label="Email address"
          htmlFor="email"
          required
          error={form.formState.errors.email?.message}
        >
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            invalid={Boolean(form.formState.errors.email)}
            {...form.register("email")}
          />
        </Field>

        <Field
          label="Password"
          htmlFor="password"
          required
          error={form.formState.errors.password?.message}
        >
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Your password"
              className="pr-11"
              invalid={Boolean(form.formState.errors.password)}
              {...form.register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              className="absolute right-1.5 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded text-muted hover:text-charcoal"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </Field>

        {form.formState.errors.root?.message ? (
          <p
            className="rounded-md border border-[#e7c2be] bg-[#f6e3e1] px-3 py-2.5 text-xs leading-relaxed text-[#8f241d]"
            role="alert"
          >
            {form.formState.errors.root.message}
          </p>
        ) : null}

        <Button type="submit" className="w-full" isLoading={form.formState.isSubmitting}>
          <LogIn className="size-4" />
          Sign in
        </Button>
      </form>

      <p className="text-center text-xs leading-relaxed text-muted">
        New to SalonBook?{" "}
        <Link
          href={
            requestedRedirect
              ? `/sign-up?redirect=${encodeURIComponent(redirectTo)}`
              : "/sign-up"
          }
          className="font-semibold text-deep-red underline-offset-4 hover:underline"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
}
