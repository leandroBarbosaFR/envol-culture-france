import { MediaCardOverlay } from '@/components/media-card-overlay';
import { PageHeader } from '@/components/page-header';
import { sanityFetch } from '@/lib/sanity/live';
import { actualitesPageQuery } from '@/lib/sanity/queries';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

type NewsPost = {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image: { asset: { url: string } };
};

export async function generateMetadata(): Promise<Metadata> {
  const data = (await sanityFetch({ query: actualitesPageQuery })).data;
  return {
    title: `${data?.title ?? 'Actualités'} · Envol Culture en France`,
    description: data?.description,
  };
}

export default async function ActualitesPage() {
  const data = (await sanityFetch({ query: actualitesPageQuery })).data;

  return (
    <>
      <PageHeader
        eyebrow={data?.eyebrow}
        title={data?.title}
        description={data?.description}
        crumbs={[{ href: '/actualites', label: 'Actualités' }]}
      />

      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data?.posts?.map((post: NewsPost) => (
              <li key={post.slug}>
                <Link
                  href={`/actualites/${post.slug}`}
                  className="group relative block aspect-[3/2] overflow-hidden rounded-lg bg-muted"
                >
                  {post.image?.asset?.url && (
                    <Image
                      src={post.image.asset.url}
                      alt={post.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
                    />
                  )}
                  <MediaCardOverlay
                    title={post.title}
                    meta={[post.category, post.date].filter(Boolean).join(' · ')}
                    body={post.excerpt}
                    cta="Lire l'article"
                    bandHeight="h-0"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
