import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cardClass, cardHoverClass } from '@/components/ui/card';
import { cn } from '@/lib/utils';

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
            {eyebrow && (
              <span className="text-sm font-medium text-brand-deep">{eyebrow}</span>
            )}
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">{title}</h2>
          </div>
          {linkLabel && (
            <Link
              href="/actualites"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-deep hover:underline"
            >
              {linkLabel}
              <ArrowRight className="size-4" />
            </Link>
          )}
        </div>

        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/actualites/${post.slug}`}
                className={cn(cardClass, cardHoverClass, 'h-full')}
              >
                {post.image?.asset?.url && (
                  <div className="relative aspect-video overflow-hidden bg-muted">
                    <Image
                      src={post.image.asset.url}
                      alt={post.title}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    {post.category && (
                      <>
                        <span className="font-medium text-brand-deep">{post.category}</span>
                        <span>·</span>
                      </>
                    )}
                    <span>{post.date}</span>
                  </div>
                  <h3 className="font-heading text-lg font-medium leading-snug">{post.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
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
