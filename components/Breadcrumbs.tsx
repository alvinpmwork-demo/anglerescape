import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbList } from "@/lib/schema";

type Crumb = { label: string; href: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  if (!items.length) return null;
  return (
    <>
      <JsonLd data={breadcrumbList(items)} />
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <ol>
          {items.map((crumb, i) => (
            <li key={crumb.href}>
              {i < items.length - 1 ? (
                <Link href={crumb.href}>{crumb.label}</Link>
              ) : (
                <span aria-current="page">{crumb.label}</span>
              )}
              {i < items.length - 1 ? (
                <span className="bc-sep" aria-hidden>
                  /
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
