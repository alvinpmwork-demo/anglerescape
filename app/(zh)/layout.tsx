import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://anglerescape.com"),
  title: {
    default: "钓鱼佬大逃亡｜被抓了还能跑的钓鱼小游戏",
    template: "%s",
  },
  description:
    "钓鱼佬小游戏《钓鱼佬大逃亡》：偷偷摸鱼、被发现、狂奔逃脱，被抓了还能跑！轻松幽默潜行钓鱼，纯属虚构娱乐。",
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
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
