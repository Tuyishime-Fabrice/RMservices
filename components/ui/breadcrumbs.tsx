import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type Crumb = { name: string; href: string };

export function Breadcrumbs({
  trail,
  tone = "dark",
  className,
}: {
  trail: Crumb[];
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={cn("text-sm", className)}>
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
        {trail.map((crumb, index) => {
          const isLast = index === trail.length - 1;
          return (
            <li key={crumb.href} className="flex items-center gap-1.5">
              {index > 0 ? (
                <ChevronRight
                  aria-hidden="true"
                  className={cn(
                    "size-3.5",
                    tone === "light" ? "text-navy-200/60" : "text-muted",
                  )}
                />
              ) : null}
              {isLast ? (
                <span
                  aria-current="page"
                  className={cn(
                    "font-medium",
                    tone === "light" ? "text-white" : "text-navy-900",
                  )}
                >
                  {crumb.name}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className={cn(
                    "underline-offset-4 hover:underline",
                    tone === "light"
                      ? "text-navy-100/80 hover:text-white"
                      : "text-ink-soft hover:text-brand-700",
                  )}
                >
                  {crumb.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
