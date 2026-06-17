import { Heart, Users, Sparkles } from "lucide-react";
import { ScrollRevealText } from "@/components/scroll-reveal-text";

const values = [
  {
    icon: Heart,
    title: "Une éducation par la culture",
    body: "Nous croyons que la pratique artistique nourrit l'estime de soi, la curiosité et le vivre-ensemble.",
  },
  {
    icon: Users,
    title: "Pour tous les âges",
    body: "Des enfants aux adultes, des débutants aux confirmés — chacun trouve sa place dans nos ateliers.",
  },
  {
    icon: Sparkles,
    title: "Animée par des passionnés",
    body: "Une équipe entièrement bénévole, portée par l'amour de la transmission et de la création.",
  },
];

export function About() {
  return (
    <section id="about" className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5">
            <span className="text-sm font-medium text-brand-deep">
              Qui sommes-nous
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              <ScrollRevealText text="Une association au service de la culture et du lien social" />
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Depuis sa création, Envol est un acteur majeur du développement
              culturel, sportif et social. Nous mettons en commun nos talents
              pour offrir un espace où la créativité peut s&apos;exprimer
              librement.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Nos disciplines — musique, danse, peinture, langues — sont
              autant de portes ouvertes sur la découverte de soi et des
              autres.
            </p>
          </div>

          <ul className="grid gap-4 md:col-span-7 md:grid-cols-1">
            {values.map(({ icon: Icon, title, body }) => (
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
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
