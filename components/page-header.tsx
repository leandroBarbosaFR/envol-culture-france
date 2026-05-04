import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type Crumb = { href: string; label: string };

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  crumbs?: Crumb[];
};

export function PageHeader({
  eyebrow,
  title,
  description,
  crumbs,
}: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-brand-soft/40">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-32 -z-10 h-96 w-96 rounded-full bg-primary/30 blur-3xl"
      />
      <div className="mx-auto max-w-6xl px-4 pt-28 pb-14 md:px-6 md:pt-32 md:pb-20">
        {crumbs && crumbs.length > 0 ? (
          <nav className="mb-6 flex items-center gap-1 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Accueil
            </Link>
            {crumbs.map((c, i) => (
              <span key={c.href} className="flex items-center gap-1">
                <ChevronRight className="h-3.5 w-3.5" />
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

        {eyebrow ? (
          <span className="text-sm font-medium text-brand-deep">{eyebrow}</span>
        ) : null}
        <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {description}
          </p>
        ) : null}
      </div>
    </section>
  );
}
