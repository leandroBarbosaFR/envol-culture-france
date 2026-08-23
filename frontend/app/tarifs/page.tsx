import type { Metadata } from 'next';
import { LegacyTarifsTables } from '@/components/legacy-activity-tables';
import { TarifsHoraires, resolveTab } from '@/components/tarifs-horaires';
import { sanityFetch } from '@/lib/sanity/live';
import { tarifsHorairesPageQuery, tarifsPageQuery } from '@/lib/sanity/queries';

export async function generateMetadata(): Promise<Metadata> {
  const data = (await sanityFetch({ query: tarifsHorairesPageQuery })).data;
  const tab = resolveTab(data, 'tarifs');
  return {
    title: `${tab.title} · Envol Culture en France`,
    description: tab.description,
  };
}

export default async function TarifsPage() {
  const data = (await sanityFetch({ query: tarifsHorairesPageQuery })).data;
  const tab = resolveTab(data, 'tarifs');
  // Transitional: until the CMS table is filled, keep showing the per-activity pricing.
  const legacy = tab.hasTable ? null : (await sanityFetch({ query: tarifsPageQuery })).data;

  return (
    <TarifsHoraires
      active="tarifs"
      data={data}
      fallback={<LegacyTarifsTables activities={legacy} />}
    />
  );
}
