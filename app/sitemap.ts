import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/content";

export const dynamic = "force-static";

const PATHS = [
  "/",
  "/zh/",
  "/play/",
  "/zh/play/",
  "/play/second-escape/",
  "/zh/play/second-escape/",
  "/guides/how-to-escape-inspector/",
  "/zh/guides/how-to-escape-inspector/",
  "/similar-games/",
  "/zh/similar-games/",
  "/vs/unbaitable/",
  "/zh/vs/unbaitable/",
  "/meme/fishing-guy-meme/",
  "/zh/meme/fishing-guy-meme/",
  "/levels/",
  "/zh/levels/",
  "/levels/01-park-pond/",
  "/zh/levels/01-park-pond/",
  "/levels/02-reservoir-night/",
  "/zh/levels/02-reservoir-night/",
  "/levels/03-city-canal/",
  "/zh/levels/03-city-canal/",
  "/characters/",
  "/zh/characters/",
  "/about/fishing-rules-disclaimer/",
  "/zh/about/fishing-rules-disclaimer/",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return PATHS.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority:
      path === "/" || path === "/zh/"
        ? 1
        : path.includes("/play/")
          ? 0.9
          : 0.7,
  }));
}
