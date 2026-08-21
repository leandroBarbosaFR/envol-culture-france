'use client';

import Link from 'next/link';
import { useState, useSyncExternalStore } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  getConsentServerSnapshot,
  getConsentSnapshot,
  parseConsent,
  subscribeConsent,
  writeConsent,
} from '@/lib/consent';

export type CookieBannerSettings = {
  title?: string | null;
  message?: string | null;
  necessaryDescription?: string | null;
  analyticsEnabled?: boolean | null;
  analyticsDescription?: string | null;
  acknowledgeLabel?: string | null;
  acceptLabel?: string | null;
  refuseLabel?: string | null;
  customizeLabel?: string | null;
  saveLabel?: string | null;
  policyLinkLabel?: string | null;
  manageLabel?: string | null;
} | null;

const DEFAULTS = {
  title: 'Cookies',
  message:
    "Ce site utilise uniquement des cookies strictement nécessaires à son fonctionnement. Aucun cookie publicitaire ni de mesure d'audience n'est déposé sans votre accord.",
  necessaryDescription:
    "Indispensables au fonctionnement du site (mémorisation de vos choix, connexion à l'espace adhérent). Ils ne peuvent pas être désactivés.",
  analyticsDescription:
    "Nous aident à comprendre comment le site est utilisé afin de l'améliorer. Données anonymisées.",
  acknowledgeLabel: "J'ai compris",
  acceptLabel: 'Tout accepter',
  refuseLabel: 'Tout refuser',
  customizeLabel: 'Personnaliser',
  saveLabel: 'Enregistrer mes choix',
  policyLinkLabel: 'Politique de confidentialité',
};

export function CookieConsent({ settings }: { settings: CookieBannerSettings }) {
  const t = (key: keyof typeof DEFAULTS) => settings?.[key] || DEFAULTS[key];
  // Consent mode only when an optional category is offered; otherwise a plain notice.
  const consentMode = Boolean(settings?.analyticsEnabled);

  // Client-only state (localStorage + "open settings" requests) without effects.
  const snapshot = useSyncExternalStore(subscribeConsent, getConsentSnapshot, getConsentServerSnapshot);

  // UI state scoped to the current "open request": reset automatically when re-opened.
  const [closedAt, setClosedAt] = useState(0);
  const [customizeFor, setCustomizeFor] = useState<{ req: number; value: boolean } | null>(null);
  const [analyticsChoice, setAnalyticsChoice] = useState<{ req: number; value: boolean } | null>(null);

  if (snapshot === null) return null; // server render / before hydration

  const sep = snapshot.indexOf('|');
  const openReq = Number(snapshot.slice(0, sep));
  const stored = parseConsent(snapshot.slice(sep + 1) || null);
  const open = !stored || openReq > closedAt;
  if (!open) return null;

  const customize = customizeFor?.req === openReq ? customizeFor.value : openReq > 0 && consentMode;
  const analytics =
    analyticsChoice?.req === openReq ? analyticsChoice.value : Boolean(stored?.categories.analytics);

  const decide = (value: boolean) => {
    writeConsent({ analytics: value });
    setClosedAt(openReq);
  };

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-message"
      className="fixed inset-x-4 bottom-4 z-50 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-full sm:max-w-md"
    >
      <Card className="p-5 shadow-sm">
        <h2 id="cookie-banner-title" className="font-heading text-base font-semibold">
          {t('title')}
        </h2>
        <p id="cookie-banner-message" className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {t('message')}
        </p>

        {consentMode && customize && (
          <ul className="mt-4 space-y-3 border-t border-border pt-4">
            <li className="flex gap-3">
              <input
                id="cookie-necessary"
                type="checkbox"
                checked
                disabled
                className="mt-1 size-4 shrink-0 accent-primary"
              />
              <label htmlFor="cookie-necessary" className="text-sm">
                <span className="font-medium">Cookies nécessaires</span>
                <span className="mt-0.5 block text-muted-foreground">{t('necessaryDescription')}</span>
              </label>
            </li>
            <li className="flex gap-3">
              <input
                id="cookie-analytics"
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalyticsChoice({ req: openReq, value: e.target.checked })}
                className="mt-1 size-4 shrink-0 accent-primary"
              />
              <label htmlFor="cookie-analytics" className="text-sm">
                <span className="font-medium">Mesure d&apos;audience</span>
                <span className="mt-0.5 block text-muted-foreground">{t('analyticsDescription')}</span>
              </label>
            </li>
          </ul>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {!consentMode ? (
            <Button onClick={() => decide(false)}>{t('acknowledgeLabel')}</Button>
          ) : customize ? (
            <Button onClick={() => decide(analytics)}>{t('saveLabel')}</Button>
          ) : (
            <>
              <Button onClick={() => decide(true)}>{t('acceptLabel')}</Button>
              <Button variant="outline" onClick={() => decide(false)}>
                {t('refuseLabel')}
              </Button>
              <Button variant="ghost" onClick={() => setCustomizeFor({ req: openReq, value: true })}>
                {t('customizeLabel')}
              </Button>
            </>
          )}
          <Link
            href="/politique-de-confidentialite"
            className="ml-auto text-sm font-medium text-brand-deep underline-offset-4 hover:underline"
          >
            {t('policyLinkLabel')}
          </Link>
        </div>
      </Card>
    </div>
  );
}
