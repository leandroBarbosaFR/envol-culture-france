'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowRight, List, X } from '@phosphor-icons/react/ssr';
import { LogoEnvol } from '@/components/logo-envol';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type NavItem = { href: string; label: string };

type HeaderProps = {
  siteName?: string;
  navLinks?: NavItem[];
  primaryButtonLabel?: string;
  primaryButtonUrl?: string;
  secondaryButtonLabel?: string;
  secondaryButtonUrl?: string;
};

const NAV_LINK =
  'rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground';

const BAR = 'rounded-lg border border-border bg-background/95 shadow-sm';

export function SiteHeader({ header }: { header?: HeaderProps }) {
  const [open, setOpen] = useState(false);

  const siteName = header?.siteName ?? 'Envol Culture';
  const navLinks = header?.navLinks ?? [];
  const primaryLabel = header?.primaryButtonLabel ?? "S'inscrire";
  const primaryUrl = header?.primaryButtonUrl ?? '/inscription';
  const secondaryLabel = header?.secondaryButtonLabel ?? 'Se connecter';
  const secondaryUrl = header?.secondaryButtonUrl ?? '/connexion';

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 print:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-4 md:px-6">
          {/* Mobile */}
          <div className={`${BAR} flex w-full items-center justify-between p-1.5 pl-4 lg:hidden`}>
            <Link href="/" className="py-2" aria-label={`${siteName} — accueil`}>
              <LogoEnvol className="h-8 w-auto text-brand-deep" />
            </Link>
            <button
              type="button"
              aria-label="Ouvrir le menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
              className="grid size-10 place-items-center rounded-md text-foreground transition-colors hover:bg-muted"
            >
              <List className="size-5" />
            </button>
          </div>

          {/* Desktop */}
          <div className={`${BAR} hidden items-center gap-1 p-1.5 lg:flex`}>
            <Link href="/" className="px-3 py-2" aria-label={`${siteName} — accueil`}>
              <LogoEnvol className="h-8 w-auto text-brand-deep" />
            </Link>
            <span aria-hidden className="mx-1 h-5 w-px bg-border" />
            <nav className="flex items-center gap-0.5">
              {navLinks.map((item) => (
                <Link key={item.href} href={item.href} className={NAV_LINK}>
                  {item.label}
                </Link>
              ))}
              <Link href={secondaryUrl} className={NAV_LINK}>
                {secondaryLabel}
              </Link>
            </nav>
            <Link href={primaryUrl} className={cn(buttonVariants(), 'ml-1')}>
              {primaryLabel}
            </Link>
          </div>
        </div>
      </header>

      <MobileDrawer
        open={open}
        onClose={() => setOpen(false)}
        siteName={siteName}
        navLinks={navLinks}
        primaryLabel={primaryLabel}
        primaryUrl={primaryUrl}
        secondaryLabel={secondaryLabel}
        secondaryUrl={secondaryUrl}
      />
    </>
  );
}

function MobileDrawer({
  open,
  onClose,
  siteName,
  navLinks,
  primaryLabel,
  primaryUrl,
  secondaryLabel,
  secondaryUrl,
}: {
  open: boolean;
  onClose: () => void;
  siteName: string;
  navLinks: NavItem[];
  primaryLabel: string;
  primaryUrl: string;
  secondaryLabel: string;
  secondaryUrl: string;
}) {
  return (
    <div
      className="fixed inset-0 z-[60] lg:hidden print:hidden"
      aria-hidden={!open}
      style={{ pointerEvents: open ? 'auto' : 'none' }}
    >
      <div
        className={`absolute inset-0 flex flex-col overflow-hidden bg-foreground text-background transition-[opacity,transform] duration-300 ease-out ${
          open ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4">
          <LogoEnvol className="h-7 w-auto text-brand" />
          <span className="sr-only">{siteName}</span>
          <button
            type="button"
            aria-label="Fermer le menu"
            onClick={onClose}
            className="grid size-10 place-items-center rounded-md text-background/80 transition-colors hover:bg-background/10 hover:text-background"
          >
            <X className="size-5" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col justify-center px-5 pb-6">
          <span className="text-xs font-medium text-background/50">Navigation</span>
          <ul className="mt-4 flex flex-col">
            {navLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="group flex items-center justify-between gap-4 border-b border-background/10 py-4 font-heading text-3xl font-semibold text-background transition-colors hover:text-brand"
                >
                  <span>{item.label}</span>
                  <ArrowRight className="size-6 shrink-0 text-background/30 transition-colors group-hover:text-brand" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="grid grid-cols-2 gap-3 border-t border-background/10 p-5">
          <Link
            href={secondaryUrl}
            onClick={onClose}
            className={cn(
              buttonVariants({ variant: 'outline', size: 'lg' }),
              'border-background/30 bg-transparent text-background hover:bg-background/10 hover:text-background',
            )}
          >
            {secondaryLabel}
          </Link>
          <Link
            href={primaryUrl}
            onClick={onClose}
            className={buttonVariants({ size: 'lg' })}
          >
            {primaryLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
