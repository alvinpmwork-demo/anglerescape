import type { Metadata } from "next";
import { SecondEscapePage } from "@/components/SecondEscapePage";
import { secondEn } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  path: "/play/second-escape/",
  title: secondEn.title,
  description: secondEn.description,
});

export default function Page() {
  return <SecondEscapePage content={secondEn} />;
}
