import { MapPin, Building2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Office } from "@/content/site";
import { cn } from "@/lib/utils";

export function OfficeCard({ office, className }: { office: Office; className?: string }) {
  return (
    <Card className={cn("h-full", className)}>
      <div className="flex h-full flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <span className="inline-flex size-11 items-center justify-center rounded-xl border border-brand-100 bg-brand-50 text-brand-700">
            <Building2 className="size-5" aria-hidden="true" strokeWidth={1.7} />
          </span>
          <Badge tone="navy">Kigali office</Badge>
        </div>
        <h3 className="mt-5 text-lg font-semibold text-navy-900">{office.name}</h3>
        <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-brand-700">
          <MapPin className="size-4 shrink-0" aria-hidden="true" />
          {office.locality}
        </p>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">{office.note}</p>
      </div>
    </Card>
  );
}
