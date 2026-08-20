import type { Metadata } from 'next';
import { LegalPage, fetchLegalPage } from '@/components/legal-page';

export async function generateMetadata(): Promise<Metadata> {
  const doc = await fetchLegalPage('mentionsLegales');
  return {
    title: `${doc?.title ?? 'Mentions légales'} · Envol Culture en France`,
    robots: { index: false },
  };
}

export default function MentionsLegalesPage() {
  return <LegalPage id="mentionsLegales" />;
}
