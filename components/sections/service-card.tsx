import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ServiceIcon } from "@/components/ui/service-icon";
import { cn } from "@/lib/utils";
import type { Service } from "@/content/services";

/**
 * Whole card is clickable via a stretched link on the service name, while
 * "Get assistance" stays a separate, independently focusable link on top.
 */
export function ServiceCard({ service, className }: { service: Service; className?: string }) {
  return (
    <Card interactive className={cn("group relative flex h-full flex-col", className)}>
      <div className="flex flex-1 flex-col p-6">
        <ServiceIcon name={service.icon} />
        <h3 className="mt-5 text-lg font-semibold text-navy-900 transition-colors group-hover:text-brand-800">
          <Link href={`/services/${service.slug}`} className="before:absolute before:inset-0 before:content-['']">
            {service.name}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-ink-soft">{service.summary}</p>
        <div className="mt-5 flex items-center gap-4 border-t border-line pt-4">
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
            Learn more
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
            />
          </span>
          <Link
            href={`/online-assistance?service=${encodeURIComponent(service.inquiryValue)}`}
            className="relative z-10 ml-auto text-sm font-semibold text-navy-800 underline-offset-4 hover:text-brand-700 hover:underline"
          >
            Get assistance
            <span className="sr-only"> with {service.name}</span>
          </Link>
        </div>
      </div>
    </Card>
  );
}
