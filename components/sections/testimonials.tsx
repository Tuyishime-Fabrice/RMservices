import { SectionHeading } from "@/components/ui/section-heading";

/**
 * Testimonials are data-driven and intentionally EMPTY.
 *
 * We do not write testimonials on a client's behalf. When R&M supplies real,
 * attributable client quotes, add them to `testimonials` below and the section
 * appears automatically.
 *
 * Until then the section renders nothing in production, and renders a visible
 * reminder in development so the gap is obvious during review.
 */
export type Testimonial = { quote: string; name: string; role?: string };

export const testimonials: Testimonial[] = [];

export function Testimonials() {
  if (testimonials.length === 0) {
    if (process.env.NODE_ENV === "production") return null;
    return (
      <section className="section" aria-label="Testimonials placeholder">
        <div className="container-rm">
          <div className="rounded-card border border-dashed border-brand-300 bg-brand-50/50 p-8 text-center">
            <p className="font-display text-lg font-semibold text-navy-900">
              [REAL CLIENT TESTIMONIALS TO BE ADDED]
            </p>
            <p className="mx-auto mt-2 max-w-xl text-sm text-ink-soft">
              This block is only visible in development. Add real, attributable client quotes to
              <code className="mx-1 rounded bg-white px-1.5 py-0.5 text-xs">
                components/sections/testimonials.tsx
              </code>
              and the section will publish automatically. Nothing invented is ever shown here.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section bg-surface-soft" aria-labelledby="testimonials-heading">
      <div className="container-rm">
        <SectionHeading
          eyebrow="Client feedback"
          title="What our clients say"
          align="center"
        />
        <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <li key={item.name} className="h-full">
              <figure className="flex h-full flex-col rounded-card border border-line bg-white p-6 shadow-soft">
                <blockquote className="flex-1 text-[0.9375rem] leading-relaxed text-ink-soft">
                  “{item.quote}”
                </blockquote>
                <figcaption className="mt-5 border-t border-line pt-4 text-sm">
                  <span className="font-semibold text-navy-900">{item.name}</span>
                  {item.role ? <span className="block text-muted">{item.role}</span> : null}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
