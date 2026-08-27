// sanity/schemaTypes/documents/galeriePage.ts
import {defineType, defineField} from 'sanity'

export const galeriePage = defineType({
  name: 'galeriePage',
  title: 'Page Galerie',
  type: 'document',
  description:
    'En-tête de la page qui liste les albums. Les photos se gèrent dans « Albums photo ».',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Surtitre',
      type: 'string',
      description: 'Ex: "En images"',
    }),
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
  ],
})
