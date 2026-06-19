// sanity/schemaTypes/documents/activitiesPage.ts
import {defineType, defineField} from 'sanity'

export const activitiesPage = defineType({
  name: 'activitiesPage',
  title: 'Activities Page',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'Ex: "Les activités"',
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
