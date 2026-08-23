import type { Metadata } from 'next';
import { LegacyHorairesTables } from '@/components/legacy-activity-tables';
import { TarifsHoraires, resolveTab } from '@/components/tarifs-horaires';
import { sanityFetch } from '@/lib/sanity/live';
import { horairesPageQuery, tarifsHorairesPageQuery } from '@/lib/sanity/queries';

export async function generateMetadata(): Promise<Metadata> {
  const data = (await sanityFetch({ query: tarifsHorairesPageQuery })).data;
  const tab = resolveTab(data, 'horaires');
  return {
    title: `${tab.title} · Envol Culture en France`,
    description: tab.description,
  };
}

export default async function HorairesPage() {
  const data = (await sanityFetch({ query: tarifsHorairesPageQuery })).data;
  const tab = resolveTab(data, 'horaires');
  // Transitional: until the CMS table is filled, keep showing the per-activity schedule.
  const legacy = tab.hasTable ? null : (await sanityFetch({ query: horairesPageQuery })).data;

  return (
    <TarifsHoraires
      active="horaires"
      data={data}
      fallback={<LegacyHorairesTables activities={legacy} />}
    />
  );
}
