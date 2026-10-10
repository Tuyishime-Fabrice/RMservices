import { serviceCategories, servicesByCategory } from "@/content/services";

/**
 * Main navigation.
 *
 * Six visible items instead of eight, with the service catalogue and the
 * reading material folded into two dropdowns. Nothing was deleted: every page
 * that used to be a top-level link is still reachable, and every URL is
 * unchanged.
 *
 * Built from the service catalogue so the menu can never drift out of sync
 * with the services themselves. The layout resolves it on the server and
 * passes the result to the (client) navbar, which keeps the full catalogue out
 * of the browser bundle.
 */

export type NavLink = { label: string; href: string; description?: string };

export type NavGroup = { title: string; href: string; links: NavLink[] };

export type NavItem =
  | { kind: "link"; label: string; href: string }
  | {
      kind: "menu";
      label: string;
      /** The page the label itself points to, and the menu's "see everything" link. */
      href: string;
      /** Columns of grouped links (used by the Services menu). */
      groups?: NavGroup[];
      /** Flat links (used by the Resources menu). */
      links?: NavLink[];
      /** Links pinned to the bottom of the panel. */
      featured?: NavLink[];
    };

export function getNavigation(): NavItem[] {
  return [
    { kind: "link", label: "Home", href: "/" },
    { kind: "link", label: "About", href: "/about" },
    {
      kind: "menu",
      label: "Services",
      href: "/services",
      groups: serviceCategories.map((category) => ({
        title: category.name,
        href: `/services#${category.id}`,
        links: servicesByCategory(category.id).map((service) => ({
          label: service.name,
          href: `/services/${service.slug}`,
        })),
      })),
      featured: [
        {
          label: "All services",
          href: "/services",
          description: "Browse the full directory",
        },
        {
          label: "Investors & expatriates",
          href: "/investors-expatriates",
          description: "Support for clients based abroad",
        },
      ],
    },
    {
      kind: "menu",
      label: "Resources",
      href: "/resources",
      links: [
        {
          label: "Guides & articles",
          href: "/resources",
          description: "Practical guides on doing business in Rwanda",
        },
        {
          label: "Frequently asked questions",
          href: "/faqs",
          description: "Straight answers about how we work",
        },
      ],
    },
    { kind: "link", label: "Contact", href: "/contact" },
  ];
}

/** Service links kept in the footer, so nothing depends on the dropdown alone. */
export function getFooterServiceGroups(): NavGroup[] {
  return serviceCategories.map((category) => ({
    title: category.name,
    href: `/services#${category.id}`,
    links: servicesByCategory(category.id).map((service) => ({
      label: service.name,
      href: `/services/${service.slug}`,
    })),
  }));
}
