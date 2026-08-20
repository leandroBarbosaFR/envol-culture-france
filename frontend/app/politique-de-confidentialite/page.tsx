import type { Metadata } from 'next';
import { LegalPage, fetchLegalPage } from '@/components/legal-page';

export async function generateMetadata(): Promise<Metadata> {
  const doc = await fetchLegalPage('politiqueConfidentialite');
  return {
    title: `${doc?.title ?? 'Politique de confidentialité'} · Envol Culture en France`,
    robots: { index: false },
  };
}

export default function PolitiqueConfidentialitePage() {
  return <LegalPage id="politiqueConfidentialite" />;
}
