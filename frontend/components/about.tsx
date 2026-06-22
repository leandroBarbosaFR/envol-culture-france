import { Heart, Users, Sparkles } from 'lucide-react';
import { ScrollRevealText } from '@/components/scroll-reveal-text';

const ICONS = [Heart, Users, Sparkles];

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
            <span className="text-sm font-medium text-brand-deep">
              {eyebrow}
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              <ScrollRevealText text={title} />
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              {paragraph1}
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              {paragraph2}
            </p>
          </div>

          <ul className="grid gap-4 md:col-span-7 md:grid-cols-1">
            {values.map(({ title, body }, index) => {
              const Icon = ICONS[index % ICONS.length];
              return (
                <li
                  key={title}
                  className="group flex gap-5 rounded-xl border border-border bg-card p-6 transition hover:border-primary/60 hover:shadow-md hover:shadow-primary/10"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand-deep">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-medium">{title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                      {body}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
