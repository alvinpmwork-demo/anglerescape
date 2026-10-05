import type { FaqItem } from "@/lib/content";

type Props = {
  title: string;
  items: FaqItem[];
};

export function Faq({ title, items }: Props) {
  return (
    <section className="faq" id="faq">
      <h2>{title}</h2>
      <dl className="faq-list">
        {items.map((item) => (
          <div key={item.q} className="faq-item">
            <dt>{item.q}</dt>
            <dd>{item.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
