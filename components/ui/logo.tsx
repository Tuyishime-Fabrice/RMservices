import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/content/site";

/**
 * The official R&M mark is never redrawn in code — it is referenced from
 * /public/brand/rm-logo.svg. Swap that one file to update the logo everywhere.
 */
export function LogoMark({ className, size = 40 }: { className?: string; size?: number }) {
  return (
    <Image
      src="/brand/rm-logo.svg"
      alt={`${siteConfig.legalName} logo`}
      width={size}
      height={size}
      priority
      className={cn("rounded-[6px]", className)}
    />
  );
}

export function Logo({
  className,
  tone = "dark",
  size = 42,
}: {
  className?: string;
  tone?: "dark" | "light";
  size?: number;
}) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-3", className)}
      aria-label={`${siteConfig.legalName} — home`}
    >
      <LogoMark size={size} className="shrink-0 shadow-soft transition-transform duration-300 group-hover:-translate-y-0.5" />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "whitespace-nowrap font-display text-[1.2rem] font-semibold tracking-tight sm:text-[1.3rem]",
            tone === "dark" ? "text-navy-900" : "text-white",
          )}
        >
          R&amp;M Services Group
        </span>
        <span
          className={cn(
            "mt-1 whitespace-nowrap text-xs font-semibold uppercase tracking-[0.16em]",
            tone === "dark" ? "text-brand-700" : "text-brand-200",
          )}
        >
          Kigali, Rwanda
        </span>
      </span>
    </Link>
  );
}
