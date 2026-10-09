import Link from "next/link";
import type { NavLink } from "@/lib/site";

type Props = {
  siteName: string;
  howHref: string;
  disclaimerHref: string;
  footerHow: string;
  footerDisclaimer: string;
  disclaimer: string;
  homeHref: string;
  links?: NavLink[];
  navLabel?: string;
};

const TRUST_LINKS = {
  en: [
    { label: "About", href: "/about/" },
    { label: "Contact", href: "/contact/" },
    { label: "Privacy Policy", href: "/privacy/" },
    { label: "Disclaimer", href: "/about/fishing-rules-disclaimer/" },
  ],
  zh: [
    { label: "关于", href: "/zh/about/" },
    { label: "联系我们", href: "/zh/contact/" },
    { label: "隐私政策", href: "/zh/privacy/" },
    { label: "免责声明", href: "/zh/about/fishing-rules-disclaimer/" },
  ],
};

export function Footer({ siteName, disclaimer, homeHref, links = [], navLabel }: Props) {
  const isZh = homeHref.startsWith("/zh/");
  const trust = TRUST_LINKS[isZh ? "zh" : "en"];
  return (
    <footer className="site-footer" id="disclaimer">
      <div className="container footer-inner">
        <p className="disclaimer">{disclaimer}</p>
        <nav className="footer-links" aria-label={navLabel ?? "Site"}>
          <Link href={homeHref}>{siteName}</Link>
          {links
            .filter((l) => l.href !== homeHref)
            .map((l) => (
              <Link key={l.href} href={l.href}>
                {l.label}
              </Link>
            ))}
        </nav>
        <nav className="footer-links footer-trust" aria-label={isZh ? "关于本站" : "About this site"}>
          {trust.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
