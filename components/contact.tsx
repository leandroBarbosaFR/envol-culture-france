import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ScrollRevealText } from "@/components/scroll-reveal-text";

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: "contact@envol-culture.fr",
    href: "mailto:contact@envol-culture.fr",
  },
  {
    icon: Phone,
    label: "Téléphone",
    value: "04 42 00 00 00",
    href: "tel:+33442000000",
  },
  {
    icon: MapPin,
    label: "Adresse",
    value: "Roquefort-La Bédoule, France",
    href: "#",
  },
];

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
    <path d="M22 12.07C22 6.51 17.52 2 12 2S2 6.51 2 12.07c0 5 3.66 9.15 8.44 9.93v-7.02H7.9v-2.91h2.54V9.84c0-2.52 1.49-3.91 3.78-3.91 1.1 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.45 2.91h-2.33V22c4.78-.78 8.43-4.93 8.43-9.93Z" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
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

const socials = [
  { icon: FacebookIcon, label: "Facebook", href: "#" },
  { icon: InstagramIcon, label: "Instagram", href: "#" },
  { icon: YoutubeIcon, label: "YouTube", href: "#" },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-border"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-brand-soft via-background to-background"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -right-32 -z-10 h-96 w-96 rounded-full bg-primary/30 blur-3xl"
      />

      <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <span className="text-sm font-medium text-brand-deep">
              Nous contacter
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              <ScrollRevealText text="Une envie de nous rejoindre ?" />
            </h2>
            <p className="mt-5 max-w-xl text-muted-foreground leading-relaxed">
              Que ce soit pour une inscription, une question sur un atelier ou
              simplement pour faire connaissance, nous serons heureux
              d&apos;échanger avec vous.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className={cn(buttonVariants({ size: "lg" }), "rounded-md px-5")}
              >
                Nous contacter
              </Link>
              <Link
                href="/activites"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "rounded-md px-5"
                )}
              >
                Voir les activités
              </Link>
            </div>
          </div>

          <ul className="grid gap-3 md:col-span-6">
            {channels.map(({ icon: Icon, label, value, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition hover:border-primary/60"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {label}
                    </div>
                    <div className="mt-0.5 font-medium">{value}</div>
                  </div>
                </a>
              </li>
            ))}

            <li className="mt-2 flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Suivez-nous</span>
              <div className="flex gap-2">
                {socials.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-muted-foreground transition hover:border-primary hover:text-foreground"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
