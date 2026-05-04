import Link from "next/link";

const NAV = [
  { href: "/about", label: "À propos" },
  { href: "/activites", label: "Activités" },
  { href: "/actualites", label: "Actualités" },
  { href: "/contact", label: "Contact" },
];

const NAV_LINK =
  "rounded-md px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-foreground/75 transition-colors duration-200 hover:bg-foreground/5 hover:text-foreground";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-center px-6 py-5">
        <div className="flex items-center gap-1 rounded-xl border border-black/5 bg-white/85 p-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)] backdrop-blur-md">
          <Link
            href="/"
            className="px-4 py-2 text-sm font-semibold tracking-tight text-foreground"
          >
            Envol Culture
          </Link>
          <span aria-hidden className="mx-1 h-5 w-px bg-foreground/10" />
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} className={NAV_LINK}>
                {item.label}
              </Link>
            ))}
            <Link href="/connexion" className={NAV_LINK}>
              Se connecter
            </Link>
          </nav>
          <Link
            href="/inscription"
            className="ml-1 inline-flex h-10 items-center justify-center rounded-md bg-foreground px-5 text-[11px] font-semibold uppercase tracking-[0.12em] text-background transition-colors duration-200 hover:bg-foreground/85"
          >
            S&apos;inscrire
          </Link>
        </div>
      </div>
    </header>
  );
}
