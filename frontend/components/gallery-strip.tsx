import Image from 'next/image';
import Link from 'next/link';
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
      <div className="mx-auto max-w-6xl px-4 pt-16 md:px-6 md:pt-20">
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
      </div>

      {/*
        Full-bleed scroller: the row runs past the container so the next photo
        peeks in from the edge, which is what signals it scrolls. Padding on the
        list keeps the first card aligned with the heading above, and the
        matching scroll-padding is what stops snap-start from scrolling straight
        past that padding and knocking the first card out of alignment.
      */}
      <ul className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-16 scroll-px-4 md:px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] md:pb-20 md:scroll-px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))]">
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
      </ul>
    </section>
  );
}
