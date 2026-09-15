import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Clock, CalendarDays, User, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { PostCover } from "@/components/sections/post-cover";
import { BlogCard } from "@/components/sections/blog-card";
import { ServiceCard } from "@/components/sections/service-card";
import { CTASection } from "@/components/sections/cta-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { JsonLd } from "@/components/ui/json-ld";
import { TrackedLink } from "@/components/ui/tracked-link";
import { pageMetadata, articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { posts, getPost, readingTime, sortedPosts } from "@/content/posts";
import { getService } from "@/content/services";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return pageMetadata({
    title: post.metaTitle,
    description: post.metaDescription,
    path: `/resources/${post.slug}`,
    type: "article",
    publishedTime: post.date,
  });
}

export default async function ResourceArticlePage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = post.relatedServices
    .map((serviceSlug) => getService(serviceSlug))
    .filter((service): service is NonNullable<typeof service> => Boolean(service));

  const morePosts = sortedPosts.filter((item) => item.slug !== post.slug).slice(0, 3);

  const trail = [
    { name: "Home", href: "/" },
    { name: "Resources", href: "/resources" },
    { name: post.title, href: `/resources/${post.slug}` },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />
      <JsonLd
        data={articleJsonLd({
          title: post.title,
          description: post.metaDescription,
          path: `/resources/${post.slug}`,
          datePublished: post.date,
          author: post.author,
        })}
      />

      <article>
        {/* Article hero */}
        <header className="relative overflow-hidden bg-navy-950 pattern-grid">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_120%_at_80%_0%,rgba(18,104,195,0.45),transparent_60%)]"
          />
          <div className="container-rm relative z-10 py-12 sm:py-16">
            <Breadcrumbs trail={trail} tone="light" />
            <div className="mt-6 max-w-3xl">
              <Badge tone="light">{post.category}</Badge>
              <h1 className="mt-4 text-[1.9rem] leading-[1.15] text-white sm:text-[2.5rem]">
                {post.title}
              </h1>
              <p className="mt-4 text-[1.0625rem] leading-relaxed text-navy-100/85">{post.excerpt}</p>
              <dl className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/10 pt-5 text-sm text-navy-100/75">
                <div className="flex items-center gap-1.5">
                  <dt className="sr-only">Author</dt>
                  <User className="size-4 text-brand-300" aria-hidden="true" />
                  <dd>{post.author}</dd>
                </div>
                <div className="flex items-center gap-1.5">
                  <dt className="sr-only">Published</dt>
                  <CalendarDays className="size-4 text-brand-300" aria-hidden="true" />
                  <dd>
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                  </dd>
                </div>
                <div className="flex items-center gap-1.5">
                  <dt className="sr-only">Reading time</dt>
                  <Clock className="size-4 text-brand-300" aria-hidden="true" />
                  <dd>{readingTime(post)} min read</dd>
                </div>
              </dl>
            </div>
          </div>
        </header>

        <PostCover variant={post.cover} className="h-2" />

        {/* Body */}
        <div className="section">
          <div className="container-rm grid gap-12 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-14">
            <div className="prose-rm min-w-0 max-w-none">
              {post.body.map((block, index) => {
                if (block.type === "h2") {
                  return (
                    <h2 key={index} className="text-2xl sm:text-[1.75rem]">
                      {block.text}
                    </h2>
                  );
                }
                if (block.type === "h3") {
                  return <h3 key={index}>{block.text}</h3>;
                }
                if (block.type === "ul") {
                  return (
                    <ul key={index}>
                      {block.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  );
                }
                if (block.type === "callout") {
                  return (
                    <aside
                      key={index}
                      className="my-8 rounded-card border border-brand-200 bg-brand-50/60 p-5"
                    >
                      <p className="flex items-center gap-2 font-semibold text-navy-900">
                        <Info className="size-4 shrink-0 text-brand-700" aria-hidden="true" />
                        {block.title}
                      </p>
                      <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">
                        {block.text}
                      </p>
                    </aside>
                  );
                }
                return <p key={index}>{block.text}</p>;
              })}

              <hr className="my-10 border-line" />
              <p className="text-sm text-muted">
                This article is general information about how things work in practice, written by
                R&amp;M Services Group Ltd. It is not legal, tax or immigration advice, and it does
                not state official fees, requirements or processing times. For guidance on your own
                situation,{" "}
                <Link href="/contact" className="font-medium text-brand-700 underline underline-offset-4">
                  talk to our team
                </Link>
                .
              </p>
            </div>

            <aside className="lg:sticky lg:top-28 lg:h-fit" aria-labelledby="article-services-heading">
              <div className="rounded-card border border-line bg-surface-soft p-6">
                <h2 id="article-services-heading" className="text-lg font-semibold text-navy-900">
                  Related services
                </h2>
                <ul className="mt-4 grid gap-2">
                  {related.map((service) => (
                    <li key={service.slug}>
                      <Link
                        href={`/services/${service.slug}`}
                        className="flex items-center justify-between gap-3 rounded-lg border border-line bg-white px-3.5 py-3 text-sm font-medium text-navy-900 transition-colors hover:border-brand-300 hover:text-brand-700"
                      >
                        {service.name}
                        <ArrowRight className="size-4 shrink-0 text-muted" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
                <Button asChild className="mt-5" full>
                  <TrackedLink
                    href={`/online-assistance?service=${encodeURIComponent(related[0]?.inquiryValue ?? "Other")}`}
                    event="cta_click"
                    payload={{ location: "article-rail", label: post.slug }}
                  >
                    Get assistance
                  </TrackedLink>
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {/* Related services in full */}
      {related.length > 0 ? (
        <section className="section bg-surface-soft" aria-labelledby="related-services-heading">
          <div className="container-rm">
            <SectionHeading
              eyebrow="Services"
              title="How R&M can help with this"
              description="If this article describes your situation, these are the services most likely to be relevant."
            />
            <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((service) => (
                <li key={service.slug} className="h-full">
                  <ServiceCard service={service} className="h-full" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* More articles */}
      <section className="section" aria-labelledby="more-articles-heading">
        <div className="container-rm">
          <SectionHeading eyebrow="Keep reading" title="More resources" />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {morePosts.map((item) => (
              <li key={item.slug} className="h-full">
                <BlogCard post={item} className="h-full" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection location={`article-${post.slug}`} />
    </>
  );
}
