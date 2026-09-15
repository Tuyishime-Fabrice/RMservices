import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
  as: Tag = "h2",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className={cn("eyebrow", tone === "light" && "text-brand-200")}>
          <span
            aria-hidden="true"
            className={cn(
              "h-px w-6",
              tone === "light" ? "bg-brand-300/70" : "bg-brand-500/70",
            )}
          />
          {eyebrow}
        </p>
      ) : null}
      <Tag
        className={cn(
          "mt-3 text-[1.75rem] leading-[1.15] sm:text-4xl",
          tone === "light" && "text-white",
        )}
      >
        {title}
      </Tag>
      {description ? (
        <p
          className={cn(
            "mt-4 text-[1.0625rem] leading-relaxed",
            tone === "light" ? "text-navy-100/85" : "text-ink-soft",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
