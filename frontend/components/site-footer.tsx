import Link from 'next/link';
import { CookieSettingsButton } from '@/components/cookie-settings-button';
import { addressLines, phoneHref, type SiteContact } from '@/lib/contact';

type NavItem = { href: string; label: string };

type FooterProps = {
  siteName?: string;
  tagline?: string;
  navColumnTitle?: string;
  navLinks?: NavItem[];
  memberColumnTitle?: string;
  memberLinks?: NavItem[];
  contactColumnTitle?: string;
  copyright?: string;
  legalLabel?: string;
  legalUrl?: string;
  privacyLabel?: string;
  privacyUrl?: string;
};

/** Treats empty values and the '#' placeholder as "not set". */
function realUrl(url?: string | null): string | null {
  const u = url?.trim();
  return u && u !== '#' ? u : null;
}

export function SiteFooter({
  footer,
  contact,
  cookieManageLabel = 'Gérer les cookies',
}: {
  footer?: FooterProps;
  contact?: SiteContact;
  cookieManageLabel?: string;
}) {
  const siteName = footer?.siteName ?? 'Envol Culture';
  const tagline = footer?.tagline ?? '';
  const navColumnTitle = footer?.navColumnTitle ?? 'Navigation';
  const navLinks = footer?.navLinks ?? [];
  const memberColumnTitle = footer?.memberColumnTitle ?? 'Espace adhérent';
  const memberLinks = footer?.memberLinks ?? [];
  const contactColumnTitle = footer?.contactColumnTitle ?? 'Contact';
  const copyright = footer?.copyright ?? 'Envol — Association loi 1901';
  const legalLabel = footer?.legalLabel ?? 'Mentions légales';
  const legalUrl = realUrl(footer?.legalUrl) ?? '/mentions-legales';
  const privacyLabel = footer?.privacyLabel ?? 'Politique de confidentialité';
  const privacyUrl = realUrl(footer?.privacyUrl) ?? '/politique-de-confidentialite';

  const lines = addressLines(contact ?? null);
  const hasContact = Boolean(contact?.phone || contact?.email || lines.length);

  return (
    <footer className="border-t border-border bg-background print:hidden">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.5fr_0.9fr_0.9fr_1.3fr] lg:gap-10">
          <div>
            <Link href="/" className="font-heading font-semibold">
              {siteName}
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {tagline}
            </p>
          </div>

          <div>
            <div className="text-sm font-semibold text-foreground">{navColumnTitle}</div>
            <ul className="mt-4 space-y-2 text-sm">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-muted-foreground hover:text-foreground">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold text-foreground">{memberColumnTitle}</div>
            <ul className="mt-4 space-y-2 text-sm">
              {memberLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-muted-foreground hover:text-foreground">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {hasContact && (
            <div>
              <div className="text-sm font-semibold text-foreground">{contactColumnTitle}</div>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {contact?.contactName && <li className="text-foreground">{contact.contactName}</li>}
                {contact?.phone && (
                  <li>
                    <a href={phoneHref(contact.phone)} className="hover:text-foreground">
                      {contact.phone}
                    </a>
                  </li>
                )}
                {contact?.email && (
                  <li>
                    <a href={`mailto:${contact.email}`} className="break-all hover:text-foreground">
                      {contact.email}
                    </a>
                  </li>
                )}
                {lines.length > 0 && (
                  <li>
                    <div className="not-italic">
                      {lines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </div>
                  </li>
                )}
              </ul>
            </div>
          )}
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
            <CookieSettingsButton label={cookieManageLabel} />
          </div>
        </div>
      </div>
    </footer>
  );
}
