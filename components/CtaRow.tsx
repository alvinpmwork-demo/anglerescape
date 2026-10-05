import Link from "next/link";

type Props = {
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  primaryAnchor?: boolean;
};

export function CtaRow({
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  primaryAnchor = false,
}: Props) {
  return (
    <div className="cta-row">
      {primaryAnchor ? (
        <a className="btn btn-primary" href={primaryHref}>
          {primaryLabel}
        </a>
      ) : (
        <Link className="btn btn-primary" href={primaryHref}>
          {primaryLabel}
        </Link>
      )}
      <Link className="btn btn-secondary" href={secondaryHref}>
        {secondaryLabel}
      </Link>
    </div>
  );
}
