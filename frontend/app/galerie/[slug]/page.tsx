import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from '@phosphor-icons/react/ssr';
import { GalleryGrid, type GalleryItem } from '@/components/gallery-grid';
import { MediaCardOverlay } from '@/components/media-card-overlay';
import { PageHeader } from '@/components/page-header';
import { formatFrenchDate, formatPhotoCount } from '@/lib/date';
import { buildMetadata } from '@/lib/seo';
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
  return buildMetadata({
    title: album.title,
    description: album.description,
    path: `/galerie/${slug}`,
    image: withImage(album.images)[0]?.image?.asset?.url,
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

  return (
    <>
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
