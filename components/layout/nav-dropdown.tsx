"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight } from "lucide-react";
import type { NavItem } from "@/content/navigation";
import { cn } from "@/lib/utils";

/**
 * Desktop navigation dropdown, built as a disclosure rather than an ARIA
 * menubar: the panel holds ordinary links, so Tab, Enter and screen-reader
 * behaviour all work the way people expect from a website navigation.
 *
 * Opens on hover and on click/Enter/Space, closes on Escape, on outside click,
 * and when focus leaves the panel — so keyboard, mouse and touch users each
 * get a sensible path through it.
 */
/** True only on devices that genuinely hover, so a tap cannot open and
 *  immediately re-close the panel (mouseenter fires before click on touch). */
const HOVER_QUERY = "(hover: hover) and (pointer: fine)";

function useCanHover() {
  return React.useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(HOVER_QUERY);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(HOVER_QUERY).matches,
    () => false,
  );
}

export function NavDropdown({
  item,
  isActive,
  className,
}: {
  item: Extract<NavItem, { kind: "menu" }>;
  isActive: (href: string) => boolean;
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const canHover = useCanHover();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const panelId = `nav-menu-${item.label.toLowerCase().replace(/\s+/g, "-")}`;

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  // A short delay forgives the diagonal mouse path from the trigger to the panel.
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  React.useEffect(() => () => cancelClose(), []);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        containerRef.current?.querySelector("button")?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const sectionActive =
    isActive(item.href) ||
    (item.groups ?? []).some((group) => group.links.some((link) => isActive(link.href))) ||
    (item.links ?? []).some((link) => isActive(link.href)) ||
    (item.featured ?? []).some((link) => isActive(link.href));

  const wide = Boolean(item.groups);

  return (
    <div
      ref={containerRef}
      className={cn("relative", className)}
      onMouseEnter={() => {
        if (!canHover) return;
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={() => {
        if (canHover) scheduleClose();
      }}
      onFocus={cancelClose}
      onBlur={(event) => {
        if (!containerRef.current?.contains(event.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            setOpen(true);
            // Move into the panel so the keyboard path mirrors the mouse path.
            requestAnimationFrame(() =>
              containerRef.current?.querySelector<HTMLAnchorElement>("[data-panel] a")?.focus(),
            );
          }
        }}
        className={cn(
          "relative inline-flex items-center gap-1 whitespace-nowrap rounded-md px-2 py-2 text-[0.875rem] font-medium transition-colors 2xl:px-2.5 2xl:text-[0.9375rem]",
          sectionActive ? "text-brand-800" : "text-ink-soft hover:bg-navy-50 hover:text-navy-900",
        )}
      >
        {item.label}
        <ChevronDown
          aria-hidden="true"
          className={cn("size-3.5 transition-transform duration-200", open && "rotate-180")}
        />
        {sectionActive ? (
          <span
            aria-hidden="true"
            className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-brand-700"
          />
        ) : null}
      </button>

      <div
        id={panelId}
        data-panel
        hidden={!open}
        className={cn(
          "absolute left-1/2 top-[calc(100%+0.5rem)] z-50 -translate-x-1/2 rounded-card border border-line bg-white p-5 shadow-lift",
          wide ? "w-[52rem] max-w-[calc(100vw-3rem)]" : "w-[22rem]",
        )}
      >
        {item.groups ? (
          <div className="grid grid-cols-3 gap-x-6 gap-y-5">
            {item.groups.map((group) => (
              <div key={group.href}>
                <Link
                  href={group.href}
                  className="block text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-brand-700 underline-offset-4 hover:underline"
                >
                  {group.title}
                </Link>
                <ul className="mt-2 grid gap-0.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        aria-current={isActive(link.href) ? "page" : undefined}
                        className={cn(
                          "block rounded-md px-2 py-1.5 -mx-2 text-[0.9375rem] transition-colors hover:bg-navy-50",
                          isActive(link.href)
                            ? "font-semibold text-brand-800"
                            : "text-ink-soft hover:text-navy-900",
                        )}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : null}

        {item.links ? (
          <ul className="grid gap-1">
            {item.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className="group block rounded-lg p-3 transition-colors hover:bg-navy-50"
                >
                  <span
                    className={cn(
                      "flex items-center gap-1.5 font-semibold",
                      isActive(link.href) ? "text-brand-800" : "text-navy-900",
                    )}
                  >
                    {link.label}
                    <ArrowRight
                      aria-hidden="true"
                      className="size-3.5 text-muted transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </span>
                  {link.description ? (
                    <span className="mt-0.5 block text-sm text-ink-soft">{link.description}</span>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}

        {item.featured ? (
          <div className="mt-5 flex flex-wrap gap-2 border-t border-line pt-4">
            {item.featured.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-2 text-sm font-semibold text-navy-900 transition-colors hover:border-brand-300 hover:text-brand-700"
              >
                {link.label}
                <ArrowRight
                  aria-hidden="true"
                  className="size-3.5 text-muted transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
