import type { Metadata } from "next";
import { ArticlePage } from "@/components/ArticlePage";
import { level02Zh } from "@/lib/pages";
import { buildPageMetadata } from "@/lib/seo";

const content = level02Zh;

export const metadata: Metadata = buildPageMetadata({
  locale: content.locale,
  path: content.path,
  title: content.title,
  description: content.description,
  ogType: content.schemaType === "VideoGame" ? "website" : "article",
});

export default function Page() {
  return <ArticlePage content={content} />;
}
