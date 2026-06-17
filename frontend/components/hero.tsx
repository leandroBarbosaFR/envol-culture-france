"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { LoadRevealText } from "@/components/load-reveal-text";

const SLIDE_DURATION_MS = 10000;

function Reveal({
  loaded,
  delay = 0,
  as: Tag = "span",
  className = "",
  children,
}: {
  loaded: boolean;
  delay?: number;
  as?: "span" | "div" | "p" | "dl";
  className?: string;
  children: React.ReactNode;
}) {
  const displayClass = Tag === "span" ? "inline-block" : "";
  return (
    <Tag
      className={`${displayClass} will-change-transform ${className}`}
      style={{
        opacity: loaded ? 1 : 0,
        transform: loaded ? "translateY(0)" : "translateY(12px)",
        transition: "opacity 700ms ease-out, transform 700ms ease-out",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </Tag>
  );
}

function ProgressBar({ duration }: { duration: number }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setProgress(100));
    });
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="h-1 w-full overflow-hidden rounded-full bg-white/15">
      <div
        className="h-full rounded-full bg-white"
        style={{
          width: `${progress}%`,
          transitionProperty: "width",
          transitionDuration: `${duration}ms`,
          transitionTimingFunction: "linear",
        }}
      />
    </div>
  );
}

const slides = [
  {
    src: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=2400&q=80",
    alt: "Atelier de musique avec des enfants",
    caption: "Musique",
  },
  {
    src: "https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=2400&q=80",
    alt: "Cours de danse",
    caption: "Danse",
  },
  {
    src: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=2400&q=80",
    alt: "Atelier de peinture",
    caption: "Peinture",
  },
  {
    src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=2400&q=80",
    alt: "Cours de langues",
    caption: "Langues",
  },
];

export function Hero() {
  const autoplay = useRef(
    Autoplay({
      delay: SLIDE_DURATION_MS,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
    })
  );
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <section
      id="top"
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-black text-white"
    >
      <div className="absolute inset-0">
        <Carousel
          opts={{ loop: true }}
          plugins={[autoplay.current]}
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

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/55 via-black/15 to-transparent"
      />

      <div className="relative z-10 flex h-full flex-col">
        <div className="mt-auto px-6 pb-16 md:px-10 md:pb-20">
          <div className="mx-auto max-w-6xl">
            <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
              <LoadRevealText
                text="Laissez votre créativité"
                staggerMs={28}
                duration={650}
              />{" "}
              <span className="bg-gradient-to-r from-primary to-white bg-clip-text text-transparent">
                <LoadRevealText
                  text="s'exprimer"
                  startDelay={650}
                  staggerMs={28}
                  duration={650}
                />
              </span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
              <LoadRevealText
                text="Envol est un acteur du développement culturel, sportif et social. Musique, danse, peinture et langues, pour tous, du débutant au confirmé."
                startDelay={1100}
                staggerMs={6}
                duration={500}
              />
            </p>
            <Reveal
              as="div"
              loaded={loaded}
              delay={1400}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link
                href="/activites"
                className="inline-flex h-12 items-center justify-center rounded-md bg-white px-6 text-sm font-medium text-black transition-colors hover:bg-white/90"
              >
                Découvrir les activités
              </Link>
              <Link
                href="/about"
                className="inline-flex h-12 items-center justify-center rounded-md border border-white/30 bg-white/10 px-6 text-sm font-medium text-white backdrop-blur transition-colors hover:bg-white/20"
              >
                En savoir plus
              </Link>
            </Reveal>

            <div className="mt-10 flex items-center gap-4">
              <div className="flex-1 max-w-xs">
                <ProgressBar key={current} duration={SLIDE_DURATION_MS} />
              </div>
              <span className="text-xs uppercase tracking-[0.18em] text-white/65">
                {String(current + 1).padStart(2, "0")} /{" "}
                {String(slides.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
