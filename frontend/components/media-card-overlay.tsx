import { cn } from '@/lib/utils';

/**
 * The one hover treatment for image cards (activités, actualités). A band sits
 * over the top of the image carrying the title, and grows to fill the card on
 * hover to reveal the detail and the call to action.
 *
 * Shared on purpose: when each section rolled its own, the colour, easing and
 * call-to-action style drifted apart. Change it here and both stay in step.
 *
 * The 90% tint is the most transparent this can go: over a white photo it
 * leaves white text at 4.61:1, and 89% drops to 4.49 — under the 4.5 WCAG AA
 * floor. Lower it and the body copy stops being legible on pale images.
 */
export function MediaCardOverlay({
  title,
  meta,
  body,
  cta,
  /**
   * Resting height of the band: size it to the title for cards that stay
   * labelled at rest (activités), or `h-0` for image-only cards where the
   * whole panel wipes in on hover (actualités). Ignored when reveal is
   * 'corner'.
   */
  bandHeight = 'h-0',
  /**
   * 'band' wipes the panel down from the top edge. 'corner' opens it radially
   * out of the bottom-right corner — used by the gallery strip so it reads as
   * its own thing rather than a third copy of the same wipe.
   */
  reveal = 'band',
}: {
  title: string;
  meta?: string;
  body?: string;
  cta?: string;
  bandHeight?: string;
  reveal?: 'band' | 'corner';
}) {

  return (
    <div
      className={cn(
        'absolute inset-x-0 top-0 overflow-hidden bg-brand-deep/90',
        // Purely decorative: it must never intercept clicks meant for the
        // card underneath (the gallery opens a lightbox from there).
        'pointer-events-none',
        'motion-reduce:transition-none',
        reveal === 'corner'
          ? cn(
              // Written out in full, never assembled: Tailwind only generates
              // classes it can find as complete strings in the source.
              // circle() resolves against sqrt((w² + h²) / 2), so a square's
              // far corner is at ~141% and 150% guarantees full coverage.
              'bottom-0 [clip-path:circle(0%_at_100%_100%)]',
              'transition-[clip-path] duration-500 ease-out',
              'group-hover:[clip-path:circle(150%_at_100%_100%)]',
              'group-focus-visible:[clip-path:circle(150%_at_100%_100%)]',
              // No hover on touch, so the card would never reveal its detail.
              '[@media(hover:none)]:[clip-path:circle(150%_at_100%_100%)]',
            )
          : cn(
              'transition-[height] duration-500 ease-out group-hover:h-full',
              'group-focus-visible:h-full [@media(hover:none)]:h-full',
              bandHeight,
            ),
      )}
    >
      <div className="flex h-full flex-col p-5 text-background">
        <h3 className="font-heading text-lg font-medium leading-snug">{title}</h3>

        {/*
          Only the title rests in the band. Meta lives with the detail: a
          two-line title plus a meta line overflows the resting band on the
          landscape cards, and keeping both sections to title-only at rest is
          what makes them read as one system.
        */}
        <div className="mt-4 flex min-h-0 flex-1 flex-col opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 group-hover:delay-200 group-focus-visible:opacity-100 group-focus-visible:delay-200 motion-reduce:transition-none [@media(hover:none)]:opacity-100">
          {meta && <p className="text-sm text-background/70">{meta}</p>}
          {body && (
            <p className="mt-2 text-sm leading-relaxed text-background/85">{body}</p>
          )}
          {cta && (
            <span className="mt-auto w-fit border border-background/70 px-4 py-2 text-sm font-medium">
              {cta}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
