import Link from "next/link";

type Props = {
  siteName: string;
  homeHref: string;
  secondHref: string;
  navHome: string;
  navSecond: string;
  langSwitchLabel: string;
  langSwitchHref: string;
};

export function Header({
  siteName,
  homeHref,
  secondHref,
  navHome,
  navSecond,
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
          <Link href={homeHref}>{navHome}</Link>
          <Link href={secondHref}>{navSecond}</Link>
          <Link href={langSwitchHref} className="lang-switch" hrefLang={langSwitchLabel === "English" ? "en" : "zh-CN"}>
            {langSwitchLabel}
          </Link>
        </nav>
      </div>
    </header>
  );
}
