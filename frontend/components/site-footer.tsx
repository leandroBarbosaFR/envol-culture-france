import Link from "next/link";
import { NAV_LINKS } from "@/lib/data";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link href="/" className="font-semibold tracking-tight">
              Envol Culture
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground leading-relaxed">
              Association loi 1901 — acteur du développement culturel, sportif
              et social à Roquefort-La Bédoule.
            </p>
          </div>

          <div className="md:col-span-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Navigation
            </div>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
              {NAV_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Espace adhérent
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link
                  href="/connexion"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Se connecter
                </Link>
              </li>
              <li>
                <Link
                  href="/inscription"
                  className="text-muted-foreground hover:text-foreground"
                >
                  S&apos;inscrire
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Envol — Association loi 1901</span>
          <div className="flex gap-5">
            <a href="#" className="hover:text-foreground">Mentions légales</a>
            <a href="#" className="hover:text-foreground">Politique de confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
