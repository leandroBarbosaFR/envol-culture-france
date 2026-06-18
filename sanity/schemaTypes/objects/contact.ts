// sanity/schemaTypes/objects/contact.ts
import {defineType, defineField} from 'sanity'

export const contact = defineType({
  name: 'contact',
  title: 'Contact Section',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'Ex: "Nous contacter"',
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
      name: 'primaryButtonLabel',
      title: 'Primary Button — Label',
      type: 'string',
    }),
    defineField({
      name: 'primaryButtonUrl',
      title: 'Primary Button — URL',
      type: 'string',
    }),
    defineField({
      name: 'secondaryButtonLabel',
      title: 'Secondary Button — Label',
      type: 'string',
    }),
    defineField({
      name: 'secondaryButtonUrl',
      title: 'Secondary Button — URL',
      type: 'string',
    }),
    defineField({
      name: 'channels',
      title: 'Contact Channels',
      type: 'array',
      of: [{type: 'contactChannel'}],
      description: 'Email, phone, address',
    }),
    defineField({
      name: 'socials',
      title: 'Social Links',
      type: 'array',
      of: [{type: 'socialLink'}],
    }),
  ],
})
