import { ServiceCard } from "@/components/sections/service-card";
import { Reveal } from "@/components/ui/reveal";
import { serviceCategories, servicesByCategory, type ServiceSummary } from "@/content/services";
import { cn } from "@/lib/utils";

export function ServiceGrid({
  services,
  className,
  columns = 3,
}: {
  services: ServiceSummary[];
  className?: string;
  columns?: 2 | 3;
}) {
  return (
    <div
      className={cn(
        "grid gap-5 sm:grid-cols-2",
        columns === 3 ? "lg:grid-cols-3" : "",
        className,
      )}
    >
      {services.map((service, index) => (
        <Reveal key={service.slug} delay={Math.min(index * 60, 240)} className="h-full">
          <ServiceCard service={service} className="h-full" />
        </Reveal>
      ))}
    </div>
  );
}

/** Full catalogue grouped by category — used on the homepage and /services. */
export function CategorisedServices({ headingLevel = 3 }: { headingLevel?: 2 | 3 }) {
  const Heading = `h${headingLevel}` as "h2" | "h3";
  return (
    <div className="grid gap-12">
      {serviceCategories.map((category) => (
        <section key={category.id} id={category.id} aria-labelledby={`${category.id}-heading`} className="scroll-mt-28">
          <div className="flex flex-col gap-1.5 border-b border-line pb-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Heading id={`${category.id}-heading`} className="text-xl sm:text-2xl">
                {category.name}
              </Heading>
              <p className="mt-1.5 max-w-2xl text-[0.9375rem] text-ink-soft">{category.description}</p>
            </div>
            <p className="text-sm font-medium text-muted">
              {servicesByCategory(category.id).length} service
              {servicesByCategory(category.id).length === 1 ? "" : "s"}
            </p>
          </div>
          <ServiceGrid services={servicesByCategory(category.id)} className="mt-6" />
        </section>
      ))}
    </div>
  );
}
