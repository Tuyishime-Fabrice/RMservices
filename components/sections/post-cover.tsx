import { cn } from "@/lib/utils";
import type { Post } from "@/content/posts";

/**
 * Article cover artwork. Generated from the brand palette rather than stock
 * photography, so no article implies a photograph that is not R&M's.
 * Replace with real imagery once supplied (see CONTENT-CHECKLIST.md).
 */
const variants: Record<Post["cover"], string> = {
  registration: "from-navy-900 via-navy-800 to-brand-800",
  tax: "from-navy-950 via-brand-900 to-brand-700",
  accounting: "from-brand-900 via-navy-800 to-navy-950",
  advisory: "from-navy-800 via-brand-800 to-navy-950",
  investors: "from-brand-800 via-navy-900 to-navy-950",
  admin: "from-navy-900 via-brand-700 to-navy-800",
};

export function PostCover({
  variant,
  className,
  label,
}: {
  variant: Post["cover"];
  className?: string;
  label?: string;
}) {
  return (
    <div
      aria-hidden={label ? undefined : true}
      role={label ? "img" : undefined}
      aria-label={label}
      style={{ backgroundColor: "var(--color-navy-900)" }}
      className={cn(
        "relative w-full overflow-hidden bg-gradient-to-br pattern-grid",
        variants[variant],
        className,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(80%_120%_at_15%_0%,rgba(255,255,255,0.14),transparent_60%)]" />
      <span className="absolute bottom-3 left-4 font-display text-sm font-semibold tracking-wide text-white/70">
        R&amp;M
      </span>
    </div>
  );
}
