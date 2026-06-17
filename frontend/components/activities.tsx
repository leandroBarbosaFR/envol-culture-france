import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { activities } from "@/lib/data";
import { ScrollRevealText } from "@/components/scroll-reveal-text";

export function Activities() {
  return (
    <section id="activities" className="border-t border-border bg-brand-soft/40">
      <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-sm font-medium text-brand-deep">
              Les activités
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              <ScrollRevealText text="Quatre disciplines, une même envie de partager" />
            </h2>
          </div>
          <Link
            href="/activites"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-brand-deep"
          >
            Voir toutes les activités
            <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {activities.map((activity) => (
            <li key={activity.slug}>
              <Link
                href={`/activites/${activity.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={activity.image}
                    alt={activity.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <h3 className="font-medium">{activity.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {activity.tagline}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand-deep">
                    Découvrir
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
