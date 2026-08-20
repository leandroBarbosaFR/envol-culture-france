/**
 * Transitional rendering of horaires/tarifs from the per-activity fields
 * (`activity.scheduleItems` / `activity.tarifItems`). Used only while the
 * tables of the « Tarifs & Horaires » page are empty. Safe to delete once
 * the CMS tables are filled.
 */

export type LegacyScheduleItem = {
  activity: string;
  day: string;
  time: string;
  duration: string;
  place: string;
  teacher: string;
};

export type LegacyTarifItem = {
  activity: string;
  weekly: string;
  price: string;
  age: string;
};

type ActivityGroup<T> = { name: string; slug: string; items: T[] };

export function LegacyTarifsTables({
  activities,
}: {
  activities: { name: string; slug: string; tarifItems: LegacyTarifItem[] }[] | null;
}) {
  const groups: ActivityGroup<LegacyTarifItem>[] =
    activities?.map((a) => ({ name: a.name, slug: a.slug, items: a.tarifItems ?? [] })) ?? [];
  return (
    <>
      <div className="rounded-lg border border-border bg-brand-soft/50 p-5 text-sm leading-relaxed text-muted-foreground">
        <strong className="text-foreground">À noter :</strong> les tarifs indiqués
        correspondent à un trimestre. Un tarif majoré s&apos;applique pour les
        adhérents hors commune. La carte d&apos;adhésion annuelle à
        l&apos;association est obligatoire.
      </div>
      <div className="mt-12 space-y-12">
        {groups.map(({ name, slug, items }) =>
          items.length > 0 ? (
            <section key={slug} id={slug}>
              <h2 className="text-2xl font-semibold md:text-3xl">{name}</h2>
              <Table
                head={['Activité', 'Durée hebdomadaire', 'Tarif', "Catégorie d'âge"]}
                rows={items.map((t) => [t.activity, t.weekly, t.price, t.age])}
              />
            </section>
          ) : null,
        )}
      </div>
    </>
  );
}

export function LegacyHorairesTables({
  activities,
}: {
  activities: { name: string; slug: string; scheduleItems: LegacyScheduleItem[] }[] | null;
}) {
  const groups: ActivityGroup<LegacyScheduleItem>[] =
    activities?.map((a) => ({ name: a.name, slug: a.slug, items: a.scheduleItems ?? [] })) ?? [];
  return (
    <div className="space-y-12">
      {groups.map(({ name, slug, items }) =>
        items.length > 0 ? (
          <section key={slug} id={slug}>
            <h2 className="text-2xl font-semibold md:text-3xl">{name}</h2>
            <Table
              head={['Cours', 'Jour', 'Horaire', 'Durée', 'Lieu', 'Professeur']}
              rows={items.map((s) => [s.activity, s.day, s.time, s.duration, s.place, s.teacher])}
              nowrap
            />
          </section>
        ) : null,
      )}
    </div>
  );
}

function Table({
  head,
  rows,
  nowrap = false,
}: {
  head: string[];
  rows: (string | undefined)[][];
  nowrap?: boolean;
}) {
  const wrap = nowrap ? 'whitespace-nowrap' : '';
  return (
    <div className="mt-6 overflow-hidden rounded-lg border border-border bg-card">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-brand-soft text-left">
            <tr>
              {head.map((h) => (
                <th
                  key={h}
                  className={`px-4 py-3 text-sm font-semibold text-foreground ${wrap}`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((cells, i) => (
              <tr key={i} className="border-t border-border">
                {cells.map((c, j) => (
                  <td
                    key={j}
                    className={`px-4 py-3 align-top text-foreground/80 ${wrap} ${
                      j === 0 ? 'font-medium' : ''
                    }`}
                  >
                    {c}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
