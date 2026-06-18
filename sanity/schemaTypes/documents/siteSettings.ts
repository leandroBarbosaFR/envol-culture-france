// sanity/schemasTypes/documents/siteSettings.ts
import {defineType, defineField} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site configuration',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: "Site's Name",
      type: 'string',
      description: 'Ex: "Envol Culture"',
    }),
    defineField({
      name: 'headerLinks',
      title: 'Header Navigation Links',
      type: 'array',
      of: [{type: 'navItem'}],
      description: 'Appears in header',
    }),
    defineField({
      name: 'footerLinks',
      title: 'Footer Navigation Links',
      type: 'array',
      of: [{type: 'navItem'}],
      description: 'Appears in footer',
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title (meta title)',
      type: 'string',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description (meta description)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'footerTagline',
      title: 'Footer Tagline',
      type: 'text',
      rows: 2,
      description: 'Ex: "Association loi 1901 — acteur du développement..."',
    }),
    defineField({
      name: 'footerCopyright',
      title: 'Copyright Text',
      type: 'string',
      description: 'Ex: "Envol — Association loi 1901" (o ano é gerado automaticamente)',
    }),
    defineField({
      name: 'legalUrl',
      title: 'Link — Mentions légales',
      type: 'url',
    }),
    defineField({
      name: 'privacyUrl',
      title: 'Link — Politique de confidentialité',
      type: 'url',
    }),
  ],
})
