import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "S'inscrire · Envol Culture en France",
};

export default function InscriptionPage() {
  return (
    <>
      <PageHeader
        title="S'inscrire"
        description="Créez votre compte adhérent pour vous inscrire à un atelier ou suivre l'actualité de l'association."
        crumbs={[{ href: "/inscription", label: "S'inscrire" }]}
      />
      <section className="bg-background">
        <div className="mx-auto max-w-md px-4 py-16 md:px-6 md:py-20">
          <div className="rounded-xl border border-border bg-card p-6 md:p-8">
            <form className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field id="firstname" label="Prénom" />
                <Field id="lastname" label="Nom" />
              </div>
              <Field id="email" label="Email" type="email" />
              <Field id="password" label="Mot de passe" type="password" />
              <button
                type="submit"
                className="mt-2 inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition hover:bg-primary/85"
              >
                Créer mon compte
              </button>
            </form>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Déjà inscrit·e ?{" "}
              <Link
                href="/connexion"
                className="font-medium text-brand-deep hover:underline"
              >
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  id,
  type = "text",
}: {
  label: string;
  id: string;
  type?: string;
}) {
  return (
    <div className="grid gap-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        className="h-11 rounded-md border border-input bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-3 focus:ring-primary/20"
      />
    </div>
  );
}
