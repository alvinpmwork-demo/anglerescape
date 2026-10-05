import Link from "next/link";
import type { NavLink } from "@/lib/site";

type Props = {
  siteName: string;
  homeHref: string;
  links: NavLink[];
  langSwitchLabel: string;
  langSwitchHref: string;
};

export function Header({
  siteName,
  homeHref,
  links,
  langSwitchLabel,
  langSwitchHref,
}: Props) {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href={homeHref} className="logo">
          🎣 {siteName}
        </Link>
        <nav className="nav" aria-label="Primary">
          {links.map((link) => (
            <Link key={link.href + link.label} href={link.href}>
              {link.label}
            </Link>
          ))}
          <Link
            href={langSwitchHref}
            className="lang-switch"
            hrefLang={langSwitchLabel === "English" ? "en" : "zh-CN"}
          >
            {langSwitchLabel}
          </Link>
        </nav>
      </div>
    </header>
  );
}
