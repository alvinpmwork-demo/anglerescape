import Link from "next/link";

type Props = {
  title: string;
  hint: string;
  id?: string;
  linkLabel?: string;
  linkHref?: string;
};

export function PlayPlaceholder({ title, hint, id = "play", linkLabel, linkHref }: Props) {
  return (
    <section className="play-area" id={id} aria-label={title}>
      <div className="play-canvas">
        <div className="play-canvas-inner">
          <span className="play-emoji" aria-hidden="true">
            🐟
          </span>
          <strong>{title}</strong>
          <p>{hint}</p>
          {linkLabel && linkHref ? (
            <Link className="btn btn-primary" href={linkHref}>
              {linkLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
