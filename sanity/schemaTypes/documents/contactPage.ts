// sanity/schemaTypes/documents/contactPage.ts
import {defineType, defineField} from 'sanity'

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
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
    defineField({
      name: 'coordinatesTitle',
      title: 'Coordinates Section Title',
      type: 'string',
      description: 'Ex: "Coordonnées"',
    }),
    defineField({
      name: 'channels',
      title: 'Contact Channels',
      type: 'array',
      of: [{type: 'contactChannel'}],
    }),
    defineField({
      name: 'formTitle',
      title: 'Form Title',
      type: 'string',
      description: 'Ex: "Écrivez-nous"',
    }),
    defineField({
      name: 'formSubtitle',
      title: 'Form Subtitle',
      type: 'string',
      description: 'Ex: "Nous répondons généralement sous 48 heures."',
    }),
  ],
})
