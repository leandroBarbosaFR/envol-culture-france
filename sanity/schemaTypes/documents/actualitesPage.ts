// sanity/schemaTypes/documents/actualitesPage.ts
import {defineType, defineField} from 'sanity'

export const actualitesPage = defineType({
  name: 'actualitesPage',
  title: 'Actualités Page',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'Ex: "Nos actualités"',
    }),
    defineField({
      name: 'title',
      title: 'Title',
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
