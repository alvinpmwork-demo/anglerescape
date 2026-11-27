import type { ReactNode } from "react";
import { CONTACT_EMAIL } from "@/lib/pages/trust";

/** Cloudflare HTML comments that disable Email Address Obfuscation for the wrapped markup. */
function EmailOff({ children }: { children: ReactNode }) {
  return (
    <>
      <span dangerouslySetInnerHTML={{ __html: "<!--email_off-->" }} />
      {children}
      <span dangerouslySetInnerHTML={{ __html: "<!--/email_off-->" }} />
    </>
  );
}

/** Clickable address that Cloudflare will not rewrite into a crawlable /cdn-cgi/l/email-protection link. */
export function ProtectedEmail() {
  return (
    <EmailOff>
      <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
    </EmailOff>
  );
}

/** Replace the contact address in plain copy with a protected mailto link. */
export function withProtectedEmail(text: string): ReactNode {
  if (!text.includes(CONTACT_EMAIL)) return text;
  const parts = text.split(CONTACT_EMAIL);
  const nodes: ReactNode[] = [];
  parts.forEach((part, i) => {
    if (i > 0) nodes.push(<ProtectedEmail key={`email-${i}`} />);
    if (part) nodes.push(part);
  });
  return nodes;
}

export function isMailtoHref(href: string): boolean {
  return href.trim().toLowerCase().startsWith("mailto:");
}
