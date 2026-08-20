import type { Metadata } from 'next';
import Link from 'next/link';
import { Field } from '@/components/form-field';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const metadata: Metadata = {
  title: "S'inscrire · Envol Culture en France",
};

export default function InscriptionPage() {
  return (
    <>
      <PageHeader
        title="S'inscrire"
        description="Créez votre compte adhérent pour vous inscrire à un atelier ou suivre l'actualité de l'association."
        crumbs={[{ href: '/inscription', label: "S'inscrire" }]}
      />
      <section className="bg-background">
        <div className="mx-auto max-w-lg px-4 py-16 md:px-6 md:py-20">
          <Card className="p-6 md:p-8">
            <form className="grid gap-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Field id="firstname" label="Prénom" />
                <Field id="lastname" label="Nom" />
              </div>
              <Field id="email" label="Email" type="email" />
              <Field id="password" label="Mot de passe" type="password" />
              <Button type="submit" className="mt-2">
                Créer mon compte
              </Button>
            </form>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Déjà inscrit·e ?{' '}
              <Link href="/connexion" className="font-medium text-brand-deep hover:underline">
                Se connecter
              </Link>
            </p>
          </Card>
        </div>
      </section>
    </>
  );
}
