'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';

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
  'rounded-md px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-foreground/75 transition-colors duration-200 hover:bg-foreground/5 hover:text-foreground';

const PILL =
  'rounded-xl border border-black/5 bg-white/85 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)] backdrop-blur-md';

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
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-6 py-5">
          {/* Mobile */}
          <div
            className={`${PILL} flex items-center gap-1 p-1.5 pl-5 lg:hidden`}
          >
            <Link
              href="/"
              className="py-2 pr-3 text-sm font-semibold tracking-tight text-foreground"
            >
              {siteName}
            </Link>
            <button
              type="button"
              aria-label="Ouvrir le menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-md text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-foreground"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>

          {/* Desktop */}
          <div className={`${PILL} hidden items-center gap-1 p-1.5 lg:flex`}>
            <Link
              href="/"
              className="px-4 py-2 text-sm font-semibold tracking-tight text-foreground"
            >
              {siteName}
            </Link>
            <span aria-hidden className="mx-1 h-5 w-px bg-foreground/10" />
            <nav className="flex items-center gap-1">
              {navLinks.map((item) => (
                <Link key={item.href} href={item.href} className={NAV_LINK}>
                  {item.label}
                </Link>
              ))}
              <Link href={secondaryUrl} className={NAV_LINK}>
                {secondaryLabel}
              </Link>
            </nav>
            <Link
              href={primaryUrl}
              className="ml-1 inline-flex h-10 items-center justify-center rounded-md bg-foreground px-5 text-[11px] font-semibold uppercase tracking-[0.12em] text-background transition-colors duration-200 hover:bg-foreground/85"
            >
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
      className="fixed inset-0 z-[60] lg:hidden"
      aria-hidden={!open}
      style={{ pointerEvents: open ? 'auto' : 'none' }}
    >
      <div
        className={`absolute inset-0 flex flex-col overflow-hidden bg-foreground text-background transition-[opacity,transform] duration-500 ease-out ${
          open ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
        }`}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -right-20 h-96 w-96 rounded-full bg-primary/30 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-primary/20 blur-3xl"
        />

        <div className="relative flex items-center justify-between px-6 py-5">
          <span className="text-sm font-semibold tracking-tight">
            {siteName}
          </span>
          <button
            type="button"
            aria-label="Fermer le menu"
            onClick={onClose}
            className="grid h-11 w-11 place-items-center rounded-md text-background/80 transition-colors hover:bg-background/10 hover:text-background"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="relative flex flex-1 flex-col justify-center px-6 pb-6">
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-background/45">
            Navigation
          </span>
          <ul className="mt-5 flex flex-col gap-1">
            {navLinks.map((item, i) => (
              <li
                key={item.href}
                style={{
                  opacity: open ? 1 : 0,
                  transform: open ? 'translateY(0)' : 'translateY(12px)',
                  transition:
                    'opacity 500ms ease-out, transform 500ms ease-out',
                  transitionDelay: open ? `${180 + i * 60}ms` : '0ms',
                }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="group flex items-center justify-between gap-4 border-b border-background/10 py-4 text-4xl font-semibold tracking-tight text-background transition-colors duration-500 hover:text-primary"
                >
                  <span>{item.label}</span>
                  <ArrowRight
                    className="h-6 w-6 shrink-0 text-background/30 will-change-transform group-hover:-rotate-45 group-hover:text-primary"
                    style={{
                      transition:
                        'transform 600ms cubic-bezier(0.16, 1, 0.3, 1), color 500ms ease-out',
                    }}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div
          className="relative grid grid-cols-2 gap-3 border-t border-background/10 bg-background/[0.03] p-6 backdrop-blur"
          style={{
            opacity: open ? 1 : 0,
            transform: open ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 500ms ease-out, transform 500ms ease-out',
            transitionDelay: open ? `${180 + navLinks.length * 60}ms` : '0ms',
          }}
        >
          <Link
            href={secondaryUrl}
            onClick={onClose}
            className="inline-flex h-12 items-center justify-center rounded-md border border-background/25 bg-background/5 px-5 text-sm font-medium text-background transition-colors hover:bg-background/15"
          >
            {secondaryLabel}
          </Link>
          <Link
            href={primaryUrl}
            onClick={onClose}
            className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/85"
          >
            {primaryLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
