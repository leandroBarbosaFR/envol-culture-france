import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cardClass, cardHoverClass } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type Activity = {
  slug: string;
  name: string;
  tagline: string;
  image: { asset: { url: string } };
};

type ActivitiesProps = {
  eyebrow?: string;
  title?: string;
  linkLabel?: string;
  activities?: Activity[];
};

export function Activities({
  eyebrow,
  title,
  linkLabel,
  activities = [],
}: ActivitiesProps) {
  return (
    <section id="activities" className="border-t border-border bg-brand-soft/40">
      <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            {eyebrow && (
              <span className="text-sm font-medium text-brand-deep">{eyebrow}</span>
            )}
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">{title}</h2>
          </div>
          {linkLabel && (
            <Link
              href="/activites"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-deep hover:underline"
            >
              {linkLabel}
              <ArrowRight className="size-4" />
            </Link>
          )}
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {activities.map((activity) => (
            <li key={activity.slug}>
              <Link
                href={`/activites/${activity.slug}`}
                className={cn(cardClass, cardHoverClass, 'h-full')}
              >
                {activity.image?.asset?.url && (
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <Image
                      src={activity.image.asset.url}
                      alt={activity.name}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <h3 className="font-heading font-medium">{activity.name}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {activity.tagline}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand-deep">
                    Découvrir
                    <ArrowRight className="size-4" />
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
