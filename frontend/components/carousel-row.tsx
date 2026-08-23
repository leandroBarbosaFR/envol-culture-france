'use client';

import { CaretLeft, CaretRight } from '@phosphor-icons/react/ssr';
import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Horizontal scroller whose arrows appear only when the row actually overflows;
 * a row that already fits shows no controls at all.
 *
 * Belongs inside the section's own container, directly under the heading. That
 * is what keeps the cards aligned with the title and lets the arrows anchor to
 * this row's own box — an earlier full-bleed version had to reconstruct the
 * container inset with `calc(100vw …)` just to find the card edges.
 */
const SCROLLER =
  'flex snap-x snap-mandatory gap-4 overflow-x-auto ' +
  // Native bars would sit under the cards; the arrows are the affordance.
  '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden';

// Same 2px radius as every other surface on the site — no round-button
// exception. Frosted rather than solid so it sits over artwork, but the tint
// stays light and the glyph dark, which survives both pale and dark photos.
const ARROW =
  'absolute top-1/2 z-10 hidden size-10 -translate-y-1/2 cursor-pointer place-items-center ' +
  'rounded-lg bg-background/70 text-foreground shadow-lg ring-1 ring-background/40 ' +
  'backdrop-blur-md transition hover:bg-background/90 disabled:pointer-events-none ' +
  'disabled:opacity-0 md:grid';

export function CarouselRow({
  children,
  label,
  className,
}: {
  children: ReactNode;
  label: string;
  className?: string;
}) {
  const ref = useRef<HTMLUListElement>(null);
  const [state, setState] = useState({ overflowing: false, atStart: true, atEnd: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      // 1px slack: sub-pixel layout makes exact comparisons flicker.
      const overflowing = el.scrollWidth > el.clientWidth + 1;
      setState({
        overflowing,
        atStart: el.scrollLeft <= 1,
        atEnd: el.scrollLeft + el.clientWidth >= el.scrollWidth - 1,
      });
    };

    // ResizeObserver fires once on observe, so the first measurement happens in
    // its callback rather than synchronously in this effect body.
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    for (const child of Array.from(el.children)) observer.observe(child);
    el.addEventListener('scroll', measure, { passive: true });

    return () => {
      observer.disconnect();
      el.removeEventListener('scroll', measure);
    };
  }, []);

  const step = (direction: -1 | 1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  return (
    <div className={`relative ${className ?? ''}`}>
      <ul ref={ref} className={SCROLLER}>
        {children}
      </ul>

      {state.overflowing && (
        <>
          <button
            type="button"
            onClick={() => step(-1)}
            disabled={state.atStart}
            aria-label={`${label} — précédent`}
            className={`${ARROW} left-2`}
          >
            <CaretLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            disabled={state.atEnd}
            aria-label={`${label} — suivant`}
            className={`${ARROW} right-2`}
          >
            <CaretRight className="size-5" />
          </button>
        </>
      )}
    </div>
  );
}
