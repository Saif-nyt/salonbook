import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { SALON_DETAILS } from "@/lib/constants";
import { BrandSeal } from "@/components/ui/brand-seal";
import { Logo } from "@/components/ui/logo";

const exploreLinks = [
  { href: "/services", label: "Services" },
  { href: "/#story", label: "About" },
  { href: "/#visit", label: "Contact" },
  { href: "/services?category=Hair", label: "Hair" },
  { href: "/services?category=Skin", label: "Skin" },
];

const accountLinks = [
  { href: "/sign-in", label: "Sign In" },
  { href: "/sign-up", label: "Sign Up" },
  { href: "/dashboard", label: "Dashboard" },
];

const socialLinks = [
  { href: "https://facebook.com", label: "Facebook" },
  { href: "https://instagram.com", label: "Instagram" },
  { href: "https://x.com", label: "X" },
];

async function CopyrightYear() {
  "use cache";
  return new Date().getFullYear();
}

export function Footer() {
  return (
    <footer id="visit" className="relative overflow-hidden border-t border-white/10 bg-charcoal text-white">
      <div
        className="pointer-events-none absolute -left-24 top-0 h-64 w-64 rounded-full bg-deep-red/20 blur-3xl"
        aria-hidden
      />
      <div className="container-page relative grid gap-12 py-16 lg:grid-cols-[1.25fr_1fr_1fr_1.2fr] lg:py-20">
        <div>
          <Logo light />
          <p className="mt-6 max-w-xs text-[15px] leading-relaxed text-white/70">
            SalonBook is a modern salon appointment platform for discovering services, requesting
            visits, and managing bookings with ease.
          </p>
          <div className="mt-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
              Social
            </p>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
            Explore
          </h3>
          <ul className="mt-5 space-y-3">
            {exploreLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
            Account
          </h3>
          <ul className="mt-5 space-y-3">
            {accountLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
            Contact & Hours
          </h3>
          <ul className="mt-5 space-y-3.5 text-sm text-white/70">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-white/40" />
              <span>
                {SALON_DETAILS.address}
                <br />
                {SALON_DETAILS.city}
              </span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-white/40" />
              <a
                href={`tel:${SALON_DETAILS.phone.replace(/[^\d+]/g, "")}`}
                className="transition-colors hover:text-white"
              >
                {SALON_DETAILS.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-white/40" />
              <a href={`mailto:${SALON_DETAILS.email}`} className="transition-colors hover:text-white">
                {SALON_DETAILS.email}
              </a>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 size-4 shrink-0 text-white/40" />
              <div>
                {SALON_DETAILS.hours.map((item) => (
                  <p key={item.days}>
                    {item.days}: {item.time}
                  </p>
                ))}
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <BrandSeal
          phrase="YOUR MOMENT"
          tone="dark"
          className="pointer-events-none absolute right-6 top-1/2 hidden size-20 -translate-y-1/2 text-white/60 opacity-50 md:block"
        />
        <div className="container-page flex flex-col gap-3 py-6 text-[11px] uppercase tracking-[0.16em] text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CopyrightYear /> SalonBook. All rights reserved.
          </p>
          <p>Beauty, considered — booked with confidence.</p>
        </div>
      </div>
    </footer>
  );
}