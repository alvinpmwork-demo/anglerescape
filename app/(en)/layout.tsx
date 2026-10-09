import type { Metadata } from "next";
import "../globals.css";
import { JsonLd } from "@/components/JsonLd";
import { organizationNode, website } from "@/lib/schema";
import { homeEn } from "@/lib/content";

export const metadata: Metadata = {
  metadataBase: new URL("https://anglerescape.com"),
  title: {
    default: homeEn.title,
    template: "%s",
  },
  description: homeEn.description,
  applicationName: "Angler Escape",
  robots: { index: true, follow: true },
  openGraph: {
    siteName: "Angler Escape",
    type: "website",
    locale: "en_US",
    alternateLocale: ["zh_CN"],
  },
};

export default function EnLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <JsonLd data={[organizationNode("en"), website("en")]} />
        {children}
      </body>
    </html>
  );
}
