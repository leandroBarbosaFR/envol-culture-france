// sanity/schemaTypes/objects/footer.ts
import {defineType, defineField} from 'sanity'

export const footer = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'object',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      description: 'Ex: "Envol Culture"',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'text',
      rows: 2,
      description: 'Ex: "Association loi 1901 — acteur du développement..."',
    }),
    defineField({
      name: 'navColumnTitle',
      title: 'Navigation Column Title',
      type: 'string',
      description: 'Ex: "Navigation"',
    }),
    defineField({
      name: 'navLinks',
      title: 'Navigation Links',
      type: 'array',
      of: [{type: 'navItem'}],
    }),
    defineField({
      name: 'memberColumnTitle',
      title: 'Member Column Title',
      type: 'string',
      description: 'Ex: "Espace adhérent"',
    }),
    defineField({
      name: 'memberLinks',
      title: 'Member Links',
      type: 'array',
      of: [{type: 'navItem'}],
      description: "Se connecter + S'inscrire",
    }),
    defineField({
      name: 'copyright',
      title: 'Copyright Text',
      type: 'string',
      description: 'Ex: "Envol — Association loi 1901"',
    }),
    defineField({
      name: 'legalLabel',
      title: 'Legal Link — Label',
      type: 'string',
      description: 'Ex: "Mentions légales"',
    }),
    defineField({
      name: 'legalUrl',
      title: 'Legal Link — URL',
      type: 'string',
    }),
    defineField({
      name: 'privacyLabel',
      title: 'Privacy Link — Label',
      type: 'string',
      description: 'Ex: "Politique de confidentialité"',
    }),
    defineField({
      name: 'privacyUrl',
      title: 'Privacy Link — URL',
      type: 'string',
    }),
  ],
})
