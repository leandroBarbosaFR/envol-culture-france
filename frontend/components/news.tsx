import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { ScrollRevealText } from '@/components/scroll-reveal-text';

type NewsPost = {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image: { asset: { url: string } };
};

type NewsProps = {
  eyebrow?: string;
  title?: string;
  linkLabel?: string;
  posts?: NewsPost[];
};

export function News({ eyebrow, title, linkLabel, posts = [] }: NewsProps) {
  return (
    <section id="news" className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-sm font-medium text-brand-deep">
              {eyebrow}
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              <ScrollRevealText text={title ?? ''} />
            </h2>
          </div>
          <Link
            href="/actualites"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-brand-deep"
          >
            {linkLabel}
            <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/actualites/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition hover:border-primary/60 hover:shadow-md hover:shadow-primary/10"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={post.image.asset.url}
                    alt={post.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
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
                  <h3 className="text-lg font-medium leading-snug">
                    {post.title}
                  </h3>
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
  );
}
