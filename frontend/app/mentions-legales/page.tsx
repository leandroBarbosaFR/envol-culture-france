import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { LegalPage, fetchLegalPage } from '@/components/legal-page';

export async function generateMetadata(): Promise<Metadata> {
  const doc = await fetchLegalPage('mentionsLegales');
  return {
    ...buildMetadata({ title: doc?.title ?? 'Mentions légales', path: '/mentions-legales' }),
    robots: { index: false },
  };
}

export default function MentionsLegalesPage() {
  return <LegalPage id="mentionsLegales" />;
}
