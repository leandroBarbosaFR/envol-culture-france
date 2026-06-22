import Link from 'next/link';

type NavItem = { href: string; label: string };

type FooterProps = {
  siteName?: string;
  tagline?: string;
  navColumnTitle?: string;
  navLinks?: NavItem[];
  memberColumnTitle?: string;
  memberLinks?: NavItem[];
  copyright?: string;
  legalLabel?: string;
  legalUrl?: string;
  privacyLabel?: string;
  privacyUrl?: string;
};

export function SiteFooter({ footer }: { footer?: FooterProps }) {
  const siteName = footer?.siteName ?? 'Envol Culture';
  const tagline = footer?.tagline ?? '';
  const navColumnTitle = footer?.navColumnTitle ?? 'Navigation';
  const navLinks = footer?.navLinks ?? [];
  const memberColumnTitle = footer?.memberColumnTitle ?? 'Espace adhérent';
  const memberLinks = footer?.memberLinks ?? [];
  const copyright = footer?.copyright ?? 'Envol — Association loi 1901';
  const legalLabel = footer?.legalLabel ?? 'Mentions légales';
  const legalUrl = footer?.legalUrl ?? '#';
  const privacyLabel = footer?.privacyLabel ?? 'Politique de confidentialité';
  const privacyUrl = footer?.privacyUrl ?? '#';

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link href="/" className="font-semibold tracking-tight">
              {siteName}
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground leading-relaxed">
              {tagline}
            </p>
          </div>

          <div className="md:col-span-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {navColumnTitle}
            </div>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {memberColumnTitle}
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              {memberLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <span>{copyright}</span>
          <div className="flex gap-5">
            <a href={legalUrl} className="hover:text-foreground">
              {legalLabel}
            </a>
            <a href={privacyUrl} className="hover:text-foreground">
              {privacyLabel}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
