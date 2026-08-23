type ValueItem = {
  title: string;
  body: string;
};

type AboutData = {
  eyebrow?: string;
  title?: string;
  paragraph1?: string;
  paragraph2?: string;
  values?: ValueItem[];
};

export function About({ data }: { data?: AboutData }) {
  const eyebrow = data?.eyebrow ?? 'Qui sommes-nous';
  const title = data?.title ?? '';
  const paragraph1 = data?.paragraph1 ?? '';
  const paragraph2 = data?.paragraph2 ?? '';
  const values = data?.values ?? [];

  return (
    <section id="about" className="bg-background">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
        <div className="max-w-3xl">
          <span className="text-sm font-medium text-brand-deep">{eyebrow}</span>
          <h2 className="mt-3 text-3xl font-semibold md:text-4xl">{title}</h2>
          <p className="mt-6 leading-relaxed text-muted-foreground">{paragraph1}</p>
          <p className="mt-4 leading-relaxed text-muted-foreground">{paragraph2}</p>
        </div>

        {values.length > 0 && (
          <ul className="mt-16 grid gap-10 border-t border-border pt-10 md:mt-20 md:grid-cols-3 md:gap-12">
            {values.map(({ title: valueTitle, body }) => (
              <li key={valueTitle}>
                <h3 className="font-heading text-lg font-medium">{valueTitle}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{body}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
