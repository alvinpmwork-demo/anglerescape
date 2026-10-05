import Link from "next/link";

type Props = {
  siteName: string;
  howHref: string;
  disclaimerHref: string;
  footerHow: string;
  footerDisclaimer: string;
  disclaimer: string;
  homeHref: string;
};

export function Footer({
  siteName,
  howHref,
  disclaimerHref,
  footerHow,
  footerDisclaimer,
  disclaimer,
  homeHref,
}: Props) {
  return (
    <footer className="site-footer" id="disclaimer">
      <div className="container footer-inner">
        <p className="disclaimer">{disclaimer}</p>
        <div className="footer-links">
          <Link href={homeHref}>{siteName}</Link>
          <Link href={howHref}>{footerHow}</Link>
          <Link href={disclaimerHref}>{footerDisclaimer}</Link>
        </div>
      </div>
    </footer>
  );
}
