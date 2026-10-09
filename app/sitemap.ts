import type { MetadataRoute } from "next";
import type { Locale } from "@/lib/content";
import { absUrl, hreflangMap, SITE_UPDATED } from "@/lib/seo";

export const dynamic = "force-static";

type Route = {
  /** EN-form path */
  path: string;
  priority: number;
  changeFrequency: "weekly" | "monthly";
  /** Defaults to both locales (with hreflang). A single locale means no twin, so no hreflang. */
  locales?: Locale[];
  /** Per-route lastmod (ISO date); defaults to SITE_UPDATED */
  lastModified?: string;
};

const ROUTES: Route[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/play/", priority: 0.9, changeFrequency: "weekly" },
  { path: "/play/second-escape/", priority: 0.9, changeFrequency: "weekly" },
  { path: "/guides/how-to-escape-inspector/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/levels/", priority: 0.8, changeFrequency: "weekly" },
  { path: "/levels/01-park-pond/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/levels/02-reservoir-night/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/levels/03-city-canal/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/characters/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/meme/fishing-guy-meme/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/meme/luya-paodu/", priority: 0.8, changeFrequency: "monthly", locales: ["zh"] },
  { path: "/similar-games/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/vs/unbaitable/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about/", priority: 0.4, changeFrequency: "monthly" },
  { path: "/contact/", priority: 0.3, changeFrequency: "monthly" },
  { path: "/privacy/", priority: 0.3, changeFrequency: "monthly" },
  { path: "/about/fishing-rules-disclaimer/", priority: 0.4, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.flatMap((r) => {
    const locales = r.locales ?? (["en", "zh"] as const);
    const twin = locales.length > 1;
    return locales.map((locale) => ({
      url: absUrl(locale, r.path),
      lastModified: r.lastModified ?? SITE_UPDATED,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
      ...(twin ? { alternates: { languages: hreflangMap(r.path) } } : {}),
    }));
  });
}
