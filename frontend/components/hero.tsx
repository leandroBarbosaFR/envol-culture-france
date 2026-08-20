'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const SLIDE_DURATION_MS = 10000;

type Slide = {
  src: string;
  alt: string;
  caption: string;
};

type HeroData = {
  titleLine1?: string;
  titleLine2?: string;
  subtitle?: string;
  primaryButtonLabel?: string;
  primaryButtonUrl?: string;
  secondaryButtonLabel?: string;
  secondaryButtonUrl?: string;
  slides?: {
    image: { asset: { url: string } };
    alt: string;
    caption: string;
  }[];
};

/** CSS-only fade-up on load (tw-animate-css): works without JS and in background tabs. */
const REVEAL = 'animate-in fade-in slide-in-from-bottom-2 fill-mode-both duration-700 ease-out';

function ProgressBar({ duration }: { duration: number }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setProgress(100));
    });
    return () => cancelAnimationFrame(id);
  }, []);
  return (
    <div className="h-0.5 w-full overflow-hidden bg-white/20">
      <div
        className="h-full bg-white"
        style={{
          width: `${progress}%`,
          transitionProperty: 'width',
          transitionDuration: `${duration}ms`,
          transitionTimingFunction: 'linear',
        }}
      />
    </div>
  );
}

export function Hero({ data }: { data?: HeroData }) {
  const titleLine1 = data?.titleLine1 ?? 'Laissez votre créativité';
  const titleLine2 = data?.titleLine2 ?? "s'exprimer";
  const subtitle = data?.subtitle ?? '';
  const primaryLabel = data?.primaryButtonLabel ?? 'Découvrir les activités';
  const primaryUrl = data?.primaryButtonUrl ?? '/activites';
  const secondaryLabel = data?.secondaryButtonLabel ?? 'En savoir plus';
  const secondaryUrl = data?.secondaryButtonUrl ?? '/about';
  const slides: Slide[] =
    data?.slides
      ?.filter((s) => s.image?.asset?.url)
      .map((s) => ({
        src: s.image.asset.url,
        alt: s.alt ?? '',
        caption: s.caption ?? '',
      })) ?? [];

  const [plugins] = useState(() => [
    Autoplay({
      delay: SLIDE_DURATION_MS,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
    }),
  ]);

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on('select', onSelect);
    onSelect();
    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  return (
    <section
      id="top"
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-foreground text-white"
    >
      <div className="absolute inset-0">
        <Carousel
          opts={{ loop: true }}
          plugins={plugins}
          setApi={setApi}
          className="h-full"
        >
          <CarouselContent className="h-[100svh] min-h-[640px] ml-0">
            {slides.map((slide, index) => (
              <CarouselItem
                key={slide.src}
                className="relative h-[100svh] min-h-[640px] pl-0"
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority={index === 0}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Photo treatment: darken so white text stays legible on any slide. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/25"
      />

      <div className="relative z-10 flex h-full flex-col">
        <div className="mt-auto px-4 pb-16 md:px-6 md:pb-20">
          <div className="mx-auto max-w-6xl">
            <h1 className={cn(REVEAL, 'max-w-4xl text-5xl font-semibold leading-[1.1] md:text-6xl lg:text-7xl')}>
              {titleLine1} <span className="text-brand">{titleLine2}</span>
            </h1>
            {subtitle && (
              <p className={cn(REVEAL, 'delay-150 mt-5 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg')}>
                {subtitle}
              </p>
            )}
            <div className={cn(REVEAL, 'delay-300 mt-8 flex flex-wrap gap-3')}>
              <Link href={primaryUrl} className={buttonVariants({ size: 'lg' })}>
                {primaryLabel}
              </Link>
              <Link
                href={secondaryUrl}
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'lg' }),
                  'border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white',
                )}
              >
                {secondaryLabel}
              </Link>
            </div>

            {slides.length > 0 && (
              <div className="mt-10 flex items-center gap-4">
                <div className="max-w-xs flex-1">
                  <ProgressBar key={current} duration={SLIDE_DURATION_MS} />
                </div>
                <span className="text-xs tabular-nums text-white/70">
                  {String(current + 1).padStart(2, '0')} /{' '}
                  {String(slides.length).padStart(2, '0')}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
