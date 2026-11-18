import { cn } from "@/lib/utils";

export function Avatar({
  name,
  image,
  className,
}: {
  name: string;
  image?: string | null;
  className?: string;
}) {
  const safeName = name || "Guest";
  const initials = safeName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <span
      className={cn(
        "relative grid size-10 shrink-0 place-items-center overflow-hidden rounded-full bg-warm-cream text-sm font-semibold text-charcoal ring-1 ring-warm-taupe/50",
        className,
      )}
    >
      {image ? (
        // User-provided URLs can come from any host, so a native image keeps uploads flexible.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt="" className="size-full object-cover" />
      ) : (
        initials || "SB"
      )}
    </span>
  );
}
