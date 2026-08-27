import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/site';
import { sanityFetch } from '@/lib/sanity/live';
import { sitemapQuery } from '@/lib/sanity/queries';

type Entry = { slug: string; _updatedAt: string; images?: (string | null)[] };

type ChangeFrequency = MetadataRoute.Sitemap[number]['changeFrequency'];

/** Static routes, with a rough sense of how central each one is. */
const STATIC_ROUTES: Array<{ path: string; priority: number; changeFrequency: ChangeFrequency }> = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/about', priority: 0.7, changeFrequency: 'yearly' },
  { path: '/activites', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/actualites', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/galerie', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/tarifs', priority: 0.8, changeFrequency: 'yearly' },
  { path: '/horaires', priority: 0.8, changeFrequency: 'yearly' },
  { path: '/contact', priority: 0.7, changeFrequency: 'yearly' },
  { path: '/mentions-legales', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/politique-de-confidentialite', priority: 0.2, changeFrequency: 'yearly' },
];

/**
 * Google's image sitemap extension caps a URL at 1000 images, and rejects the
 * whole entry on a malformed one — so nulls from unpublished assets are dropped
 * rather than passed through.
 */
function imageUrls(entry: Entry): string[] | undefined {
  const urls = (entry.images ?? []).filter((url): url is string => Boolean(url)).slice(0, 1000);
  return urls.length > 0 ? urls : undefined;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data } = await sanityFetch({ query: sitemapQuery, stega: false });
  const now = new Date();

  const activities: Entry[] = data?.activities ?? [];
  const news: Entry[] = data?.news ?? [];
  const albums: Entry[] = data?.albums ?? [];

  /*
    The gallery index is a static route, but its content is the album list —
    so it dates from the newest album, not from the build. A build-stamped
    lastModified on every page tells Google nothing about what actually moved.
  */
  const galleryUpdatedAt = data?.galleryUpdatedAt
    ? new Date(data.galleryUpdatedAt)
    : now;

  return [
    ...STATIC_ROUTES.map((route) => ({
      url: absoluteUrl(route.path),
      lastModified: route.path === '/galerie' ? galleryUpdatedAt : now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...activities.map((a) => ({
      url: absoluteUrl(`/activites/${a.slug}`),
      lastModified: new Date(a._updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      images: imageUrls(a),
    })),
    ...news.map((n) => ({
      url: absoluteUrl(`/actualites/${n.slug}`),
      lastModified: new Date(n._updatedAt),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
      images: imageUrls(n),
    })),
    ...albums.map((a) => ({
      url: absoluteUrl(`/galerie/${a.slug}`),
      lastModified: new Date(a._updatedAt),
      // Albums gain photos after the event, so they are worth re-crawling.
      changeFrequency: 'monthly' as const,
      priority: 0.6,
      images: imageUrls(a),
    })),
  ];
}
