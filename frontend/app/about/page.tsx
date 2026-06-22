import type { Metadata } from 'next';
import Image from 'next/image';
import { Heart, Users, Sparkles, Award } from 'lucide-react';
import { PageHeader } from '@/components/page-header';
import { client } from '@/lib/sanity/client';
import { aboutPageQuery } from '@/lib/sanity/queries';

const ICONS = [Heart, Users, Sparkles, Award];

export async function generateMetadata(): Promise<Metadata> {
  const data = await client.fetch(aboutPageQuery);
  return {
    title: `${data?.intro?.title ?? 'Qui sommes-nous'} · Envol Culture en France`,
    description: data?.intro?.description,
  };
}

export default async function AboutPage() {
  const data = await client.fetch(aboutPageQuery);

  return (
    <>
      <PageHeader
        eyebrow={data?.intro?.eyebrow}
        title={data?.intro?.title}
        description={data?.intro?.description}
        crumbs={[{ href: '/about', label: 'Qui sommes-nous' }]}
      />

      <section className="border-b border-border bg-background">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 md:grid-cols-12 md:px-6 md:py-24">
          <div className="md:col-span-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-muted shadow-xl shadow-primary/10">
              {data?.intro?.missionImage?.asset?.url && (
                <Image
                  src={data.intro.missionImage.asset.url}
                  alt="Atelier collectif"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              )}
            </div>
          </div>
          <div className="md:col-span-6">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              {data?.intro?.missionTitle}
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              {data?.intro?.missionParagraph1}
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              {data?.intro?.missionParagraph2}
            </p>

            <dl className="mt-8 grid grid-cols-3 gap-6 border-t border-border pt-6">
              {data?.stats?.map(
                ({ value, label }: { value: string; label: string }) => (
                  <div key={label}>
                    <dt className="text-3xl font-semibold tracking-tight">
                      {value}
                    </dt>
                    <dd className="mt-1 text-xs text-muted-foreground">
                      {label}
                    </dd>
                  </div>
                ),
              )}
            </dl>
          </div>
        </div>
      </section>

      {data?.values?.values?.length > 0 && (
      <section className="bg-brand-soft/40">
        <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-24">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            {data?.values?.valuesTitle}
          </h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {data?.values?.values?.map(
              (
                { title, body }: { title: string; body: string },
                index: number,
              ) => {
                const Icon = ICONS[index % ICONS.length];
                return (
                  <li
                    key={title}
                    className="flex gap-5 rounded-xl border border-border bg-card p-6"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand-deep">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-medium">{title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                        {body}
                      </p>
                    </div>
                  </li>
                );
              },
            )}
          </ul>
        </div>
      </section>
      )}
    </>
  );
}
