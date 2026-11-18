"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, LayoutDashboard, LogOut, Menu, X } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";
import { Button, buttonStyles } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { Avatar } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

export function Navbar() {
  const { user, isLoading, isAdmin, signOut } = useAuth();
  const pathname = usePathname();
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

  const dashboardHref = isAdmin ? "/admin" : "/dashboard";
  const primaryLinks = user
    ? [
        { href: "/services", label: "Services" },
        { href: "/#story", label: "About" },
        { href: "/#visit", label: "Contact" },
        { href: dashboardHref, label: "Dashboard" },
      ]
    : [
        { href: "/services", label: "Services" },
        { href: "/#story", label: "About" },
        { href: "/#visit", label: "Contact" },
      ];

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return false;
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-warm-taupe/35 bg-warm-cream/85 backdrop-blur-xl">
      <div className="container-page flex h-[78px] items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {primaryLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={`${link.href}-${link.label}`}
                href={link.href}
                className={cn(
                  "relative py-1 text-[15px] font-medium tracking-[0.01em] transition-colors duration-200",
                  active ? "text-charcoal" : "text-muted hover:text-charcoal",
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute -bottom-1.5 left-0 h-[2px] w-full origin-left rounded-full bg-deep-red transition-transform duration-200",
                    active ? "scale-x-100" : "scale-x-0",
                  )}
                  aria-hidden
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2.5 lg:flex">
          {isLoading ? (
            <Skeleton className="h-11 w-44 rounded-[12px]" />
          ) : user ? (
            <>
              <Link href="/services" className={buttonStyles({ variant: "ghost", size: "sm" })}>
                Book
              </Link>
              <div className="relative" ref={menuRef}>
                <button
                  type="button"
                  onClick={() =>
                    setMenuOpenAt((current) => (current === pathname ? null : pathname))
                  }
                  className="flex items-center gap-2.5 rounded-[12px] border border-warm-taupe/45 bg-soft-ivory/80 py-1.5 pl-1.5 pr-3 transition-all hover:border-charcoal/25 hover:bg-soft-ivory"
                  aria-haspopup="menu"
                  aria-expanded={menuOpen}
                >
                  <Avatar name={user.name} image={user.image} className="size-8" />
                  <span className="max-w-28 truncate text-[13px] font-semibold text-charcoal">
                    {user.name}
                  </span>
                  <ChevronDown className="size-3.5 text-muted" />
                </button>

                {menuOpen ? (
                  <div
                    className="absolute right-0 mt-2 w-64 overflow-hidden rounded-[16px] border border-warm-taupe/45 bg-soft-ivory py-1.5 shadow-elevated"
                    role="menu"
                  >
                    <div className="border-b border-warm-taupe/35 px-4 py-3.5">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                        Signed in as
                      </p>
                      <p className="mt-1 truncate text-sm font-semibold text-charcoal">
                        {user.name}
                      </p>
                      <p className="truncate text-xs text-muted">{user.email}</p>
                    </div>
                    <Link
                      href={dashboardHref}
                      onClick={closeMenu}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-charcoal transition-colors hover:bg-warm-cream/70"
                      role="menuitem"
                    >
                      <LayoutDashboard className="size-4" />
                      Dashboard
                    </Link>
                    <button
                      type="button"
                      onClick={() => void signOut()}
                      className="flex w-full items-center gap-2.5 border-t border-warm-taupe/35 px-4 py-2.5 text-left text-sm text-charcoal transition-colors hover:bg-warm-cream/70"
                      role="menuitem"
                    >
                      <LogOut className="size-4" />
                      Logout
                    </button>
                  </div>
                ) : null}
              </div>
            </>
          ) : (
            <>
              <Link href="/sign-in" className={buttonStyles({ variant: "ghost", size: "sm" })}>
                Sign In
              </Link>
              <Link href="/services" className={buttonStyles({ size: "sm" })}>
                Book Appointment
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="grid size-10 place-items-center rounded-[12px] border border-warm-taupe/45 bg-soft-ivory/80 text-charcoal transition-colors hover:bg-soft-ivory lg:hidden"
          onClick={() => setMobileOpenAt((open) => (open === pathname ? null : pathname))}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {mobileOpen ? (
        <div className="border-t border-warm-taupe/35 bg-soft-ivory/95 backdrop-blur-xl lg:hidden">
          <div className="container-page space-y-1 py-4">
            {primaryLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={`${link.href}-${link.label}-mobile`}
                  href={link.href}
                  onClick={closeMobile}
                  className={cn(
                    "block rounded-[12px] px-3.5 py-3 text-[15px] font-medium transition-colors",
                    active
                      ? "bg-warm-cream text-charcoal"
                      : "text-muted hover:bg-warm-cream/70 hover:text-charcoal",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="border-t border-warm-taupe/35 pt-4">
              {user ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 px-3">
                    <Avatar name={user.name} image={user.image} className="size-9" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-charcoal">{user.name}</p>
                      <p className="truncate text-xs text-muted">{user.email}</p>
                    </div>
                  </div>
                  <Link
                    href={dashboardHref}
                    onClick={closeMobile}
                    className={buttonStyles({ variant: "secondary", className: "w-full" })}
                  >
                    Dashboard
                  </Link>
                  <Button variant="ghost" className="w-full" onClick={() => void signOut()}>
                    <LogOut className="size-4" />
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href="/sign-in"
                    onClick={closeMobile}
                    className={buttonStyles({ variant: "outline", size: "sm" })}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/services"
                    onClick={closeMobile}
                    className={buttonStyles({ size: "sm" })}
                  >
                    Book Appointment
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
