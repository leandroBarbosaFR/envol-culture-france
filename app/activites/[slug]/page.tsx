import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { activities, schedule, tarifs, type ActivitySlug } from "@/lib/data";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return activities.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const activity = activities.find((a) => a.slug === slug);
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
  const activity = activities.find((a) => a.slug === (slug as ActivitySlug));
  if (!activity) notFound();

  const activitySchedule = schedule.filter((s) => s.category === activity.slug);
  const activityTarifs = tarifs.filter((t) => t.category === activity.slug);

  return (
    <>
      <PageHeader
        eyebrow={activity.tagline}
        title={activity.name}
        description={activity.description}
        crumbs={[
          { href: "/activites", label: "Activités" },
          { href: `/activites/${activity.slug}`, label: activity.name },
        ]}
      />

      <section className="bg-background">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 md:grid-cols-12 md:px-6 md:py-20">
          <div className="md:col-span-7">
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border bg-muted shadow-xl shadow-primary/10">
              <Image
                src={activity.image}
                alt={activity.name}
                fill
                sizes="(min-width: 768px) 60vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
          <div className="md:col-span-5">
            <h2 className="text-2xl font-semibold tracking-tight">
              Ce qu&apos;il faut savoir
            </h2>
            <ul className="mt-5 space-y-3">
              {activity.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-sm">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-soft text-brand-deep">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-muted-foreground leading-relaxed">
                    {h}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {activitySchedule.length > 0 ? (
        <section className="border-t border-border bg-brand-soft/40">
          <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Horaires
            </h2>
            <div className="mt-8 overflow-hidden rounded-xl border border-border bg-card">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-primary/15 text-left">
                    <tr>
                      <Th>Cours</Th>
                      <Th>Jour</Th>
                      <Th>Horaire</Th>
                      <Th>Lieu</Th>
                      <Th>Professeur</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {activitySchedule.map((s, i) => (
                      <tr
                        key={`${s.activity}-${s.day}-${s.time}-${i}`}
                        className="border-t border-border"
                      >
                        <Td className="font-medium">{s.activity}</Td>
                        <Td>{s.day}</Td>
                        <Td>{s.time}</Td>
                        <Td>{s.place}</Td>
                        <Td>{s.teacher}</Td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {activityTarifs.length > 0 ? (
        <section className="border-t border-border bg-background">
          <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Tarifs
            </h2>
            <div className="mt-8 overflow-hidden rounded-xl border border-border bg-card">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-primary/15 text-left">
                    <tr>
                      <Th>Formule</Th>
                      <Th>Durée hebdomadaire</Th>
                      <Th>Tarif</Th>
                      <Th>Catégorie d&apos;âge</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {activityTarifs.map((t, i) => (
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
      ) : null}

      <section className="border-t border-border bg-background">
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
          <Link
            href="/activites"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour aux activités
          </Link>
        </div>
      </section>
    </>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-foreground/70">
      {children}
    </th>
  );
}

function Td({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <td className={`px-4 py-3 text-foreground/80 ${className}`}>{children}</td>
  );
}
