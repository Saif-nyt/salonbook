"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  UserRound,
  X,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { NAV_LINKS } from "@/lib/constants";
import { cn, initials } from "@/lib/utils";
import { Button, buttonStyles } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { Avatar } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

export function Navbar() {
  const { user, isLoading, isAdmin, signOut } = useAuth();
  const pathname = usePathname();
  // Menus remember the route they were opened on, so navigating closes them
  // without a setState-in-effect cascade.
  const [mobileOpenAt, setMobileOpenAt] = useState<string | null>(null);
  const [menuOpenAt, setMenuOpenAt] = useState<string | null>(null);
  const mobileOpen = mobileOpenAt === pathname;
  const menuOpen = menuOpenAt === pathname;
  const menuRef = useRef<HTMLDivElement>(null);

  const closeMobile = () => setMobileOpenAt(null);
  const closeMenu = () => setMenuOpenAt(null);

  useEffect(() => {
    if (!menuOpen) return;

    const handleClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpenAt(null);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  return (
    <>
      <div className="bg-ink text-cream/80">
        <div className="container-page flex h-9 items-center justify-between text-[10px] font-medium uppercase tracking-[0.18em]">
          <p>Now booking autumn appointments</p>
          <a href="tel:+17185550142" className="hidden transition-colors hover:text-cream sm:block">
            +1 (718) 555-0142
          </a>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-line/80 bg-ivory/92 backdrop-blur-md">
        <div className="container-page flex h-[74px] items-center justify-between gap-6">
          <Logo />

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href) && link.href !== "/#experience" && link.href !== "/#visit";
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-[13px] font-medium tracking-wide transition-colors hover:text-terracotta",
                    active ? "text-terracotta" : "text-ink-soft",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            {isLoading ? (
              <Skeleton className="h-9 w-36" />
            ) : user ? (
              <div className="relative" ref={menuRef}>
                <button
                  type="button"
                  onClick={() =>
                    setMenuOpenAt((current) => (current === pathname ? null : pathname))
                  }
                  className="flex items-center gap-2.5 rounded-full border border-line bg-cream py-1.5 pl-1.5 pr-3 transition-colors hover:border-terracotta/40"
                  aria-haspopup="menu"
                  aria-expanded={menuOpen}
                >
                  <Avatar name={user.name} image={user.image} className="size-8" />
                  <span className="max-w-28 truncate text-xs font-semibold text-ink">
                    {user.name.split(" ")[0] ?? user.name}
                  </span>
                  <ChevronDown className="size-3.5 text-muted" />
                </button>

                {menuOpen ? (
                  <div
                    className="absolute right-0 mt-2 w-56 overflow-hidden rounded-lg border border-line bg-cream py-1.5 shadow-soft"
                    role="menu"
                  >
                    <div className="border-b border-line px-4 py-3">
                      <p className="truncate text-sm font-semibold text-ink">{user.name}</p>
                      <p className="truncate text-xs text-muted">{user.email}</p>
                    </div>
                    <Link
                      href={isAdmin ? "/admin" : "/dashboard"}
                      onClick={closeMenu}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-ink-soft transition-colors hover:bg-sand/60"
                      role="menuitem"
                    >
                      <LayoutDashboard className="size-4" />
                      {isAdmin ? "Admin dashboard" : "My dashboard"}
                    </Link>
                    {!isAdmin ? (
                      <Link
                        href="/dashboard/profile"
                        onClick={closeMenu}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-ink-soft transition-colors hover:bg-sand/60"
                        role="menuitem"
                      >
                        <UserRound className="size-4" />
                        My profile
                      </Link>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => void signOut()}
                      className="flex w-full items-center gap-2.5 border-t border-line px-4 py-2.5 text-left text-sm text-ink-soft transition-colors hover:bg-sand/60"
                      role="menuitem"
                    >
                      <LogOut className="size-4" />
                      Sign out
                    </button>
                  </div>
                ) : null}
              </div>
            ) : (
              <>
                <Link href="/sign-in" className={buttonStyles({ variant: "ghost", size: "sm" })}>
                  Sign in
                </Link>
                <Link href="/sign-up" className={buttonStyles({ size: "sm" })}>
                  Book a visit
                </Link>
              </>
            )}
          </div>

          <button
            type="button"
            className="grid size-10 place-items-center rounded-full border border-line text-ink lg:hidden"
            onClick={() => setMobileOpenAt((open) => (open === pathname ? null : pathname))}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {mobileOpen ? (
          <div className="border-t border-line bg-cream lg:hidden">
            <div className="container-page space-y-1 py-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobile}
                  className="block rounded-md px-3 py-3 text-sm font-medium text-ink-soft transition-colors hover:bg-sand/60"
                >
                  {link.label}
                </Link>
              ))}

              <div className="border-t border-line pt-4">
                {user ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 px-3">
                      <Avatar name={user.name} image={user.image} className="size-9" />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-ink">{user.name}</p>
                        <p className="truncate text-xs text-muted">{user.email}</p>
                      </div>
                    </div>
                    <Link
                      href={isAdmin ? "/admin" : "/dashboard"}
                      onClick={closeMobile}
                      className={buttonStyles({ className: "w-full" })}
                    >
                      Go to dashboard
                    </Link>
                    <Button
                      variant="ghost"
                      className="w-full"
                      onClick={() => void signOut()}
                    >
                      <LogOut className="size-4" />
                      Sign out
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      href="/sign-in"
                      onClick={closeMobile}
                      className={buttonStyles({ variant: "outline", size: "sm" })}
                    >
                      Sign in
                    </Link>
                    <Link
                      href="/sign-up"
                      onClick={closeMobile}
                      className={buttonStyles({ size: "sm" })}
                    >
                      Create account
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </header>
    </>
  );
}

export function UserInitials({ name }: { name: string }) {
  return <span>{initials(name)}</span>;
}
