import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { schedule, activities } from "@/lib/data";

export const metadata: Metadata = {
  title: "Horaires · Envol Culture en France",
  description:
    "Planning des activités d'Envol — horaires, lieux et professeurs pour la musique, la danse, la peinture et les langues.",
};

export default function HorairesPage() {
  const groups = activities.map((a) => ({
    activity: a,
    items: schedule.filter((s) => s.category === a.slug),
  }));

  return (
    <>
      <PageHeader
        eyebrow="Horaires"
        title="Le planning des activités"
        description="Retrouvez ci-dessous le planning des différentes activités proposées par l'association. Les horaires, lieux et professeurs sont indiqués pour vous permettre de mieux organiser votre participation."
        crumbs={[{ href: "/horaires", label: "Horaires" }]}
      />

      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <div className="space-y-12">
            {groups.map(({ activity, items }) =>
              items.length > 0 ? (
                <section key={activity.slug} id={activity.slug}>
                  <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                    {activity.name}
                  </h2>
                  <div className="mt-6 overflow-hidden rounded-xl border border-border bg-card">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-primary/15 text-left">
                          <tr>
                            <Th>Cours</Th>
                            <Th>Jour</Th>
                            <Th>Horaire</Th>
                            <Th>Durée</Th>
                            <Th>Lieu</Th>
                            <Th>Professeur</Th>
                          </tr>
                        </thead>
                        <tbody>
                          {items.map((s, i) => (
                            <tr
                              key={`${s.activity}-${s.day}-${s.time}-${i}`}
                              className="border-t border-border"
                            >
                              <Td className="font-medium">{s.activity}</Td>
                              <Td>{s.day}</Td>
                              <Td>{s.time}</Td>
                              <Td>{s.duration}</Td>
                              <Td>{s.place}</Td>
                              <Td>{s.teacher}</Td>
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
    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-foreground/70 whitespace-nowrap">
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
    <td
      className={`px-4 py-3 align-top text-foreground/80 whitespace-nowrap ${className}`}
    >
      {children}
    </td>
  );
}
