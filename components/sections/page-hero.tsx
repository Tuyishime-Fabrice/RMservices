import { Breadcrumbs, type Crumb } from "@/components/ui/breadcrumbs";
import { cn } from "@/lib/utils";

/** Standard inner-page hero: dark navy band, breadcrumbs, H1, lead, actions. */
export function PageHero({
  eyebrow,
  title,
  lead,
  trail,
  actions,
  aside,
  className,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  trail: Crumb[];
  actions?: React.ReactNode;
  aside?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("relative overflow-hidden bg-navy-950 pattern-grid", className)}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(85%_110%_at_82%_0%,rgba(18,104,195,0.45),transparent_60%)]"
      />
      <div className="container-rm relative z-10 py-12 sm:py-16 lg:py-20">
        <Breadcrumbs trail={trail} tone="light" />
        <div className={cn("mt-6 grid gap-10", aside ? "lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center" : "")}>
          <div className="min-w-0 max-w-3xl">
            {eyebrow ? (
              <p className="eyebrow text-brand-200">
                <span aria-hidden="true" className="h-px w-6 bg-brand-300/70" />
                {eyebrow}
              </p>
            ) : null}
            <h1 className="mt-3 text-[2rem] leading-[1.12] text-white sm:text-[2.75rem] lg:text-[3rem]">
              {title}
            </h1>
            {lead ? (
              <p className="mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-navy-100/85 sm:text-lg">
                {lead}
              </p>
            ) : null}
            {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
          </div>
          {aside}
        </div>
      </div>
    </section>
  );
}
