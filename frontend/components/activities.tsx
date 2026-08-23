import { ArrowRight } from '@phosphor-icons/react/ssr';
import { MediaCardOverlay } from '@/components/media-card-overlay';
import Image from 'next/image';
import Link from 'next/link';

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
    <section id="activities" className="">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
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
                className="group relative block aspect-[4/5] overflow-hidden rounded-lg bg-muted"
              >
                {activity.image?.asset?.url && (
                  <Image
                    src={activity.image.asset.url}
                    alt={activity.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
                  />
                )}

                <MediaCardOverlay
                  title={activity.name}
                  body={activity.tagline}
                  cta="Découvrir"
                  bandHeight="h-[34%]"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
