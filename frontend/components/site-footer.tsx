import { CookieSettingsButton } from '@/components/cookie-settings-button';
import { LogoEnvol } from '@/components/logo-envol';
import { SiteCopyright } from '@/components/site-copyright';
import { addressLines, phoneHref, type SiteContact } from '@/lib/contact';
import Link from 'next/link';

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
  const copyright = footer?.copyright ?? '© {year} Envol — Association loi 1901';
  const legalLabel = footer?.legalLabel ?? 'Mentions légales';
  const legalUrl = realUrl(footer?.legalUrl) ?? '/mentions-legales';
  const privacyLabel = footer?.privacyLabel ?? 'Politique de confidentialité';
  const privacyUrl = realUrl(footer?.privacyUrl) ?? '/politique-de-confidentialite';

  const lines = addressLines(contact ?? null);
  const hasContact = Boolean(contact?.phone || contact?.email || lines.length);

  return (
    <footer className="bg-brand-deep text-background print:hidden">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.5fr_0.9fr_0.9fr_1.3fr] lg:gap-10">
          <div>
            <Link
              href="/"
              className="inline-block"
              aria-label={`${siteName} — accueil`}
            >
              <LogoEnvol className="h-9 w-auto text-background" />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-background/90">
              {tagline}
            </p>
          </div>

          <div>
            <div className="text-sm font-semibold text-background">{navColumnTitle}</div>
            <ul className="mt-4 space-y-2 text-sm">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-background/90 hover:text-background">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold text-background">{memberColumnTitle}</div>
            <ul className="mt-4 space-y-2 text-sm">
              {memberLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-background/90 hover:text-background">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {hasContact && (
            <div>
              <div className="text-sm font-semibold text-background">{contactColumnTitle}</div>
              <ul className="mt-4 space-y-2 text-sm text-background/90">
                {contact?.contactName && <li className="text-background">{contact.contactName}</li>}
                {contact?.phone && (
                  <li>
                    <a href={phoneHref(contact.phone)} className="hover:text-background">
                      {contact.phone}
                    </a>
                  </li>
                )}
                {contact?.email && (
                  <li>
                    <a href={`mailto:${contact.email}`} className="break-all hover:text-background">
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

        <div className="mt-10 flex flex-col gap-3 border-background/25 pt-6 text-xs text-background/90 md:flex-row md:items-center md:justify-between">
          <SiteCopyright template={copyright} />
          <div className="flex gap-5">
            <a href={legalUrl} className="hover:text-background">
              {legalLabel}
            </a>
            <a href={privacyUrl} className="hover:text-background">
              {privacyLabel}
            </a>
            <CookieSettingsButton label={cookieManageLabel} />
          </div>
        </div>
      </div>
    </footer>
  );
}
