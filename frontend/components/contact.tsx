import Link from 'next/link';
import { ContactChannels } from '@/components/contact-channels';
import { buttonVariants } from '@/components/ui/button';
import { cardClass, cardHoverClass } from '@/components/ui/card';
import type { SiteContact } from '@/lib/contact';
import { cn } from '@/lib/utils';

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
    <path d="M22 12.07C22 6.51 17.52 2 12 2S2 6.51 2 12.07c0 5 3.66 9.15 8.44 9.93v-7.02H7.9v-2.91h2.54V9.84c0-2.52 1.49-3.91 3.78-3.91 1.1 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.45 2.91h-2.33V22c4.78-.78 8.43-4.93 8.43-9.93Z" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
    {...props}
  >
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
  </svg>
);

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
    <path d="M23.5 6.5a3 3 0 0 0-2.1-2.1C19.6 4 12 4 12 4s-7.6 0-9.4.4A3 3 0 0 0 .5 6.5C.1 8.3.1 12 .1 12s0 3.7.4 5.5a3 3 0 0 0 2.1 2.1C4.4 20 12 20 12 20s7.6 0 9.4-.4a3 3 0 0 0 2.1-2.1c.4-1.8.4-5.5.4-5.5s0-3.7-.4-5.5ZM9.75 15.5v-7l6.5 3.5-6.5 3.5Z" />
  </svg>
);

const SOCIAL_ICONS: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  youtube: YoutubeIcon,
};

type Social = { platform: string; href: string };

type ContactData = {
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryButtonLabel?: string;
  primaryButtonUrl?: string;
  secondaryButtonLabel?: string;
  secondaryButtonUrl?: string;
  socials?: Social[];
};

export function Contact({
  data,
  siteContact,
}: {
  data?: ContactData;
  siteContact?: SiteContact;
}) {
  const eyebrow = data?.eyebrow ?? 'Nous contacter';
  const title = data?.title ?? '';
  const description = data?.description ?? '';
  const primaryLabel = data?.primaryButtonLabel ?? 'Nous contacter';
  const primaryUrl = data?.primaryButtonUrl ?? '/contact';
  const secondaryLabel = data?.secondaryButtonLabel ?? 'Voir les activités';
  const secondaryUrl = data?.secondaryButtonUrl ?? '/activites';
  const socials = data?.socials ?? [];

  return (
    <section id="contact" className="border-t border-border bg-brand-soft/40">
      <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <span className="text-sm font-medium text-brand-deep">{eyebrow}</span>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">{title}</h2>
            <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">{description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={primaryUrl} className={buttonVariants()}>
                {primaryLabel}
              </Link>
              <Link href={secondaryUrl} className={buttonVariants({ variant: 'outline' })}>
                {secondaryLabel}
              </Link>
            </div>
          </div>

          <div className="grid gap-3 md:col-span-6">
            <ContactChannels contact={siteContact ?? null} />

            {socials.length > 0 && (
              <div className="mt-2 flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Suivez-nous</span>
                <div className="flex gap-2">
                  {socials.map(({ platform, href }) => {
                    const Icon = SOCIAL_ICONS[platform];
                    if (!Icon) return null;
                    return (
                      <a
                        key={platform}
                        href={href}
                        aria-label={platform}
                        className={cn(
                          cardClass,
                          cardHoverClass,
                          'grid size-10 place-items-center text-muted-foreground hover:text-foreground',
                        )}
                      >
                        <Icon className="size-4" />
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
