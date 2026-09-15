"use client";

import * as React from "react";
import Link from "next/link";
import { track, type AnalyticsEvent } from "@/lib/analytics";

type TrackedProps = {
  event: AnalyticsEvent;
  payload?: Record<string, string | number | boolean | undefined>;
  children: React.ReactNode;
  className?: string;
};

/** Anchor for external/tel/mailto/WhatsApp destinations with event tracking. */
export function TrackedAnchor({
  href,
  event,
  payload,
  children,
  className,
  external,
  ...rest
}: TrackedProps & { href: string; external?: boolean } & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      href={href}
      onClick={() => track(event, payload)}
      className={className}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}

/** Internal next/link with event tracking, used for CTA measurement. */
export function TrackedLink({
  href,
  event,
  payload,
  children,
  className,
  ...rest
}: TrackedProps & { href: string } & Omit<React.ComponentProps<typeof Link>, "href" | "onClick">) {
  return (
    <Link href={href} onClick={() => track(event, payload)} className={className} {...rest}>
      {children}
    </Link>
  );
}

/** Fires a single page-view style event on mount (e.g. service_page_view). */
export function TrackView({
  event,
  payload,
}: {
  event: AnalyticsEvent;
  payload?: Record<string, string | number | boolean | undefined>;
}) {
  const fired = React.useRef(false);
  React.useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    track(event, payload);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
