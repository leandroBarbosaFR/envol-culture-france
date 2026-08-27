import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/site';
import { sanityFetch } from '@/lib/sanity/live';
import { sitemapQuery } from '@/lib/sanity/queries';

type Entry = { slug: string; _updatedAt: string };

/** Static routes, with a rough sense of how central each one is. */
const STATIC_ROUTES: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }> = [
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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data } = await sanityFetch({ query: sitemapQuery, stega: false });
  const now = new Date();

  const activities: Entry[] = data?.activities ?? [];
  const news: Entry[] = data?.news ?? [];
  const albums: Entry[] = data?.albums ?? [];

  return [
    ...STATIC_ROUTES.map((route) => ({
      url: absoluteUrl(route.path),
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...activities.map((a) => ({
      url: absoluteUrl(`/activites/${a.slug}`),
      lastModified: new Date(a._updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...news.map((n) => ({
      url: absoluteUrl(`/actualites/${n.slug}`),
      lastModified: new Date(n._updatedAt),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
    ...albums.map((a) => ({
      url: absoluteUrl(`/galerie/${a.slug}`),
      lastModified: new Date(a._updatedAt),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    })),
  ];
}
