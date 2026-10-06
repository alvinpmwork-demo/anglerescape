import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";
import { homeZh } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  locale: "zh",
  path: "/",
  title: homeZh.title,
  description: homeZh.description,
});

export default function Page() {
  return <HomePage content={homeZh} />;
}
