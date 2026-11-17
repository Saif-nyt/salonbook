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
import { cn, initials } from "@/lib/utils";
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
  { href: "/dashboard/appointments", label: "My appointments", icon: CalendarDays },
  { href: "/dashboard/payments", label: "Payments", icon: CreditCard },
  { href: "/dashboard/profile", label: "My profile", icon: UserRound },
];

const adminNav: NavItem[] = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/services", label: "Services", icon: Sparkles },
  { href: "/admin/appointments", label: "Appointments", icon: CalendarDays },
  { href: "/admin/users", label: "Customers", icon: Users },
  { href: "/admin/transactions", label: "Transactions", icon: CreditCard },
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
    <div className="min-h-screen bg-ivory">
      <div className="border-b border-line bg-cream">
        <div className="container-page flex h-16 items-center justify-between gap-4">
          <Logo href="/" />
          <div className="flex items-center gap-3">
            <Link
              href="/services"
              className="hidden items-center gap-1.5 text-xs font-medium text-muted transition-colors hover:text-terracotta sm:flex"
            >
              Browse the salon
              <ArrowUpRight className="size-3.5" />
            </Link>
            <div className="hidden h-6 w-px bg-line sm:block" />
            <div className="flex items-center gap-2.5">
              <Avatar name={user?.name ?? "Guest"} image={user?.image} className="size-8" />
              <div className="hidden leading-tight sm:block">
                <p className="max-w-36 truncate text-xs font-semibold text-ink">
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
              className="text-muted"
            >
              <LogOut className="size-4" />
              <span className="hidden sm:inline">Sign out</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="container-page grid gap-8 py-8 lg:grid-cols-[15rem_1fr] lg:py-10">
        <aside className="hidden lg:block">
          <div className="sticky top-6 space-y-1 rounded-lg border border-line bg-cream p-2.5">
            {items.map((item) => {
              const active =
                item.href === baseHref
                  ? pathname === baseHref
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors",
                    active
                      ? "bg-ink text-cream"
                      : "text-ink-soft hover:bg-sand/60 hover:text-ink",
                  )}
                >
                  <item.icon className="size-4" />
                  {item.label}
                </Link>
              );
            })}
            <div className="my-2 border-t border-line" />
            <div className="flex items-center gap-2.5 px-3 py-2">
              <span className="grid size-8 place-items-center rounded-full bg-sand font-display text-sm text-terracotta">
                {initials(user?.name ?? "SB")}
              </span>
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold text-ink">
                  {user?.name ?? "Guest"}
                </p>
                <p className="truncate text-[10px] text-muted">{user?.email}</p>
              </div>
            </div>
          </div>
        </aside>

        <div className="min-w-0">
          <div className="mb-6 overflow-x-auto pb-1 no-scrollbar lg:hidden">
            <div className="flex gap-2">
              {items.map((item) => {
                const active =
                  item.href === baseHref
                    ? pathname === baseHref
                    : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-medium",
                      active
                        ? "border-ink bg-ink text-cream"
                        : "border-line bg-cream text-ink-soft",
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
              <h1 className="mt-2 font-display text-4xl leading-tight text-ink">
                {title}
              </h1>
              {description ? (
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                  {description}
                </p>
              ) : null}
            </div>
            {actions ? <div className="flex shrink-0 gap-3">{actions}</div> : null}
          </div>

          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
