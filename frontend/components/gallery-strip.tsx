import Image from 'next/image';
import Link from 'next/link';
import { CarouselRow } from '@/components/carousel-row';
import { ArrowRight } from '@phosphor-icons/react/ssr';
import { MediaCardOverlay } from '@/components/media-card-overlay';

type Photo = {
  _key: string;
  alt?: string;
  caption?: string;
  image?: { asset?: { url?: string } };
};

type GalleryStripProps = {
  eyebrow?: string;
  title?: string;
  linkLabel?: string;
  photos?: Photo[];
};

export function GalleryStrip({
  eyebrow,
  title,
  linkLabel,
  photos = [],
}: GalleryStripProps) {
  const shown = photos.filter((photo) => photo.image?.asset?.url);
  if (shown.length === 0) return null;

  // The `homeGallerySection` singleton may not exist yet; without these the
  // heading would render empty rather than merely unedited.
  const label = eyebrow ?? 'En images';
  const heading = title ?? 'La galerie';
  const link = linkLabel ?? 'Voir la galerie';

  return (
    <section id="gallery" className="bg-background">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-sm font-medium text-brand-deep">{label}</span>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">{heading}</h2>
          </div>
          <Link
            href="/galerie"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-deep hover:underline"
          >
            {link}
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <CarouselRow label="Galerie" className="mt-12">
        {shown.map((photo) => (
          <li key={photo._key} className="w-56 shrink-0 snap-start md:w-64">
            <Link
              href="/galerie"
              className="group relative block aspect-square overflow-hidden rounded-lg bg-muted"
            >
              <Image
                src={photo.image!.asset!.url!}
                alt={photo.alt ?? ''}
                fill
                sizes="256px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
              />
              <MediaCardOverlay
                title={photo.caption ?? photo.alt ?? 'Photo'}
                cta="Voir"
                reveal="corner"
              />
            </Link>
          </li>
        ))}
        </CarouselRow>
      </div>
    </section>
  );
}
