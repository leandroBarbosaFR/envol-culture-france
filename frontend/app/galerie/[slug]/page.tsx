import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from '@phosphor-icons/react/ssr';
import { GalleryGrid, type GalleryItem } from '@/components/gallery-grid';
import { MediaCardOverlay } from '@/components/media-card-overlay';
import { PageHeader } from '@/components/page-header';
import { formatFrenchDate, formatPhotoCount } from '@/lib/date';
import { JsonLd } from '@/components/json-ld';
import { buildMetadata } from '@/lib/seo';
import { absoluteUrl } from '@/lib/site';
import { client } from '@/lib/sanity/client';
import { downloadUrl, printableUrl, toFileName } from '@/lib/sanity/image';
import { sanityFetch } from '@/lib/sanity/live';
import { galleryAlbumBySlugQuery, galleryAlbumSlugsQuery } from '@/lib/sanity/queries';

type Params = { slug: string };

type Photo = {
  _key: string;
  alt?: string;
  caption?: string;
  image?: { asset?: { url?: string } };
};

type OtherAlbum = {
  _id: string;
  title: string;
  slug: string;
  date?: string;
  photoCount?: number;
  cover?: { asset?: { url?: string } };
};

/** Drops entries whose image was never uploaded, so the grid has no holes. */
function withImage(images: Photo[] | undefined): Photo[] {
  return (images ?? []).filter((photo) => photo.image?.asset?.url);
}

/** Stands in for an empty album description, in the page's own words. */
function albumSummary(title: string, date: string | undefined, count: number): string {
  const when = formatFrenchDate(date);
  const photos = formatPhotoCount(count);
  return [
    `${photos ?? 'Les photos'} de « ${title} »`,
    when ? `du ${when}` : null,
    '— association Envol Culture en France, Roquefort-la-Bédoule.',
  ]
    .filter(Boolean)
    .join(' ');
}

export async function generateStaticParams(): Promise<Params[]> {
  const albums = await client.withConfig({ useCdn: false }).fetch(galleryAlbumSlugsQuery);
  return albums.map(({ slug }: { slug: string }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { data: album } = await sanityFetch({
    query: galleryAlbumBySlugQuery,
    params: { slug },
  });
  if (!album) return {};
  const photos = withImage(album.images);
  return buildMetadata({
    title: album.title,
    // An album often carries no description. Rather than ship a page with no
    // meta description at all, describe what is actually on it.
    description: album.description || albumSummary(album.title, album.date, photos.length),
    path: `/galerie/${slug}`,
    image: photos[0]?.image?.asset?.url,
  });
}

export default async function GalleryAlbumPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const { data: album } = await sanityFetch({
    query: galleryAlbumBySlugQuery,
    params: { slug },
  });
  if (!album) notFound();

  const photos = withImage(album.images);
  const items: GalleryItem[] = photos.map((photo) => {
    const url = photo.image!.asset!.url!;
    const caption = photo.caption ?? photo.alt ?? 'Photo';
    return {
      key: photo._key,
      url,
      alt: photo.alt ?? '',
      caption,
      printUrl: printableUrl(url),
      downloadHref: downloadUrl(url, toFileName(photo.caption ?? photo.alt)),
    };
  });

  const eyebrow = [formatFrenchDate(album.date), formatPhotoCount(photos.length)]
    .filter(Boolean)
    .join(' · ');

  /*
    Google Images cannot index what it only sees through Next's image
    optimiser, so every photo is listed here by its crawlable CDN URL, with
    the alt text as its description. Same URLs as the image sitemap.
  */
  const gallery = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: album.title,
    description: album.description || albumSummary(album.title, album.date, photos.length),
    url: absoluteUrl(`/galerie/${album.slug}`),
    datePublished: album.date || undefined,
    isPartOf: {
      '@type': 'CollectionPage',
      name: 'Galerie',
      url: absoluteUrl('/galerie'),
    },
    associatedMedia: items.map((item) => ({
      '@type': 'ImageObject',
      contentUrl: item.url,
      name: item.caption,
      description: item.alt || item.caption,
    })),
  };

  return (
    <>
      <JsonLd data={gallery} />
      <PageHeader
        eyebrow={eyebrow || undefined}
        title={album.title}
        description={album.description}
        crumbs={[
          { href: '/galerie', label: 'Galerie' },
          { href: `/galerie/${album.slug}`, label: album.title },
        ]}
      />

      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          {photos.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Les photos de cet album seront bientôt mises en ligne.
            </p>
          ) : (
            <GalleryGrid items={items} />
          )}

          <div className="mt-12 border-t border-border pt-8">
            <Link
              href="/galerie"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="size-4" />
              Tous les albums
            </Link>
          </div>
        </div>
      </section>

      {album.otherAlbums?.length > 0 && (
        <section className="border-t border-border bg-brand-soft/40">
          <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
            <h2 className="text-xl font-semibold">Autres albums</h2>
            <ul className="mt-6 grid gap-6 md:grid-cols-3">
              {album.otherAlbums.map((other: OtherAlbum) => (
                <li key={other._id}>
                  <Link
                    href={`/galerie/${other.slug}`}
                    className="group relative block aspect-[3/2] overflow-hidden rounded-lg bg-muted"
                  >
                    {other.cover?.asset?.url && (
                      <Image
                        src={other.cover.asset.url}
                        alt={other.title}
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
                      />
                    )}
                    <MediaCardOverlay
                      title={other.title}
                      meta={[formatFrenchDate(other.date), formatPhotoCount(other.photoCount)]
                        .filter(Boolean)
                        .join(' · ')}
                      cta="Voir l'album"
                      reveal="corner"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
