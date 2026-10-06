import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";
import { homeEn } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  path: "/",
  title: homeEn.title,
  description: homeEn.description,
});

export default function Page() {
  return <HomePage content={homeEn} />;
}
