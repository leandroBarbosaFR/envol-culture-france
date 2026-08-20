import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Check } from 'lucide-react';
import { PageHeader } from '@/components/page-header';
import { hasTable } from '@/components/rich-content';
import { buttonVariants } from '@/components/ui/button';
import { client } from '@/lib/sanity/client';
import {
  activityBySlugQuery,
  activitySlugsQuery,
  tarifsHorairesPageQuery,
} from '@/lib/sanity/queries';

type Params = { slug: string };

type ScheduleItem = {
  activity: string;
  day: string;
  time: string;
  duration: string;
  place: string;
  teacher: string;
};

type TarifItem = {
  activity: string;
  weekly: string;
  price: string;
  age: string;
};

export async function generateStaticParams(): Promise<Params[]> {
  const activities = await client.fetch(activitySlugsQuery);
  return activities.map(({ slug }: { slug: string }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const activity = await client.fetch(activityBySlugQuery, { slug });
  if (!activity) return {};
  return {
    title: `${activity.name} · Envol Culture en France`,
    description: activity.description,
  };
}

export default async function ActivityPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const [activity, tarifsHoraires] = await Promise.all([
    client.fetch(activityBySlugQuery, { slug }),
    client.fetch(tarifsHorairesPageQuery),
  ]);
  if (!activity) notFound();

  // Once the « Tarifs & Horaires » tables exist they are the single source of
  // truth: link to them instead of repeating per-activity lists here.
  const horairesTable = hasTable(tarifsHoraires?.horairesContent);
  const tarifsTable = hasTable(tarifsHoraires?.tarifsContent);

  return (
    <>
      <PageHeader
        eyebrow={activity.tagline}
        title={activity.name}
        description={activity.description}
        crumbs={[
          { href: '/activites', label: 'Activités' },
          { href: `/activites/${activity.slug}`, label: activity.name },
        ]}
      />

      <section className="bg-background">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 md:grid-cols-12 md:px-6 md:py-20">
          <div className="md:col-span-7">
            <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-border bg-muted">
              {activity.image?.asset?.url && (
                <Image
                  src={activity.image.asset.url}
                  alt={activity.name}
                  fill
                  sizes="(min-width: 768px) 60vw, 100vw"
                  className="object-cover"
                  priority
                />
              )}
            </div>
          </div>
          {activity.highlights?.length > 0 && (
            <div className="md:col-span-5">
              <h2 className="text-2xl font-semibold">
                Ce qu&apos;il faut savoir
              </h2>
              <ul className="mt-5 space-y-3">
                {activity.highlights.map((h: string) => (
                  <li key={h} className="flex gap-3 text-sm">
                    <span className="grid size-6 shrink-0 place-items-center rounded-md bg-brand-soft text-brand-deep">
                      <Check className="size-3.5" />
                    </span>
                    <span className="text-muted-foreground leading-relaxed">
                      {h}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {!horairesTable && activity.scheduleItems?.length > 0 && (
        <section className="border-t border-border bg-brand-soft/40">
          <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
            <h2 className="text-2xl font-semibold md:text-3xl">
              Horaires
            </h2>
            <div className="mt-8 overflow-hidden rounded-lg border border-border bg-card">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-brand-soft text-left">
                    <tr>
                      <Th>Cours</Th>
                      <Th>Jour</Th>
                      <Th>Horaire</Th>
                      <Th>Lieu</Th>
                      <Th>Professeur</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {activity.scheduleItems.map(
                      (s: ScheduleItem, i: number) => (
                        <tr
                          key={`${s.activity}-${s.day}-${i}`}
                          className="border-t border-border"
                        >
                          <Td className="font-medium">{s.activity}</Td>
                          <Td>{s.day}</Td>
                          <Td>{s.time}</Td>
                          <Td>{s.place}</Td>
                          <Td>{s.teacher}</Td>
                        </tr>
                      ),
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}

      {!tarifsTable && activity.tarifItems?.length > 0 && (
        <section className="border-t border-border bg-background">
          <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
            <h2 className="text-2xl font-semibold md:text-3xl">
              Tarifs
            </h2>
            <div className="mt-8 overflow-hidden rounded-lg border border-border bg-card">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-brand-soft text-left">
                    <tr>
                      <Th>Formule</Th>
                      <Th>Durée hebdomadaire</Th>
                      <Th>Tarif</Th>
                      <Th>Catégorie d&apos;âge</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {activity.tarifItems.map((t: TarifItem, i: number) => (
                      <tr
                        key={`${t.activity}-${t.weekly}-${i}`}
                        className="border-t border-border"
                      >
                        <Td className="font-medium">{t.activity}</Td>
                        <Td>{t.weekly}</Td>
                        <Td>{t.price}</Td>
                        <Td>{t.age}</Td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}

      {(horairesTable || tarifsTable) && (
        <section className="border-t border-border bg-brand-soft/40">
          <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
            <h2 className="text-2xl font-semibold md:text-3xl">
              Horaires et tarifs
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground leading-relaxed">
              Retrouvez le planning complet et les tarifs de toutes les
              activités de l&apos;association.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {horairesTable && (
                <Link href="/horaires" className={buttonVariants()}>
                  Voir les horaires
                </Link>
              )}
              {tarifsTable && (
                <Link
                  href="/tarifs"
                  className={buttonVariants({ variant: 'outline' })}
                >
                  Voir les tarifs
                </Link>
              )}
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-border bg-background">
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
          <Link
            href="/activites"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Retour aux activités
          </Link>
        </div>
      </section>
    </>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-3 text-sm font-semibold text-foreground">
      {children}
    </th>
  );
}

function Td({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <td className={`px-4 py-3 text-foreground/80 ${className}`}>{children}</td>
  );
}
