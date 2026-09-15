import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { services } from "@/content/services";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="section">
      <div className="container-rm max-w-2xl text-center">
        <p className="eyebrow justify-center">Error 404</p>
        <h1 className="mt-3 text-[2rem] sm:text-4xl">We could not find that page</h1>
        <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-soft">
          The page may have moved, or the address may be slightly different. Here are some useful
          places to continue.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/">
              <Home aria-hidden="true" />
              Back to home
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/services">
              Browse services
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/contact">Contact R&amp;M</Link>
          </Button>
        </div>
        <ul className="mt-10 grid gap-2 text-left sm:grid-cols-2">
          {services.slice(0, 6).map((service) => (
            <li key={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                className="block rounded-lg border border-line bg-white px-4 py-3 text-sm font-medium text-navy-900 transition-colors hover:border-brand-300 hover:text-brand-700"
              >
                {service.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
