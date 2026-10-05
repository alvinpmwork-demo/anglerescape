type Props = { text: string };

export function Disclaimer({ text }: Props) {
  return <p className="disclaimer inline-disclaimer">{text}</p>;
}
