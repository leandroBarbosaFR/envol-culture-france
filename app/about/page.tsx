import type { Metadata } from "next";
import Image from "next/image";
import { Heart, Users, Sparkles, Award } from "lucide-react";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Qui sommes-nous · Envol Culture en France",
  description:
    "Découvrez l'histoire, la mission et les valeurs d'Envol Culture en France — association culturelle et sociale.",
};

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
  {
    icon: Award,
    title: "Ancrée dans le territoire",
    body: "Au cœur de Roquefort-La Bédoule, en lien avec les écoles et les acteurs culturels locaux.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Qui sommes-nous"
        title="Une association au service de la culture et du lien social"
        description="Depuis sa création, Envol est un acteur majeur du développement culturel, sportif et social. Nous mettons en commun nos talents pour offrir un espace où la créativité peut s'exprimer librement."
        crumbs={[{ href: "/about", label: "Qui sommes-nous" }]}
      />

      <section className="border-b border-border bg-background">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 md:grid-cols-12 md:px-6 md:py-24">
          <div className="md:col-span-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-muted shadow-xl shadow-primary/10">
              <Image
                src="https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1200&q=80"
                alt="Atelier collectif"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="md:col-span-6">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Notre mission
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Faire de la pratique artistique et culturelle un bien commun
              accessible à tous. Nous proposons des ateliers de musique, de
              danse, de peinture et de langues animés par des intervenants
              passionnés et bénévoles.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Au-delà des cours, l&apos;association est un lieu de rencontre :
              concerts, expositions, événements de quartier — autant
              d&apos;occasions de partager et de tisser des liens entre
              générations.
            </p>

            <dl className="mt-8 grid grid-cols-3 gap-6 border-t border-border pt-6">
              <div>
                <dt className="text-3xl font-semibold tracking-tight">4</dt>
                <dd className="mt-1 text-xs text-muted-foreground">
                  disciplines
                </dd>
              </div>
              <div>
                <dt className="text-3xl font-semibold tracking-tight">25+</dt>
                <dd className="mt-1 text-xs text-muted-foreground">
                  créneaux / semaine
                </dd>
              </div>
              <div>
                <dt className="text-3xl font-semibold tracking-tight">100%</dt>
                <dd className="mt-1 text-xs text-muted-foreground">bénévole</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="bg-brand-soft/40">
        <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-24">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Nos valeurs
          </h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {values.map(({ icon: Icon, title, body }) => (
              <li
                key={title}
                className="flex gap-5 rounded-xl border border-border bg-card p-6"
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
      </section>
    </>
  );
}
