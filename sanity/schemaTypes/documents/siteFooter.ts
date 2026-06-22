import {defineType, defineField} from 'sanity'

export const siteFooter = defineType({
  name: 'siteFooter',
  title: 'Pied de page',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Nom du site',
      type: 'string',
      description: 'Ex: "Envol Culture"',
    }),
    defineField({
      name: 'tagline',
      title: 'Accroche',
      type: 'text',
      rows: 2,
      description: 'Ex: "Association loi 1901 — acteur du développement..."',
    }),
    defineField({
      name: 'navColumnTitle',
      title: 'Titre colonne navigation',
      type: 'string',
      description: 'Ex: "Navigation"',
    }),
    defineField({
      name: 'navLinks',
      title: 'Liens de navigation',
      type: 'array',
      of: [{type: 'navItem'}],
    }),
    defineField({
      name: 'memberColumnTitle',
      title: "Titre colonne espace adhérent",
      type: 'string',
      description: 'Ex: "Espace adhérent"',
    }),
    defineField({
      name: 'memberLinks',
      title: "Liens espace adhérent",
      type: 'array',
      of: [{type: 'navItem'}],
      description: "Se connecter + S'inscrire",
    }),
    defineField({
      name: 'copyright',
      title: 'Texte copyright',
      type: 'string',
      description: 'Ex: "Envol — Association loi 1901"',
    }),
    defineField({
      name: 'legalLabel',
      title: 'Mentions légales — Libellé',
      type: 'string',
      description: 'Ex: "Mentions légales"',
    }),
    defineField({
      name: 'legalUrl',
      title: 'Mentions légales — URL',
      type: 'string',
    }),
    defineField({
      name: 'privacyLabel',
      title: 'Politique de confidentialité — Libellé',
      type: 'string',
      description: 'Ex: "Politique de confidentialité"',
    }),
    defineField({
      name: 'privacyUrl',
      title: 'Politique de confidentialité — URL',
      type: 'string',
    }),
  ],
})
