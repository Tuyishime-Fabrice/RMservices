import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

const steps = [
  {
    number: "01",
    title: "Choose a service",
    description:
      "Browse our services and pick the one closest to what you need. Not sure? Choose “Other” and describe it in your own words.",
  },
  {
    number: "02",
    title: "Tell us what you need",
    description:
      "Submit your request online, call us, message us on WhatsApp, or visit one of our Kigali offices — whichever suits you.",
  },
  {
    number: "03",
    title: "Our team reviews your request",
    description:
      "A member of our team looks at what you have described so the conversation starts from a real understanding of your situation.",
  },
  {
    number: "04",
    title: "We contact you to discuss next steps",
    description:
      "We get in touch using your preferred contact method to discuss what is involved, what we can do, and how we would work together.",
  },
];

export function HowItWorks({ className }: { className?: string }) {
  return (
    <section className={cn("section", className)} aria-labelledby="how-it-works-heading">
      <div className="container-rm">
        <SectionHeading
          eyebrow="How it works"
          title="A simple, human process"
          description="No automated processing, no black box. Every request is read by a person, and we tell you clearly what we can and cannot do."
        />
        <ol className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Reveal as="li" key={step.number} delay={index * 80} className="h-full">
              <div className="relative flex h-full flex-col rounded-card border border-line bg-white p-6 shadow-soft">
                <span
                  aria-hidden="true"
                  className="font-display text-3xl font-semibold text-brand-600"
                >
                  {step.number}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-navy-900">{step.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">
                  {step.description}
                </p>
                {index < steps.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="absolute -right-3 top-1/2 hidden h-px w-6 bg-line lg:block"
                  />
                ) : null}
              </div>
            </Reveal>
          ))}
        </ol>
        <p className="mt-6 max-w-3xl text-sm text-muted">
          R&amp;M Services Group Ltd prepares, guides and supports applications. Decisions on
          official applications are made by the responsible Rwandan authority, and we never promise
          an outcome or a processing time on their behalf.
        </p>
      </div>
    </section>
  );
}
