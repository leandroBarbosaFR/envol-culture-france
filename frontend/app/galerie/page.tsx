import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { GalleryGrid, type GalleryItem } from '@/components/gallery-grid';
import { PageHeader } from '@/components/page-header';
import { downloadUrl, printableUrl, toFileName } from '@/lib/sanity/image';
import { sanityFetch } from '@/lib/sanity/live';
import { galeriePageQuery } from '@/lib/sanity/queries';

type Photo = {
  _key: string;
  alt?: string;
  caption?: string;
  image?: { asset?: { url?: string } };
};

/** Drops entries whose image was never uploaded, so the grid has no holes. */
function withImage(images: Photo[] | undefined): Photo[] {
  return (images ?? []).filter((photo) => photo.image?.asset?.url);
}

export async function generateMetadata(): Promise<Metadata> {
  const data = (await sanityFetch({ query: galeriePageQuery })).data;
  return buildMetadata({
    title: data?.title ?? 'Galerie',
    description: data?.description,
    path: '/galerie',
    image: data?.images?.[0]?.image?.asset?.url,
  });
}

export default async function GaleriePage() {
  const data = (await sanityFetch({ query: galeriePageQuery })).data;
  const photos = withImage(data?.images);
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
          {photos.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Les photos seront bientôt mises en ligne.
            </p>
          ) : (
            <GalleryGrid items={items} />
          )}
        </div>
      </section>
    </>
  );
}
