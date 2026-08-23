/**
 * Absolute origin of the site, needed for canonical URLs, Open Graph images,
 * robots.txt and the sitemap — all of which must be absolute.
 *
 * Resolution order:
 *  1. NEXT_PUBLIC_SITE_URL — set this to the real domain in production.
 *  2. VERCEL_PROJECT_PRODUCTION_URL — Vercel's stable production host, so
 *     preview deployments still point canonicals at production rather than at
 *     their own throwaway URL.
 *  3. localhost, for development.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, '');

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return `https://${vercel.replace(/\/+$/, '')}`;

  return 'http://localhost:3000';
}

export const siteUrl = resolveSiteUrl();

/** Absolute URL for a site-relative path. */
export function absoluteUrl(path = '/'): string {
  return new URL(path, `${siteUrl}/`).toString();
}
