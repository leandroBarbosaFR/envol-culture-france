import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/page-header';
import { RichContent, type RichBlock } from '@/components/rich-content';
import { Card } from '@/components/ui/card';
import { addressLines, phoneHref, type SiteContact } from '@/lib/contact';
import { client } from '@/lib/sanity/client';
import { legalPageQuery, siteContactQuery } from '@/lib/sanity/queries';

export type LegalPageId = 'mentionsLegales' | 'politiqueConfidentialite';

type LegalPageDoc = {
  title?: string | null;
  lastUpdated?: string | null;
  showContact?: boolean | null;
  body?: RichBlock[] | null;
} | null;

const ROUTES: Record<LegalPageId, { href: string; fallbackTitle: string }> = {
  mentionsLegales: { href: '/mentions-legales', fallbackTitle: 'Mentions légales' },
  politiqueConfidentialite: {
    href: '/politique-de-confidentialite',
    fallbackTitle: 'Politique de confidentialité',
  },
};

export async function fetchLegalPage(id: LegalPageId): Promise<LegalPageDoc> {
  return client.fetch(legalPageQuery, { id });
}

function formatDate(iso?: string | null): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? null
    : d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

/** Shared renderer for the two legal pages (content edited in the Studio → Pages légales). */
export async function LegalPage({ id }: { id: LegalPageId }) {
  const [doc, contact] = await Promise.all([
    fetchLegalPage(id),
    client.fetch(siteContactQuery) as Promise<SiteContact>,
  ]);
  if (!doc) notFound();

  const route = ROUTES[id];
  const title = doc.title || route.fallbackTitle;
  const updated = formatDate(doc.lastUpdated);
  const lines = addressLines(contact);
  const showContact = doc.showContact !== false && Boolean(contact);

  return (
    <>
      <PageHeader
        eyebrow="Informations légales"
        title={title}
        description={updated ? `Dernière mise à jour : ${updated}` : undefined}
        crumbs={[{ href: route.href, label: title }]}
      />

      <section className="bg-background">
        <div className="mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-20">
          {showContact && (
            <Card className="mb-12 p-6">
              <div className="text-sm font-semibold">
                {contact?.organisationName ?? 'Association ENVOL'}
              </div>
              <dl className="mt-3 grid gap-2 text-sm text-muted-foreground sm:grid-cols-[auto_1fr] sm:gap-x-6">
                {lines.length > 0 && (
                  <>
                    <dt className="font-medium text-foreground">Adresse</dt>
                    <dd>
                      {lines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </dd>
                  </>
                )}
                {contact?.contactName && (
                  <>
                    <dt className="font-medium text-foreground">Responsable</dt>
                    <dd>{contact.contactName}</dd>
                  </>
                )}
                {contact?.phone && (
                  <>
                    <dt className="font-medium text-foreground">Téléphone</dt>
                    <dd>
                      <a href={phoneHref(contact.phone)} className="hover:text-foreground">
                        {contact.phone}
                      </a>
                    </dd>
                  </>
                )}
                {contact?.email && (
                  <>
                    <dt className="font-medium text-foreground">E-mail</dt>
                    <dd>
                      <a href={`mailto:${contact.email}`} className="break-all hover:text-foreground">
                        {contact.email}
                      </a>
                    </dd>
                  </>
                )}
              </dl>
            </Card>
          )}

          {doc.body?.length ? <RichContent value={doc.body} /> : null}
        </div>
      </section>
    </>
  );
}
