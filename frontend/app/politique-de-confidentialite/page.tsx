import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { LegalPage, fetchLegalPage } from '@/components/legal-page';

export async function generateMetadata(): Promise<Metadata> {
  const doc = await fetchLegalPage('politiqueConfidentialite');
  return {
    ...buildMetadata({ title: doc?.title ?? 'Politique de confidentialité', path: '/politique-de-confidentialite' }),
    robots: { index: false },
  };
}

export default function PolitiqueConfidentialitePage() {
  return <LegalPage id="politiqueConfidentialite" />;
}
