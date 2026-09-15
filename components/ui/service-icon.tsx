import {
  Building2,
  FilePen,
  BadgeCheck,
  Receipt,
  Calculator,
  LineChart,
  Compass,
  FileCheck2,
  Plane,
  MonitorSmartphone,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const icons: Record<string, LucideIcon> = {
  building: Building2,
  "file-pen": FilePen,
  "badge-check": BadgeCheck,
  receipt: Receipt,
  calculator: Calculator,
  "line-chart": LineChart,
  compass: Compass,
  "file-check": FileCheck2,
  plane: Plane,
  "monitor-smartphone": MonitorSmartphone,
};

export function ServiceIcon({
  name,
  className,
  tone = "brand",
}: {
  name: string;
  className?: string;
  tone?: "brand" | "light";
}) {
  const Icon = icons[name] ?? Building2;
  return (
    <span
      className={cn(
        "inline-flex size-12 items-center justify-center rounded-xl border",
        tone === "brand"
          ? "border-brand-100 bg-brand-50 text-brand-700"
          : "border-white/15 bg-white/10 text-brand-100",
        className,
      )}
    >
      <Icon className="size-6" aria-hidden="true" strokeWidth={1.7} />
    </span>
  );
}
