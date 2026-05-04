import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { tarifs, activities } from "@/lib/data";

export const metadata: Metadata = {
  title: "Tarifs · Envol Culture en France",
  description:
    "Tarifs des cours de musique, danse, peinture et langues — par trimestre, ajustés selon la commune.",
};

export default function TarifsPage() {
  const groups = activities.map((a) => ({
    activity: a,
    items: tarifs.filter((t) => t.category === a.slug),
  }));

  return (
    <>
      <PageHeader
        eyebrow="Tarifs"
        title="Les tarifs des activités"
        description="Les tarifs varient en fonction de l'activité, de la durée et de la catégorie d'âge. Vous trouverez ici les informations détaillées pour chaque atelier."
        crumbs={[{ href: "/tarifs", label: "Tarifs" }]}
      />

      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <div className="rounded-xl border border-border bg-brand-soft/50 p-5 text-sm text-muted-foreground leading-relaxed">
            <strong className="text-foreground">À noter :</strong> les tarifs
            indiqués correspondent à un trimestre. Un tarif majoré
            s&apos;applique pour les adhérents hors commune. La carte
            d&apos;adhésion annuelle à l&apos;association est obligatoire.
          </div>

          <div className="mt-12 space-y-12">
            {groups.map(({ activity, items }) =>
              items.length > 0 ? (
                <section key={activity.slug} id={activity.slug}>
                  <div className="flex items-end justify-between gap-4">
                    <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                      {activity.name}
                    </h2>
                  </div>
                  <div className="mt-6 overflow-hidden rounded-xl border border-border bg-card">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-primary/15 text-left">
                          <tr>
                            <Th>Activité</Th>
                            <Th>Durée hebdomadaire</Th>
                            <Th>Tarif</Th>
                            <Th>Catégorie d&apos;âge</Th>
                          </tr>
                        </thead>
                        <tbody>
                          {items.map((t, i) => (
                            <tr
                              key={`${t.activity}-${t.weekly}-${i}`}
                              className="border-t border-border"
                            >
                              <Td className="font-medium">{t.activity}</Td>
                              <Td>{t.weekly}</Td>
                              <Td>{t.price}</Td>
                              <Td>{t.age}</Td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </section>
              ) : null
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-foreground/70">
      {children}
    </th>
  );
}

function Td({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <td className={`px-4 py-3 align-top text-foreground/80 ${className}`}>
      {children}
    </td>
  );
}
