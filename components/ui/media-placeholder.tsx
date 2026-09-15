import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Branded placeholder used wherever authentic R&M photography is still
 * missing. We deliberately do NOT use stock photos of unrelated people, which
 * would imply staff or offices that are not R&M's.
 *
 * To use a real photo instead: drop the file in /public/photos and replace the
 * <MediaPlaceholder /> usage with next/image. Every location is listed in
 * CONTENT-CHECKLIST.md.
 */
export function MediaPlaceholder({
  label,
  className,
  tone = "navy",
  ratio = "aspect-[4/3]",
}: {
  label: string;
  className?: string;
  tone?: "navy" | "soft";
  ratio?: string;
}) {
  return (
    <div
      role="img"
      aria-label={`Placeholder for an R&M photograph: ${label}`}
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-card border",
        ratio,
        tone === "navy"
          ? "border-white/10 bg-navy-900 pattern-grid"
          : "border-line bg-surface-soft",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0",
          tone === "navy"
            ? "bg-[radial-gradient(120%_90%_at_20%_0%,rgba(18,104,195,0.45),transparent_60%)]"
            : "bg-[radial-gradient(120%_90%_at_20%_0%,rgba(18,104,195,0.08),transparent_60%)]",
        )}
      />
      <div className="relative z-10 max-w-[18rem] px-6 text-center">
        <ImageIcon
          aria-hidden="true"
          className={cn(
            "mx-auto size-7",
            tone === "navy" ? "text-brand-200" : "text-brand-500",
          )}
          strokeWidth={1.5}
        />
        <p
          className={cn(
            "mt-3 text-xs font-semibold uppercase tracking-[0.14em]",
            tone === "navy" ? "text-brand-100/80" : "text-brand-800",
          )}
        >
          Photo placeholder
        </p>
        <p
          className={cn(
            "mt-1.5 text-sm leading-snug",
            tone === "navy" ? "text-navy-100/70" : "text-ink-soft",
          )}
        >
          [ADD R&amp;M PHOTO: {label}]
        </p>
      </div>
    </div>
  );
}
