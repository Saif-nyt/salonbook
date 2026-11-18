import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { SALON_DETAILS } from "@/lib/constants";
import { Logo } from "@/components/ui/logo";

const exploreLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Browse Services" },
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
    <footer id="visit" className="border-t border-white/10 bg-charcoal text-white">
      <div className="container-page grid gap-12 py-16 lg:grid-cols-[1.2fr_1fr_1fr_1.2fr]">
        <div>
          <Logo light />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/65">
            SalonBook is a salon appointment booking platform where customers can explore
            salon services, view service information, and request appointments online.
          </p>
          <div className="mt-6">
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
              <a href={`tel:${SALON_DETAILS.phone.replace(/[^\d+]/g, "")}`} className="hover:text-white">
                {SALON_DETAILS.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-white/40" />
              <a href={`mailto:${SALON_DETAILS.email}`} className="hover:text-white">
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

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-3 py-6 text-[11px] uppercase tracking-[0.16em] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© <CopyrightYear /> SalonBook. All rights reserved.</p>
          <p>Premium salon booking, made simple.</p>
        </div>
      </div>
    </footer>
  );
}