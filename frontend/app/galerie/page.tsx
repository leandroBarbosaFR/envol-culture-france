import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { MediaCardOverlay } from '@/components/media-card-overlay';
import { PageHeader } from '@/components/page-header';
import { formatFrenchDate, formatPhotoCount } from '@/lib/date';
import { sanityFetch } from '@/lib/sanity/live';
import { galeriePageQuery } from '@/lib/sanity/queries';

type Album = {
  _id: string;
  title: string;
  slug: string;
  date?: string;
  description?: string;
  photoCount?: number;
  cover?: { asset?: { url?: string } };
  coverAlt?: string;
};

/** An album with no cover and no photos would render as an empty grey box. */
function withCover(albums: Album[] | undefined): Album[] {
  return (albums ?? []).filter((album) => album.cover?.asset?.url);
}

export async function generateMetadata(): Promise<Metadata> {
  const data = (await sanityFetch({ query: galeriePageQuery })).data;
  return buildMetadata({
    title: data?.title ?? 'Galerie',
    description: data?.description,
    path: '/galerie',
    image: withCover(data?.albums)[0]?.cover?.asset?.url,
  });
}

export default async function GaleriePage() {
  const data = (await sanityFetch({ query: galeriePageQuery })).data;
  const albums = withCover(data?.albums);

  return (
    <>
      <PageHeader
        eyebrow={data?.eyebrow}
        title={data?.title ?? 'Galerie'}
        description={data?.description}
        crumbs={[{ href: '/galerie', label: 'Galerie' }]}
      />

      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          {albums.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Les albums photo seront bientôt mis en ligne.
            </p>
          ) : (
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {albums.map((album) => (
                <li key={album._id}>
                  <Link
                    href={`/galerie/${album.slug}`}
                    className="group relative block aspect-[3/2] overflow-hidden rounded-lg bg-muted"
                  >
                    <Image
                      src={album.cover!.asset!.url!}
                      alt={album.coverAlt ?? album.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
                    />
                    <MediaCardOverlay
                      title={album.title}
                      meta={[formatFrenchDate(album.date), formatPhotoCount(album.photoCount)]
                        .filter(Boolean)
                        .join(' · ')}
                      body={album.description}
                      cta="Voir l'album"
                      bandHeight="h-0"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
