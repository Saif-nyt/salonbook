import { CalendarClock, CreditCard, ListChecks, ShieldCheck } from "lucide-react";

const items = [
  {
    icon: ListChecks,
    title: "Clear service details",
    description: "Pricing, duration, and descriptions at a glance.",
  },
  {
    icon: CalendarClock,
    title: "Easy online requests",
    description: "Choose a date and time that suits your schedule.",
  },
  {
    icon: CreditCard,
    title: "Secure checkout",
    description: "Pay for confirmed appointments through Stripe.",
  },
  {
    icon: ShieldCheck,
    title: "Appointment visibility",
    description: "Track requests, confirmations, and payment status.",
  },
];

export function TrustStrip() {
  return (
    <section className="border-y border-warm-taupe/35 bg-soft-neutral/80">
      <div className="container-page py-5 lg:py-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {items.map((item, index) => (
            <div
              key={item.title}
              className="flex items-start gap-3 border-warm-taupe/30 py-1 lg:border-l lg:pl-5 lg:first:border-l-0 lg:first:pl-0"
            >
              <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-[10px] bg-warm-cream text-charcoal ring-1 ring-warm-taupe/30">
                <item.icon className="size-4" aria-hidden />
              </span>
              <div>
                <p className="text-sm font-semibold text-charcoal">{item.title}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-muted">{item.description}</p>
              </div>
              {index < items.length - 1 ? (
                <span className="sr-only">, </span>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
