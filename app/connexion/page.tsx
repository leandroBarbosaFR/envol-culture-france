import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Se connecter · Envol Culture en France",
};

export default function ConnexionPage() {
  return (
    <>
      <PageHeader
        title="Se connecter"
        description="Accédez à votre espace adhérent pour gérer vos inscriptions et suivre les activités."
        crumbs={[{ href: "/connexion", label: "Se connecter" }]}
      />
      <section className="bg-background">
        <div className="mx-auto max-w-md px-4 py-16 md:px-6 md:py-20">
          <div className="rounded-xl border border-border bg-card p-6 md:p-8">
            <form className="grid gap-4">
              <div className="grid gap-1.5">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="h-11 rounded-md border border-input bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-3 focus:ring-primary/20"
                />
              </div>
              <div className="grid gap-1.5">
                <label htmlFor="password" className="text-sm font-medium">
                  Mot de passe
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="h-11 rounded-md border border-input bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-3 focus:ring-primary/20"
                />
              </div>
              <button
                type="submit"
                className="mt-2 inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition hover:bg-primary/85"
              >
                Se connecter
              </button>
            </form>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Pas encore de compte ?{" "}
              <Link
                href="/inscription"
                className="font-medium text-brand-deep hover:underline"
              >
                S&apos;inscrire
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
