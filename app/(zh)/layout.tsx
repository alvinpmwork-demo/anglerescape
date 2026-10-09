import type { Metadata } from "next";
import "../globals.css";
import { JsonLd } from "@/components/JsonLd";
import { organizationNode, website } from "@/lib/schema";
import { homeZh } from "@/lib/content";

export const metadata: Metadata = {
  metadataBase: new URL("https://anglerescape.com"),
  title: {
    default: homeZh.title,
    template: "%s",
  },
  description: homeZh.description,
  applicationName: "钓鱼佬大逃亡",
  robots: { index: true, follow: true },
  openGraph: {
    siteName: "钓鱼佬大逃亡",
    type: "website",
    locale: "zh_CN",
    alternateLocale: ["en_US"],
  },
};

export default function ZhLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hans">
      <body>
        <JsonLd data={[organizationNode("zh"), website("zh")]} />
        {children}
      </body>
    </html>
  );
}
