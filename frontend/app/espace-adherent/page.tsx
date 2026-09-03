import { PageHeader } from '@/components/page-header';
import { buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { phoneHref } from '@/lib/contact';
import { sanityFetch } from '@/lib/sanity/live';
import { siteContactQuery } from '@/lib/sanity/queries';
import { cn } from '@/lib/utils';
import { ArrowRight, Envelope, Hourglass, Phone } from '@phosphor-icons/react/ssr';
import type { Metadata } from 'next';
import Link from 'next/link';

/*
  Holding page for the member area: the accounts side of the site is not built
  yet, so "Se connecter" and "S'inscrire" land here instead of on a form that
  cannot submit. `/connexion`, `/inscription`, `/login` and `/register` are
  redirected here from next.config.ts — remove those redirects, and this page,
  once the real thing ships.
*/
export const metadata: Metadata = {
  title: 'Espace adhérent',
  description:
    "Les inscriptions en ligne ne sont pas encore disponibles. Contactez l'association pour rejoindre un atelier.",
  // Nothing to index: a temporary notice would only dilute the real pages.
  robots: { index: false, follow: true },
};

export default async function EspaceAdherentPage() {
  const { data: contact } = await sanityFetch({ query: siteContactQuery });

  return (
    <>
      <PageHeader
        title="Espace adhérent"
        crumbs={[{ href: '/espace-adherent', label: 'Espace adhérent' }]}
      />

      <section className="bg-background">
        <div className="mx-auto max-w-xl px-4 py-16 md:px-6 md:py-20">
          <Card className="items-center p-8 text-center md:p-10">
            <span className="grid size-14 place-items-center rounded-full bg-brand-soft text-brand-deep">
              <Hourglass className="size-7" />
            </span>

            <h2 className="mt-6 text-2xl font-semibold">
              Les inscriptions ne sont pas encore disponibles
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Si besoin, n&apos;hésitez pas à nous contacter : nous répondons à toutes vos
              questions sur les ateliers et les adhésions.
            </p>

            <Link href="/contact" className={cn(buttonVariants({ size: 'lg' }), 'mt-8')}>
              Nous contacter
              <ArrowRight className="size-4" />
            </Link>

            {(contact?.phone || contact?.email) && (
              <div className="mt-8 flex flex-col items-center gap-3 border-t border-border pt-6 text-sm sm:flex-row sm:justify-center sm:gap-8">
                {contact?.phone && (
                  <a
                    href={phoneHref(contact.phone)}
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                  >
                    <Phone className="size-4 text-brand-deep" />
                    {contact.phone}
                  </a>
                )}
                {contact?.email && (
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-center gap-2 break-all text-muted-foreground hover:text-foreground"
                  >
                    <Envelope className="size-4 text-brand-deep" />
                    {contact.email}
                  </a>
                )}
              </div>
            )}
          </Card>
        </div>
      </section>
    </>
  );
}
