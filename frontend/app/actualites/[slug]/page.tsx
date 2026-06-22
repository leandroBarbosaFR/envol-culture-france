import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { PageHeader } from '@/components/page-header';
import { client } from '@/lib/sanity/client';
import { newsPostBySlugQuery, newsSlugsQuery } from '@/lib/sanity/queries';
import { PortableText } from '@portabletext/react';

type Params = { slug: string };

type OtherPost = {
  slug: string;
  title: string;
  date: string;
  image?: { asset?: { url?: string } };
};

export async function generateStaticParams(): Promise<Params[]> {
  const posts = await client.fetch(newsSlugsQuery);
  return posts.map(({ slug }: { slug: string }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch(newsPostBySlugQuery, { slug });
  if (!post) return {};
  return {
    title: `${post.title} · Envol Culture en France`,
    description: post.excerpt,
  };
}

export default async function ActualitePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = await client.fetch(newsPostBySlugQuery, { slug });
  if (!post) notFound();

  return (
    <>
      <PageHeader
        eyebrow={post.category ? `${post.category} · ${post.date}` : post.date}
        title={post.title}
        description={post.excerpt}
        crumbs={[
          { href: '/actualites', label: 'Actualités' },
          { href: `/actualites/${post.slug}`, label: post.title },
        ]}
      />

      <article className="bg-background">
        <div className="mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-20">
          {post.image?.asset?.url && (
            <div className="relative mb-10 aspect-video overflow-hidden rounded-xl border border-border bg-muted shadow-xl shadow-primary/10">
              <Image
                src={post.image.asset.url}
                alt={post.title}
                fill
                sizes="(min-width: 768px) 700px, 100vw"
                className="object-cover"
                priority
              />
            </div>
          )}

          {post.body && (
            <div className="prose prose-neutral max-w-none">
              <PortableText value={post.body} />
            </div>
          )}

          <div className="mt-12 border-t border-border pt-8">
            <Link
              href="/actualites"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Toutes les actualités
            </Link>
          </div>
        </div>
      </article>

      {post.otherPosts?.length > 0 && (
        <section className="border-t border-border bg-brand-soft/40">
          <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
            <h2 className="text-xl font-semibold tracking-tight">
              À lire aussi
            </h2>
            <ul className="mt-6 grid gap-6 md:grid-cols-2">
              {post.otherPosts.map((other: OtherPost) => (
                <li key={other.slug}>
                  <Link
                    href={`/actualites/${other.slug}`}
                    className="group flex gap-4 rounded-xl border border-border bg-card p-4 transition hover:border-primary/60"
                  >
                    <div className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-xl bg-muted">
                      {other.image?.asset?.url && (
                        <Image
                          src={other.image.asset.url}
                          alt={other.title}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs text-muted-foreground">
                        {other.date}
                      </div>
                      <h3 className="mt-1 font-medium leading-snug">
                        {other.title}
                      </h3>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
