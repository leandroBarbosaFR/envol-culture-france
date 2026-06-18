// sanity/schemaTypes/objects/valueItem.ts
import {defineType, defineField} from 'sanity'

export const valueItem = defineType({
  name: 'valueItem',
  title: 'Value Item',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {title: 'title'},
  },
})
