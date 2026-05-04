import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { news } from "@/lib/data";

export const metadata: Metadata = {
  title: "Actualités · Envol Culture en France",
  description:
    "Suivez l'actualité de l'association : événements, ateliers, vie associative.",
};

export default function ActualitesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Nos actualités"
        title="Ce qui anime l'association"
        description="Concerts, expositions, nouveaux ateliers, vie associative — retrouvez ici tout ce qui rythme l'année."
        crumbs={[{ href: "/actualites", label: "Actualités" }]}
      />

      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {news.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/actualites/${post.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition hover:border-primary/60 hover:shadow-md hover:shadow-primary/10"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="font-medium text-brand-deep">
                        {post.category}
                      </span>
                      <span>·</span>
                      <span>{post.date}</span>
                    </div>
                    <h2 className="text-lg font-medium leading-snug">
                      {post.title}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {post.excerpt}
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
