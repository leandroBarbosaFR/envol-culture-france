import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { activities } from "@/lib/data";

export const metadata: Metadata = {
  title: "Les activités · Envol Culture en France",
  description:
    "Musique, danse, peinture, langues — découvrez l'ensemble des activités proposées par l'association Envol.",
};

export default function ActivitesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Les activités"
        title="Quatre disciplines, une même envie de partager"
        description="Chaque atelier est animé par un intervenant passionné. Inscriptions ouvertes à la rentrée — n'hésitez pas à venir essayer."
        crumbs={[{ href: "/activites", label: "Activités" }]}
      />

      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <ul className="grid gap-6 md:grid-cols-2">
            {activities.map((activity) => (
              <li key={activity.slug}>
                <Link
                  href={`/activites/${activity.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/15"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={activity.image}
                      alt={activity.name}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h2 className="text-xl font-medium">{activity.name}</h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {activity.tagline}
                        </p>
                      </div>
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-soft text-brand-deep transition group-hover:bg-primary group-hover:text-primary-foreground">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {activity.description}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
