import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { ContactChannels } from '@/components/contact-channels';
import { Field } from '@/components/form-field';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { sanityFetch } from '@/lib/sanity/live';
import { contactPageQuery } from '@/lib/sanity/queries';

export async function generateMetadata(): Promise<Metadata> {
  const data = (await sanityFetch({ query: contactPageQuery })).data;
  return buildMetadata({
    title: data?.info?.title ?? 'Contact',
    description: data?.info?.description,
    path: '/contact',
  });
}

export default async function ContactPage() {
  const data = (await sanityFetch({ query: contactPageQuery })).data;

  return (
    <>
      <PageHeader
        eyebrow={data?.info?.eyebrow}
        title={data?.info?.title}
        description={data?.info?.description}
        crumbs={[{ href: '/contact', label: 'Contact' }]}
      />

      <section className="bg-background">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-12 md:px-6 md:py-24">
          <div className="md:col-span-5">
            <h2 className="text-2xl font-semibold">{data?.info?.coordinatesTitle ?? 'Coordonnées'}</h2>
            <div className="mt-6">
              <ContactChannels contact={data?.contact ?? null} />
            </div>
          </div>

          <div className="md:col-span-7">
            <Card className="p-6 md:p-8">
              <h2 className="text-2xl font-semibold">{data?.form?.formTitle}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{data?.form?.formSubtitle}</p>
              <form className="mt-6 grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Prénom" id="firstname" />
                  <Field label="Nom" id="lastname" />
                </div>
                <Field label="Email" id="email" type="email" />
                <Field label="Sujet" id="subject" />
                <Field label="Message" id="message" textarea placeholder="Votre message…" />
                <Button type="submit" className="mt-2 justify-self-start">
                  Envoyer le message
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
