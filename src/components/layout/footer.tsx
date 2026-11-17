import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { SALON_DETAILS } from "@/lib/constants";
import { Logo } from "@/components/ui/logo";

const exploreLinks = [
  { href: "/services", label: "All services" },
  { href: "/services?category=Hair", label: "Hair" },
  { href: "/services?category=Skin", label: "Skin" },
  { href: "/services?category=Nails", label: "Nails" },
];

const accountLinks = [
  { href: "/sign-in", label: "Sign in" },
  { href: "/sign-up", label: "Create an account" },
  { href: "/dashboard", label: "My appointments" },
];

async function CopyrightYear() {
  "use cache";
  return new Date().getFullYear();
}

export function Footer() {
  return (
    <footer id="visit" className="border-t border-line bg-ink text-cream">
      <div className="container-page grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Logo light />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-cream/65">
            A neighbourhood salon for considered hair, skin, nail and body care — where
            craft meets calm.
          </p>
          <div className="mt-7 flex gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="grid size-9 place-items-center rounded-full border border-cream/20 text-xs text-cream/70 transition-colors hover:border-cream/60 hover:text-cream"
              aria-label="Instagram"
            >
              IG
            </a>
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noreferrer"
              className="grid size-9 place-items-center rounded-full border border-cream/20 text-xs text-cream/70 transition-colors hover:border-cream/60 hover:text-cream"
              aria-label="Pinterest"
            >
              PT
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cream/45">
            Explore
          </h3>
          <ul className="mt-5 space-y-3">
            {exploreLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-cream/70 transition-colors hover:text-cream"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cream/45">
            Account
          </h3>
          <ul className="mt-5 space-y-3">
            {accountLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-cream/70 transition-colors hover:text-cream"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cream/45">
            Visit
          </h3>
          <ul className="mt-5 space-y-3.5 text-sm text-cream/70">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-cream/40" />
              <span>
                {SALON_DETAILS.address}
                <br />
                {SALON_DETAILS.city}
              </span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-cream/40" />
              <a href={`tel:${SALON_DETAILS.phone.replace(/[^\d+]/g, "")}`} className="hover:text-cream">
                {SALON_DETAILS.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-cream/40" />
              <a href={`mailto:${SALON_DETAILS.email}`} className="hover:text-cream">
                {SALON_DETAILS.email}
              </a>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 size-4 shrink-0 text-cream/40" />
              <span>Tue — Fri 9–7 · Sat 9–6</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/12">
        <div className="container-page flex flex-col gap-3 py-6 text-[11px] uppercase tracking-[0.16em] text-cream/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© <CopyrightYear /> SalonBook. All rights reserved.</p>
          <p>Designed for the quiet luxury of taking care.</p>
        </div>
      </div>
    </footer>
  );
}
