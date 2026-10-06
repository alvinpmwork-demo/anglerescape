import type { Metadata } from "next";
import { SecondEscapePage } from "@/components/SecondEscapePage";
import { secondZh } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  locale: "zh",
  path: "/play/second-escape/",
  title: secondZh.title,
  description: secondZh.description,
});

export default function Page() {
  return <SecondEscapePage content={secondZh} />;
}
