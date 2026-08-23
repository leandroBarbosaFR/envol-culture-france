'use client';

import { CaretLeft, CaretRight, X } from '@phosphor-icons/react/ssr';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { GalleryImageActions } from '@/components/gallery-image-actions';
import { MediaCardOverlay } from '@/components/media-card-overlay';

/**
 * Plain strings only: the URL helpers live next to the Sanity client, so
 * building them here would drag that whole client into the browser bundle.
 */
export type GalleryItem = {
  key: string;
  url: string;
  alt: string;
  caption: string;
  printUrl: string;
  downloadHref: string;
};

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  /*
    A native <dialog> opened with showModal() gives us the top layer, a focus
    trap, focus restore and Escape-to-close for free — all the parts a hand
    rolled modal usually gets wrong.
  */
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (index === null) {
      if (dialog.open) dialog.close();
    } else if (!dialog.open) {
      dialog.showModal();
    }
  }, [index]);

  // showModal() blocks interaction but not scrolling behind the backdrop.
  useEffect(() => {
    if (index === null) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [index]);

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (delta: number) =>
      setIndex((i) => (i === null ? i : (i + delta + items.length) % items.length)),
    [items.length],
  );

  const current = index === null ? null : items[index];

  return (
    <>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <li key={item.key}>
            <figure className="group relative aspect-square overflow-hidden rounded-lg bg-muted">
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Agrandir : ${item.caption}`}
                className="absolute inset-0 cursor-pointer"
              >
                <Image
                  src={item.url}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
                />
              </button>
              <MediaCardOverlay title={item.caption} reveal="corner" />
              <GalleryImageActions
                printUrl={item.printUrl}
                downloadHref={item.downloadHref}
                label={item.caption}
              />
            </figure>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        onClose={close}
        onClick={(event) => {
          // The dialog box itself is the backdrop area around the image.
          if (event.target === dialogRef.current) close();
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowRight') step(1);
          if (event.key === 'ArrowLeft') step(-1);
        }}
        aria-label="Photo agrandie"
        className="m-auto max-h-none max-w-none bg-transparent p-0 backdrop:bg-foreground/85"
      >
        {current && (
          <div className="relative flex flex-col items-center gap-4">
            <div className="relative h-[80vh] w-[92vw] max-w-5xl">
              <Image
                src={current.url}
                alt={current.alt}
                fill
                sizes="92vw"
                className="object-contain"
                priority
              />
            </div>

            <p className="text-sm text-background/90">{current.caption}</p>

            <button
              type="button"
              onClick={close}
              aria-label="Fermer"
              className="absolute -top-2 right-0 grid size-10 cursor-pointer place-items-center rounded-lg bg-background/10 text-background transition-colors hover:bg-background/20"
            >
              <X className="size-5" />
            </button>

            {items.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Photo précédente"
                  className="absolute top-1/2 left-2 grid size-11 -translate-y-1/2 cursor-pointer place-items-center rounded-lg bg-background/10 text-background transition-colors hover:bg-background/20"
                >
                  <CaretLeft className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Photo suivante"
                  className="absolute top-1/2 right-2 grid size-11 -translate-y-1/2 cursor-pointer place-items-center rounded-lg bg-background/10 text-background transition-colors hover:bg-background/20"
                >
                  <CaretRight className="size-5" />
                </button>
              </>
            )}
          </div>
        )}
      </dialog>
    </>
  );
}
