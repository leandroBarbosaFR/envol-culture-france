'use client';

import { openCookieSettings } from '@/lib/consent';

/** Footer link that re-opens the cookie banner. */
export function CookieSettingsButton({ label }: { label: string }) {
  return (
    <button type="button" onClick={openCookieSettings} className="cursor-pointer hover:text-background">
      {label}
    </button>
  );
}
