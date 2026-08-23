'use client';

import { withCurrentYear } from '@/lib/copyright';
import { useSyncExternalStore } from 'react';

/** The year never changes under a mounted page, so there is nothing to watch. */
const subscribe = () => () => {};
const getYear = () => new Date().getFullYear();

/**
 * Every route is prerendered as static HTML, so a year resolved on the server
 * is really the *build* year. The server snapshot keeps the prerendered markup
 * (and no-JS visitors) sensible, then React swaps in the client snapshot after
 * hydration — so a build still being served after New Year's Eve stays correct.
 */
export function SiteCopyright({ template }: { template: string }) {
  const year = useSyncExternalStore(subscribe, getYear, getYear);

  return <span>{withCurrentYear(template, year)}</span>;
}
