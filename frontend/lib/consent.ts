/**
 * Cookie consent storage (CNIL: choice kept 6 months max, re-openable any time).
 * Future scripts must check `hasConsent('analytics')` before setting anything.
 */

export const CONSENT_VERSION = 1;
export const CONSENT_STORAGE_KEY = 'envol-consent';
export const CONSENT_COOKIE = 'envol_consent';
export const CONSENT_MAX_AGE_DAYS = 180;
export const OPEN_SETTINGS_EVENT = 'envol:cookie-settings';
export const CONSENT_CHANGE_EVENT = 'envol:consent-change';

export type ConsentCategory = 'necessary' | 'analytics';

export type Consent = {
  version: number;
  date: string;
  categories: Record<ConsentCategory, boolean>;
};

export function parseConsent(raw: string | null): Consent | null {
  if (!raw) return null;
  try {
    const consent = JSON.parse(raw) as Consent;
    if (consent.version !== CONSENT_VERSION) return null;
    const age = Date.now() - Date.parse(consent.date);
    if (!Number.isFinite(age) || age > CONSENT_MAX_AGE_DAYS * 86_400_000) return null;
    return consent;
  } catch {
    return null;
  }
}

export function readConsent(): Consent | null {
  if (typeof window === 'undefined') return null;
  return parseConsent(window.localStorage.getItem(CONSENT_STORAGE_KEY));
}

export function writeConsent(categories: Partial<Record<ConsentCategory, boolean>>): Consent {
  const consent: Consent = {
    version: CONSENT_VERSION,
    date: new Date().toISOString(),
    categories: { necessary: true, analytics: Boolean(categories.analytics) },
  };
  window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent));
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(
    JSON.stringify(consent.categories),
  )}; Max-Age=${CONSENT_MAX_AGE_DAYS * 86_400}; Path=/; SameSite=Lax${secure}`;
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT, { detail: consent }));
  return consent;
}

export function hasConsent(category: ConsentCategory): boolean {
  if (category === 'necessary') return true;
  return Boolean(readConsent()?.categories[category]);
}

/** Re-opens the banner (used by the « Gérer les cookies » footer link). */
export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));
}

// ── External store for React (useSyncExternalStore) ─────────────────────────
// Snapshot = "<open-request-counter>|<stored consent json or empty>".
let openRequests = 0;

export function subscribeConsent(onChange: () => void): () => void {
  const onOpen = () => {
    openRequests += 1;
    onChange();
  };
  window.addEventListener(OPEN_SETTINGS_EVENT, onOpen);
  window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
  window.addEventListener('storage', onChange);
  return () => {
    window.removeEventListener(OPEN_SETTINGS_EVENT, onOpen);
    window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
    window.removeEventListener('storage', onChange);
  };
}

export function getConsentSnapshot(): string {
  return `${openRequests}|${window.localStorage.getItem(CONSENT_STORAGE_KEY) ?? ''}`;
}

/** Server / pre-hydration snapshot: "not mounted yet" → the banner renders nothing. */
export function getConsentServerSnapshot(): null {
  return null;
}
