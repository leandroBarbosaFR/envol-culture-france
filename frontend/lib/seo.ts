import type { Metadata } from 'next';
import { absoluteUrl } from '@/lib/site';

const SITE_NAME = 'Envol Culture en France';

type PageMeta = {
  title: string;
  description?: string;
  /** Site-relative path, e.g. `/activites`. Drives the canonical URL. */
  path: string;
  /** Absolute image URL. Falls back to the site-wide share image. */
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
};

/**
 * One place that builds title, canonical, Open Graph and Twitter tags together.
 * Next.js does not derive `openGraph.title` from `title`, so setting them apart
 * is how pages end up sharing with the wrong headline.
 */
export function buildMetadata({
  title,
  description,
  path,
  image,
  type = 'website',
  publishedTime,
}: PageMeta): Metadata {
  const url = absoluteUrl(path);
  const images = image ? [{ url: image }] : undefined;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: SITE_NAME,
      locale: 'fr_FR',
      images,
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title,
      description,
      images,
    },
  };
}
