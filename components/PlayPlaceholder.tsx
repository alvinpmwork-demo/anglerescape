type Props = {
  title: string;
  hint: string;
  id?: string;
};

export function PlayPlaceholder({ title, hint, id = "play" }: Props) {
  return (
    <section className="play-area" id={id} aria-label={title}>
      <div className="play-canvas" role="img" aria-label={title}>
        <div className="play-canvas-inner">
          <span className="play-emoji" aria-hidden="true">
            🐟
          </span>
          <strong>{title}</strong>
          <p>{hint}</p>
        </div>
      </div>
    </section>
  );
}
