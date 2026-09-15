import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/sections/page-hero";
import { BlogCard } from "@/components/sections/blog-card";
import { CTASection } from "@/components/sections/cta-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { JsonLd } from "@/components/ui/json-ld";
import { TrackedLink } from "@/components/ui/tracked-link";
import { pageMetadata, breadcrumbJsonLd, absoluteUrl } from "@/lib/seo";
import { sortedPosts, postCategories } from "@/content/posts";

export const metadata = pageMetadata({
  title: "Rwanda Business Guides | R&M Services Group",
  description:
    "Practical guides on business registration, tax compliance, accounting and doing business in Rwanda, written by the team at R&M Services Group Ltd in Kigali.",
  path: "/resources",
});

const trail = [
  { name: "Home", href: "/" },
  { name: "Resources", href: "/resources" },
];

export default function ResourcesPage() {
  const [featured, ...rest] = sortedPosts;
  const usedCategories = postCategories.filter((category) =>
    sortedPosts.some((post) => post.category === category),
  );

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "R&M Services Group Ltd — Resources",
          url: absoluteUrl("/resources"),
          blogPost: sortedPosts.map((post) => ({
            "@type": "BlogPosting",
            headline: post.title,
            url: absoluteUrl(`/resources/${post.slug}`),
            datePublished: post.date,
            author: { "@type": "Organization", name: post.author },
          })),
        }}
      />

      <PageHero
        eyebrow="Resources"
        title="Guides for starting, running and growing a business in Rwanda"
        lead="Clear, practical articles answering the questions our clients ask most. We write about how things work in practice — and we deliberately do not publish government fees, requirements or processing times we cannot verify."
        trail={trail}
      />

      <section className="section" aria-labelledby="featured-heading">
        <div className="container-rm">
          <h2 id="featured-heading" className="sr-only">
            Featured article
          </h2>
          {featured ? (
            <article className="overflow-hidden rounded-card border border-line bg-white shadow-soft">
              <div className="grid lg:grid-cols-2">
                <div className="min-h-[13rem] bg-navy-950 pattern-grid" aria-hidden="true">
                  <div className="flex h-full items-end bg-[radial-gradient(80%_120%_at_20%_0%,rgba(18,104,195,0.5),transparent_60%)] p-8">
                    <p className="font-display text-2xl font-semibold text-white/85">
                      Featured guide
                    </p>
                  </div>
                </div>
                <div className="p-6 sm:p-10">
                  <p className="eyebrow">{featured.category}</p>
                  <h3 className="mt-3 text-2xl sm:text-3xl">{featured.title}</h3>
                  <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-soft">
                    {featured.excerpt}
                  </p>
                  <Button asChild size="lg" className="mt-7">
                    <TrackedLink
                      href={`/resources/${featured.slug}`}
                      event="cta_click"
                      payload={{ location: "resources-featured", label: featured.slug }}
                    >
                      Read the guide
                      <ArrowRight aria-hidden="true" />
                    </TrackedLink>
                  </Button>
                </div>
              </div>
            </article>
          ) : null}

          <div className="mt-12">
            <SectionHeading
              eyebrow="All articles"
              title="Browse our resources"
              description={`Topics covered: ${usedCategories.join(", ")}.`}
            />
            <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((post, index) => (
                <Reveal as="li" key={post.slug} delay={Math.min(index * 60, 240)} className="h-full">
                  <BlogCard post={post} className="h-full" />
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CTASection
        location="resources"
        title="Have a question an article cannot answer?"
        description="Every business is a little different. Tell us your situation and our team will give you a straight answer about how we can help."
        primaryLabel="Get assistance"
        secondaryLabel="Contact R&M"
      />
    </>
  );
}
