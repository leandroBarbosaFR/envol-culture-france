import type { MetadataRoute } from 'next';
import { absoluteUrl, siteUrl } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  // Preview/local builds must never be indexed, or they compete with production.
  const isProduction = siteUrl.startsWith('https://');

  return {
    rules: isProduction
      ? [
          {
            userAgent: '*',
            allow: '/',
            // Member-only screens have nothing to offer a search engine.
            disallow: ['/connexion', '/inscription'],
          },
        ]
      : [{ userAgent: '*', disallow: '/' }],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: siteUrl,
  };
}
