import Image from "next/image";
import { ArrowUpRight, FileImage } from "lucide-react";
import { photos, contact } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * The company's own printed service brochure, shown as a supporting reference
 * rather than as page content: everything it lists is already on this site as
 * real text, which stays readable, searchable and translatable. The image
 * opens full size in a new tab for anyone who wants the printed version.
 */
export function BrochureSection({ className }: { className?: string }) {
  return (
    <section className={cn("section", className)} aria-labelledby="brochure-heading">
      <div className="container-rm">
        <div className="grid items-center gap-10 rounded-card border border-line bg-white p-6 shadow-soft sm:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.6fr)]">
          <div>
            <p className="eyebrow">
              <span aria-hidden="true" className="h-px w-6 bg-brand-500/70" />
              Service brochure
            </p>
            <h2 id="brochure-heading" className="mt-3 text-[1.75rem] sm:text-3xl">
              Prefer something you can print or forward?
            </h2>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-soft">
              This is the brochure we hand to clients at our Kigali offices. It covers the same ten
              services listed on this page, with our phone numbers and email address.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <a
                href={photos.brochure.src}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-navy-200 bg-white px-5 py-3 text-sm font-semibold text-navy-900 shadow-soft transition-colors hover:border-brand-600 hover:text-brand-700"
              >
                <FileImage className="size-4" aria-hidden="true" />
                View the full brochure
                <ArrowUpRight className="size-4 text-muted" aria-hidden="true" />
                <span className="sr-only">(opens the image in a new tab)</span>
              </a>
              <p className="text-sm text-muted">
                Or call{" "}
                <a
                  href={`tel:${contact.phonePrimaryHref}`}
                  className="font-medium text-brand-700 underline underline-offset-4"
                >
                  {contact.phonePrimaryDisplay}
                </a>{" "}
                and we will talk it through.
              </p>
            </div>
          </div>

          <a
            href={photos.brochure.src}
            target="_blank"
            rel="noopener noreferrer"
            className="group mx-auto block w-full max-w-[18rem] rounded-card border border-line bg-surface-soft p-3 transition-shadow hover:shadow-lift"
          >
            <Image
              src={photos.brochure.src}
              alt={photos.brochure.alt}
              width={photos.brochure.width}
              height={photos.brochure.height}
              loading="lazy"
              sizes="(min-width: 1024px) 18rem, 60vw"
              className="w-full rounded-[0.5rem]"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
