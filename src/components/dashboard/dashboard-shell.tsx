"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  CalendarDays,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Sparkles,
  UserRound,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

const customerNav: NavItem[] = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/appointments", label: "My Appointments", icon: CalendarDays },
  { href: "/dashboard/payments", label: "Payments", icon: CreditCard },
  { href: "/dashboard/profile", label: "My Profile", icon: UserRound },
];

const adminNav: NavItem[] = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/services", label: "Manage Services", icon: Sparkles },
  { href: "/admin/services?new=1", label: "Add/Update Service", icon: Sparkles },
  { href: "/admin/appointments", label: "Manage Appointments", icon: CalendarDays },
  { href: "/admin/users", label: "Manage Users", icon: Users },
  { href: "/admin/transactions", label: "Transactions", icon: CreditCard },
  { href: "/admin/profile", label: "My Profile", icon: UserRound },
];

export function DashboardShell({
  role,
  title,
  description,
  actions,
  children,
}: {
  role: "customer" | "admin";
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const items = role === "admin" ? adminNav : customerNav;
  const baseHref = role === "admin" ? "/admin" : "/dashboard";

  return (
    <div className="min-h-screen bg-warm-cream">
      <div className="border-b border-warm-taupe/35 bg-soft-ivory/90 backdrop-blur-md">
        <div className="container-page flex h-[72px] items-center justify-between gap-4">
          <Logo href="/" />
          <div className="flex items-center gap-3">
            <Link
              href="/services"
              className="hidden items-center gap-1.5 text-xs font-medium text-muted transition-colors hover:text-charcoal sm:flex"
            >
              Browse services
              <ArrowUpRight className="size-3.5" />
            </Link>
            <div className="hidden h-6 w-px bg-warm-taupe/45 sm:block" />
            <div className="flex items-center gap-2.5">
              <Avatar name={user?.name ?? "Guest"} image={user?.image} className="size-8" />
              <div className="hidden leading-tight sm:block">
                <p className="max-w-36 truncate text-xs font-semibold text-charcoal">
                  {user?.name ?? "Guest"}
                </p>
                <p className="text-[10px] uppercase tracking-[0.14em] text-muted">
                  {role === "admin" ? "Administrator" : "Customer"}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => void signOut()}
              className="text-muted hover:text-charcoal"
            >
              <LogOut className="size-4" />
              <span className="hidden sm:inline">Sign out</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="container-page grid gap-8 py-8 lg:grid-cols-[16rem_1fr] lg:py-10">
        <aside className="hidden lg:block">
          <div className="sticky top-6 overflow-hidden rounded-[20px] border border-white/10 bg-charcoal p-3 text-white shadow-elevated">
            <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-deep-red/25 blur-2xl" aria-hidden />
            <p className="relative px-3 pb-2 pt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">
              {role === "admin" ? "Admin dashboard" : "Customer dashboard"}
            </p>
            <nav className="relative space-y-1">
              {items.map((item) => {
                const itemPath = item.href.split("?")[0];
                const active =
                  itemPath === baseHref
                    ? pathname === baseHref
                    : pathname === itemPath || pathname.startsWith(`${itemPath}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-[12px] px-3 py-2.5 text-sm transition-all duration-200",
                      active
                        ? "bg-white/12 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]"
                        : "text-white/70 hover:bg-white/8 hover:text-white",
                    )}
                  >
                    <item.icon className="size-4" />
                    <span className="flex-1">{item.label}</span>
                    {active ? (
                      <span className="size-1.5 rounded-full bg-deep-red" aria-hidden />
                    ) : null}
                  </Link>
                );
              })}
            </nav>
            <div className="relative mt-4 border-t border-white/10 pt-3">
              <div className="flex items-center gap-2.5 px-3 py-2">
                <Avatar name={user?.name ?? "Guest"} image={user?.image} className="size-8 ring-0" />
                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold text-white">
                    {user?.name ?? "Guest"}
                  </p>
                  <p className="truncate text-[10px] text-white/55">{user?.email}</p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <div className="min-w-0">
          <div className="mb-6 overflow-x-auto pb-1 no-scrollbar lg:hidden">
            <div className="flex gap-2">
              {items.map((item) => {
                const itemPath = item.href.split("?")[0];
                const active =
                  itemPath === baseHref
                    ? pathname === baseHref
                    : pathname === itemPath || pathname.startsWith(`${itemPath}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-medium transition-all duration-200",
                      active
                        ? "border-charcoal bg-charcoal text-white shadow-[0_10px_24px_-18px_rgba(28,28,28,0.7)]"
                        : "border-warm-taupe/50 bg-soft-ivory text-charcoal hover:border-charcoal/25",
                    )}
                  >
                    <item.icon className="size-3.5" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">
                {role === "admin" ? "Salon operations" : "Your account"}
              </p>
              <h1 className="mt-2 font-display text-[clamp(2.1rem,4.5vw,3.1rem)] leading-[1.02] text-charcoal">
                {title}
              </h1>
              {description ? (
                <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-muted sm:text-base">
                  {description}
                </p>
              ) : null}
            </div>
            {actions ? <div className="flex shrink-0 flex-wrap gap-3">{actions}</div> : null}
          </div>

          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  );
}