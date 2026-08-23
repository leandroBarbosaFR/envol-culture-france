import type { Metadata } from 'next';
import Link from 'next/link';
import { Field } from '@/components/form-field';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

/* Member-only screen: the title template adds the site name; keep it out of search. */
export const metadata: Metadata = {
  title: 'Se connecter',
  robots: { index: false, follow: true },
};

export default function ConnexionPage() {
  return (
    <>
      <PageHeader
        title="Se connecter"
        description="Accédez à votre espace adhérent pour gérer vos inscriptions et suivre les activités."
        crumbs={[{ href: '/connexion', label: 'Se connecter' }]}
      />
      <section className="bg-background">
        <div className="mx-auto max-w-md px-4 py-16 md:px-6 md:py-20">
          <Card className="p-6 md:p-8">
            <form className="grid gap-4">
              <Field id="email" label="Email" type="email" />
              <Field id="password" label="Mot de passe" type="password" />
              <Button type="submit" className="mt-2">
                Se connecter
              </Button>
            </form>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Pas encore de compte ?{' '}
              <Link href="/inscription" className="font-medium text-brand-deep hover:underline">
                S&apos;inscrire
              </Link>
            </p>
          </Card>
        </div>
      </section>
    </>
  );
}
