// sanity/schemaTypes/objects/valueItem.ts
import {defineType, defineField} from 'sanity'

export const valueItem = defineType({
  name: 'valueItem',
  title: 'Valeur',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Contenu',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {title: 'title'},
  },
})
