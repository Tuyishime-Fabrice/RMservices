import { Reveal } from "@/components/ui/reveal";
import { trustStats } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Figures come only from information supplied by R&M. Nothing here is
 * estimated, rounded up, or invented.
 */
export function TrustStats({
  tone = "light",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <dl
      className={cn(
        "grid gap-px overflow-hidden rounded-card border sm:grid-cols-2 lg:grid-cols-4",
        tone === "dark" ? "border-white/10 bg-white/10" : "border-line bg-line",
        className,
      )}
    >
      {trustStats.map((stat, index) => (
        <Reveal
          key={stat.label}
          delay={index * 70}
          className={cn("h-full", tone === "dark" ? "bg-navy-950" : "bg-white")}
        >
          <div className="h-full p-6">
            <dt className="sr-only">{stat.label}</dt>
            <dd>
              <p
                className={cn(
                  "font-display font-semibold leading-tight",
                  // Numeric values carry the display size; wordy values would
                  // overflow their card at that scale.
                  stat.value.length > 8
                    ? "text-[1.25rem] sm:text-[1.375rem]"
                    : "text-[1.75rem] sm:text-[2rem]",
                  tone === "dark" ? "text-white" : "text-navy-900",
                )}
              >
                {stat.value}
              </p>
              <p
                className={cn(
                  "mt-1 text-sm font-semibold",
                  tone === "dark" ? "text-brand-200" : "text-brand-700",
                )}
              >
                {stat.label}
              </p>
              <p
                className={cn(
                  "mt-1 text-sm",
                  tone === "dark" ? "text-navy-100/70" : "text-ink-soft",
                )}
              >
                {stat.detail}
              </p>
            </dd>
          </div>
        </Reveal>
      ))}
    </dl>
  );
}
