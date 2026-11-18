import { cn } from "@/lib/utils";

type SealPhrase = "BEAUTY, YOUR WAY" | "THE SALONBOOK EDIT" | "YOUR MOMENT";

export function BrandSeal({
  phrase = "THE SALONBOOK EDIT",
  className,
  tone = "light",
}: {
  phrase?: SealPhrase;
  className?: string;
  tone?: "light" | "dark";
}) {
  const id = `seal-${phrase.replace(/[^a-z0-9]/gi, "").toLowerCase()}`;

  return (
    <div
      className={cn(
        "pointer-events-none select-none",
        tone === "dark" ? "text-white/80" : "text-charcoal/80",
        className,
      )}
      aria-hidden
    >
      <svg viewBox="0 0 120 120" className="size-full animate-[spin_26s_linear_infinite] motion-reduce:animate-none">
        <defs>
          <path id={id} d="M60,60 m-43,0 a43,43 0 1,1 86,0 a43,43 0 1,1 -86,0" />
        </defs>
        <circle
          cx="60"
          cy="60"
          r="46"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.22"
          strokeWidth="1"
        />
        <circle
          cx="60"
          cy="60"
          r="34"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.16"
          strokeWidth="1"
        />
        <text
          fill="currentColor"
          fontSize="9.5"
          fontWeight="600"
          letterSpacing="2.2"
          className="uppercase"
          style={{ fontFamily: "var(--font-body)" }}
        >
          <textPath href={`#${id}`} startOffset="0%">
            {phrase} • {phrase} •
          </textPath>
        </text>
        <text
          x="60"
          y="58"
          textAnchor="middle"
          fill="currentColor"
          fontSize="10"
          fontWeight="600"
          letterSpacing="1.4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          SalonBook
        </text>
        <text
          x="60"
          y="69"
          textAnchor="middle"
          fill="currentColor"
          fontSize="6.5"
          letterSpacing="1.8"
          opacity="0.75"
          style={{ fontFamily: "var(--font-body)" }}
        >
          EST. BEAUTY
        </text>
      </svg>
    </div>
  );
}
