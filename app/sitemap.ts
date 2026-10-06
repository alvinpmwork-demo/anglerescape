import type { MetadataRoute } from "next";
import { absUrl, CONTENT_UPDATED, hreflangMap } from "@/lib/seo";

export const dynamic = "force-static";

/** EN-form paths; every entry also has a /zh/ twin. */
const ROUTES: { path: string; priority: number; changeFrequency: "weekly" | "monthly" }[] = [
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
  { path: "/similar-games/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/vs/unbaitable/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about/fishing-rules-disclaimer/", priority: 0.4, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = CONTENT_UPDATED;
  return ROUTES.flatMap((r) =>
    (["en", "zh"] as const).map((locale) => ({
      url: absUrl(locale, r.path),
      lastModified,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
      alternates: { languages: hreflangMap(r.path) },
    })),
  );
}
