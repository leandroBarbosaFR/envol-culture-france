'use client';

import { openCookieSettings } from '@/lib/consent';

/** Footer link that re-opens the cookie banner. */
export function CookieSettingsButton({ label }: { label: string }) {
  return (
    <button type="button" onClick={openCookieSettings} className="hover:text-foreground">
      {label}
    </button>
  );
}
