import { Users, Heart, Book } from 'lucide-react';
import { Card } from '@/components/ui/card';

const ICONS = [Book, Users, Heart];

type ValueItem = { title: string; body: string };

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
    <section id="about" className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5">
            <span className="text-sm font-medium text-brand-deep">{eyebrow}</span>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">{title}</h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">{paragraph1}</p>
            <p className="mt-4 leading-relaxed text-muted-foreground">{paragraph2}</p>
          </div>

          <ul className="grid gap-4 md:col-span-7">
            {values.map(({ title, body }, index) => {
              const Icon = ICONS[index % ICONS.length];
              return (
                <li key={title}>
                  <Card className="flex-row gap-4 p-5">
                    <span className="grid size-10 shrink-0 place-items-center rounded-md bg-brand-soft text-brand-deep">
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <h3 className="font-heading font-medium">{title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {body}
                      </p>
                    </div>
                  </Card>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
