import type { Metadata } from "next";
import { ArticlePage } from "@/components/ArticlePage";
import { playZh } from "@/lib/pages";
import { buildAlternatesFor, SITE_URL } from "@/lib/site";

const content = playZh;

export const metadata: Metadata = {
  title: content.title,
  description: content.description,
  alternates: buildAlternatesFor(content.locale, content.path),
  openGraph: {
    title: content.title,
    description: content.description,
    url: `${SITE_URL}${content.locale === "zh" ? `/zh${content.path}` : content.path}`,
    locale: "zh_CN",
  },
};

export default function Page() {
  return <ArticlePage content={content} />;
}
