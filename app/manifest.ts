import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.legalName,
    short_name: "R&M Services",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0b1b33",
    icons: [
      {
        src: "/brand/rm-logo.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
