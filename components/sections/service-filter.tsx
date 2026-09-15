"use client";

import * as React from "react";
import { Search, X } from "lucide-react";
import { ServiceCard } from "@/components/sections/service-card";
import { serviceCategories, services, type ServiceCategoryId } from "@/content/services";
import { cn } from "@/lib/utils";

/**
 * Simple client-side filter over the (small, static) service catalogue.
 * The full list is rendered server-side first, so the page is useful without
 * JavaScript and indexable by search engines.
 */
export function ServiceFilter() {
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState<ServiceCategoryId | "all">("all");

  const normalised = query.trim().toLowerCase();

  const filtered = services.filter((service) => {
    const matchesCategory = category === "all" || service.category === category;
    if (!matchesCategory) return false;
    if (!normalised) return true;
    return [service.name, service.summary, ...service.keywords]
      .join(" ")
      .toLowerCase()
      .includes(normalised);
  });

  const chips: { id: ServiceCategoryId | "all"; label: string }[] = [
    { id: "all", label: "All services" },
    ...serviceCategories.map((c) => ({ id: c.id, label: c.name })),
  ];

  return (
    <div>
      {/* Category overview — doubles as a filter control */}
      <ul className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {serviceCategories.map((item) => {
          const active = category === item.id;
          return (
            <li key={item.id}>
              <button
                type="button"
                aria-pressed={active}
                onClick={() => setCategory(active ? "all" : item.id)}
                className={cn(
                  "flex h-full w-full flex-col rounded-card border p-4 text-left transition-colors",
                  active
                    ? "border-brand-600 bg-brand-50 ring-1 ring-brand-600"
                    : "border-line bg-surface-soft hover:border-brand-300 hover:bg-white",
                )}
              >
                <span className="font-semibold text-navy-900">{item.name}</span>
                <span className="mt-1 text-sm text-ink-soft">{item.description}</span>
                <span className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-brand-700">
                  {active ? "Showing this category" : "Filter this category"}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="flex flex-col gap-4 rounded-card border border-line bg-white p-4 shadow-soft sm:p-5">
        <div className="relative">
          <label htmlFor="service-search" className="sr-only">
            Search services
          </label>
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 size-4.5 -translate-y-1/2 text-muted"
          />
          <input
            id="service-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search services, for example “tax”, “permit”, “registration”"
            className="w-full rounded-lg border border-line bg-white py-2.5 pl-11 pr-10 text-[0.9375rem] text-ink placeholder:text-muted focus:border-brand-600 focus:outline-none"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-2.5 top-1/2 inline-flex size-7 -translate-y-1/2 items-center justify-center rounded-md text-muted hover:bg-navy-50 hover:text-navy-900"
              aria-label="Clear search"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          ) : null}
        </div>

        <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
          {chips.map((chip) => {
            const active = category === chip.id;
            return (
              <button
                key={chip.id}
                type="button"
                aria-pressed={active}
                onClick={() => setCategory(chip.id)}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                  active
                    ? "border-brand-700 bg-brand-700 text-white"
                    : "border-line bg-white text-ink-soft hover:border-brand-300 hover:text-brand-800",
                )}
              >
                {chip.label}
              </button>
            );
          })}
        </div>
      </div>

      <p aria-live="polite" className="mt-5 text-sm text-muted">
        Showing {filtered.length} of {services.length} services
        {category !== "all" ? ` in ${serviceCategories.find((c) => c.id === category)?.name}` : ""}
        {normalised ? ` matching “${query.trim()}”` : ""}.
      </p>

      {filtered.length > 0 ? (
        <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((service) => (
            <li key={service.slug} className="h-full">
              <ServiceCard service={service} className="h-full" />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-5 rounded-card border border-dashed border-line bg-surface-soft p-8 text-center">
          <p className="font-semibold text-navy-900">No services match that search.</p>
          <p className="mx-auto mt-2 max-w-md text-sm text-ink-soft">
            Try a different word, or clear the filters. If you cannot find what you need, contact us
            directly — we will tell you honestly whether we can help.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("all");
            }}
            className="mt-4 rounded-lg border border-line bg-white px-4 py-2 text-sm font-semibold text-navy-900 hover:border-brand-600 hover:text-brand-700"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
