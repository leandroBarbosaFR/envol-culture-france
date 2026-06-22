import {defineType, defineField} from 'sanity'

export const contactPageInfo = defineType({
  name: 'contactPageInfo',
  title: 'En-tête & Coordonnées',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Surtitre',
      type: 'string',
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
    defineField({
      name: 'coordinatesTitle',
      title: 'Titre section coordonnées',
      type: 'string',
      description: 'Ex: "Coordonnées"',
    }),
    defineField({
      name: 'channels',
      title: 'Canaux de contact',
      type: 'array',
      of: [{type: 'contactChannel'}],
    }),
  ],
})
