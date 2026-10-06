type Props = { data: object | object[] };

/** Renders one <script type="application/ld+json"> per schema object. */
export function JsonLd({ data }: Props) {
  const list = Array.isArray(data) ? data : [data];
  return (
    <>
      {list.map((d, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(d).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
