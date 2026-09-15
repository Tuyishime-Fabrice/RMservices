import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
  tone = "brand",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "brand" | "navy" | "gold" | "light";
}) {
  const tones = {
    brand: "bg-brand-50 text-brand-800 border-brand-100",
    navy: "bg-navy-50 text-navy-800 border-navy-100",
    gold: "bg-gold-100 text-gold-600 border-gold-300/60",
    light: "bg-white/10 text-white border-white/25",
  } as const;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-wide",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
