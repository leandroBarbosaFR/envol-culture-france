import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { LegacyHorairesTables } from '@/components/legacy-activity-tables';
import { TarifsHoraires, resolveTab } from '@/components/tarifs-horaires';
import { sanityFetch } from '@/lib/sanity/live';
import { horairesPageQuery, tarifsHorairesPageQuery } from '@/lib/sanity/queries';

export async function generateMetadata(): Promise<Metadata> {
  const data = (await sanityFetch({ query: tarifsHorairesPageQuery })).data;
  const tab = resolveTab(data, 'horaires');
  return buildMetadata({
    title: tab.title,
    description: tab.description,
    path: '/horaires',
  });
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
