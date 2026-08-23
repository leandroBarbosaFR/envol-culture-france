import Link from 'next/link';
import { CaretRight } from '@phosphor-icons/react/ssr';

export type Crumb = { href: string; label: string };

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  crumbs?: Crumb[];
  /** Small label pinned top-right, e.g. the season on the planning pages. */
  badge?: string;
};

export function PageHeader({
  eyebrow,
  title,
  description,
  crumbs,
  badge,
}: PageHeaderProps) {
  return (
    <section className="border-b border-border bg-brand-soft/40 print:border-0 print:bg-transparent">
      <div className="mx-auto max-w-6xl px-4 pt-28 pb-14 md:px-6 md:pt-32 md:pb-20 print:max-w-none print:px-0 print:pt-0 print:pb-4">
        {crumbs && crumbs.length > 0 ? (
          <nav className="mb-6 flex items-center gap-1 text-sm text-muted-foreground print:hidden">
            <Link href="/" className="hover:text-foreground">
              Accueil
            </Link>
            {crumbs.map((c, i) => (
              <span key={c.href} className="flex items-center gap-1">
                <CaretRight className="size-3.5" />
                {i === crumbs.length - 1 ? (
                  <span className="text-foreground">{c.label}</span>
                ) : (
                  <Link href={c.href} className="hover:text-foreground">
                    {c.label}
                  </Link>
                )}
              </span>
            ))}
          </nav>
        ) : null}

        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0">
            {eyebrow ? (
              <span className="text-sm font-medium text-brand-deep">{eyebrow}</span>
            ) : null}
            <h1 className="mt-2 text-4xl font-semibold md:text-5xl print:text-3xl">
              {title}
            </h1>
            {description ? (
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg print:mt-2 print:max-w-none print:text-sm">
                {description}
              </p>
            ) : null}
          </div>

          {badge ? (
            <span className="shrink-0 rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground">
              {badge}
            </span>
          ) : null}
        </div>
      </div>
    </section>
  );
}
