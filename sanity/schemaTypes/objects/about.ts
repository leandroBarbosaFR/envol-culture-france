// sanity/schemaTypes/objects/about.ts
import {defineType, defineField} from 'sanity'

export const about = defineType({
  name: 'about',
  title: 'About Section',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'Ex: "Qui sommes-nous"',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'paragraph1',
      title: 'Paragraph 1',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'paragraph2',
      title: 'Paragraph 2',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'values',
      title: 'Values',
      type: 'array',
      of: [{type: 'valueItem'}],
    }),
  ],
})
