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

export function Footer({ siteName, disclaimer, homeHref, links = [], navLabel }: Props) {
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
      </div>
    </footer>
  );
}
