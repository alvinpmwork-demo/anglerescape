import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://anglerescape.com"),
  title: {
    default: "Angler Escape｜Steal Fish, Get Caught, Escape Again",
    template: "%s",
  },
  description:
    "Play Angler Escape—the stealth fishing game where you snatch fish, get spotted, bolt, and escape again. Funny, light, pure fiction. No real tips.",
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
      <body>{children}</body>
    </html>
  );
}
