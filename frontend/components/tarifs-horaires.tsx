import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { RichContent, hasTable, type RichBlock } from '@/components/rich-content';
import { PrintButton } from '@/components/print-button';
import { buttonVariants } from '@/components/ui/button';

export type TarifsHorairesTab = 'tarifs' | 'horaires';

export type TarifsHorairesData = {
  tarifsTabLabel?: string | null;
  tarifsEyebrow?: string | null;
  tarifsTitle?: string | null;
  tarifsDescription?: string | null;
  tarifsContent?: RichBlock[] | null;
  horairesTabLabel?: string | null;
  horairesEyebrow?: string | null;
  horairesTitle?: string | null;
  horairesDescription?: string | null;
  horairesContent?: RichBlock[] | null;
} | null;

const TABS: Record<
  TarifsHorairesTab,
  { href: string; crumb: string; tabLabel: string; eyebrow: string; title: string; description: string }
> = {
  tarifs: {
    href: '/tarifs',
    crumb: 'Tarifs',
    tabLabel: 'Tarifs des activités',
    eyebrow: 'Tarifs',
    title: 'Les tarifs des activités',
    description:
      "Les tarifs varient en fonction de l'activité, de la durée et de la catégorie d'âge. Vous trouverez ici les informations détaillées pour chaque atelier.",
  },
  horaires: {
    href: '/horaires',
    crumb: 'Horaires',
    tabLabel: 'Horaires des activités',
    eyebrow: 'Horaires',
    title: 'Le planning des activités',
    description:
      "Retrouvez ci-dessous le planning des différentes activités proposées par l'association. Les horaires, lieux et professeurs sont indiqués pour vous permettre de mieux organiser votre participation.",
  },
};

/** Resolves the texts of one tab, falling back to defaults when the CMS field is empty. */
export function resolveTab(data: TarifsHorairesData, tab: TarifsHorairesTab) {
  const d = TABS[tab];
  const get = (suffix: 'TabLabel' | 'Eyebrow' | 'Title' | 'Description') =>
    (data?.[`${tab}${suffix}` as keyof NonNullable<TarifsHorairesData>] as string | null | undefined) || undefined;
  const content = data?.[`${tab}Content`] ?? null;
  return {
    href: d.href,
    crumb: d.crumb,
    tabLabel: get('TabLabel') ?? d.tabLabel,
    eyebrow: get('Eyebrow') ?? d.eyebrow,
    title: get('Title') ?? d.title,
    description: get('Description') ?? d.description,
    content,
    hasTable: hasTable(content),
  };
}

type Props = {
  active: TarifsHorairesTab;
  data: TarifsHorairesData;
  /** Rendered when the CMS table for the active tab is still empty. */
  fallback?: React.ReactNode;
};

export function TarifsHoraires({ active, data, fallback }: Props) {
  const current = resolveTab(data, active);
  const order: TarifsHorairesTab[] = ['tarifs', 'horaires'];

  return (
    <>
      <PageHeader
        eyebrow={current.eyebrow}
        title={current.title}
        description={current.description}
        crumbs={[{ href: current.href, label: current.crumb }]}
      />

      {/* Tables print best in landscape; scoped to this page only. */}
      <style>{`@media print { @page { size: A4 landscape; } }`}</style>

      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16 print:max-w-none print:px-0 print:py-0">
          <div className="flex flex-wrap items-center justify-between gap-4 print:hidden">
          <nav aria-label="Tarifs ou horaires" className="flex flex-wrap gap-2">
            {order.map((tab) => {
              const t = resolveTab(data, tab);
              const isActive = tab === active;
              return (
                <Link
                  key={tab}
                  href={t.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={buttonVariants({ variant: isActive ? 'default' : 'outline' })}
                >
                  {t.tabLabel}
                </Link>
              );
            })}
          </nav>
          <PrintButton />
          </div>

          <div className="mt-10 print:mt-4">
            {current.hasTable && current.content ? (
              <RichContent value={current.content} />
            ) : (
              fallback
            )}
          </div>
        </div>
      </section>
    </>
  );
}
