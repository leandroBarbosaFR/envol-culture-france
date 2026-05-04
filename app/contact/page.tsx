import type { Metadata } from "next";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Contact · Envol Culture en France",
  description:
    "Contactez l'association Envol Culture en France pour toute question, inscription ou rendez-vous.",
};

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
  {
    icon: Clock,
    label: "Permanence",
    value: "Mercredi & samedi · 10h – 12h",
    href: "#",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Nous contacter"
        title="Une envie de nous rejoindre ?"
        description="Que ce soit pour une inscription, une question sur un atelier ou simplement pour faire connaissance, nous serons heureux d'échanger avec vous."
        crumbs={[{ href: "/contact", label: "Contact" }]}
      />

      <section className="bg-background">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-12 md:px-6 md:py-24">
          <div className="md:col-span-5">
            <h2 className="text-2xl font-semibold tracking-tight">
              Coordonnées
            </h2>
            <ul className="mt-6 grid gap-3">
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
            </ul>
          </div>

          <div className="md:col-span-7">
            <div className="rounded-xl border border-border bg-card p-6 md:p-8">
              <h2 className="text-2xl font-semibold tracking-tight">
                Écrivez-nous
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Nous répondons généralement sous 48 heures.
              </p>
              <form className="mt-6 grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Prénom" id="firstname" />
                  <Field label="Nom" id="lastname" />
                </div>
                <Field label="Email" id="email" type="email" />
                <Field label="Sujet" id="subject" />
                <div className="grid gap-1.5">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-3 focus:ring-primary/20"
                    placeholder="Votre message…"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-2 inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition hover:bg-primary/85"
                >
                  Envoyer le message
                </button>
              </form>
            </div>
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
