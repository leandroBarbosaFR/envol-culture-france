// sanity/schemaTypes/documents/actualitesPage.ts
import {defineType, defineField} from 'sanity'

export const actualitesPage = defineType({
  name: 'actualitesPage',
  title: 'Page Actualités',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Surtitre',
      type: 'string',
      description: 'Ex: "Nos actualités"',
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
