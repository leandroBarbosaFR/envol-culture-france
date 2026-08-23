import { ArrowRight } from '@phosphor-icons/react/ssr';
import { MediaCardOverlay } from '@/components/media-card-overlay';
import Image from 'next/image';
import Link from 'next/link';

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
    <section id="news" className="bg-background">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
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
                className="group relative block aspect-[3/2] overflow-hidden rounded-lg bg-muted"
              >
                {post.image?.asset?.url && (
                  <Image
                    src={post.image.asset.url}
                    alt={post.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
                  />
                )}

                <MediaCardOverlay
                  title={post.title}
                  meta={[post.category, post.date].filter(Boolean).join(' · ')}
                  body={post.excerpt}
                  cta="Lire l'article"
                  bandHeight="h-0"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
