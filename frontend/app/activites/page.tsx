import { MediaCardOverlay } from '@/components/media-card-overlay';
import { PageHeader } from '@/components/page-header';
import { sanityFetch } from '@/lib/sanity/live';
import { activitiesPageQuery } from '@/lib/sanity/queries';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

type Activity = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: { asset: { url: string } };
};

export async function generateMetadata(): Promise<Metadata> {
  const data = (await sanityFetch({ query: activitiesPageQuery })).data;
  return {
    title: `${data?.title ?? 'Activités'} · Envol Culture en France`,
    description: data?.description,
  };
}

export default async function ActivitesPage() {
  const data = (await sanityFetch({ query: activitiesPageQuery })).data;

  return (
    <>
      <PageHeader
        eyebrow={data?.eyebrow}
        title={data?.title}
        description={data?.description}
        crumbs={[{ href: '/activites', label: 'Activités' }]}
      />

      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {data?.activities?.map((activity: Activity) => (
              <li key={activity.slug}>
                <Link
                  href={`/activites/${activity.slug}`}
                  className="group relative block aspect-[4/5] overflow-hidden rounded-lg bg-muted"
                >
                  {activity.image?.asset?.url && (
                    <Image
                      src={activity.image.asset.url}
                      alt={activity.name}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
                      priority
                    />
                  )}
                  <MediaCardOverlay
                    title={activity.name}
                    meta={activity.tagline}
                    body={activity.description}
                    cta="Découvrir"
                    bandHeight="h-[34%]"
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
