// sanity/schemaTypes/objects/navItem.ts
import {defineType, defineField} from 'sanity'

export const navItem = defineType({
  name: 'navItem',
  title: 'Navigation Item',
  type: 'object',
  fields: [
    defineField({name: 'label', title: 'Label', type: 'string'}),
    defineField({name: 'href', title: 'URL', type: 'string'}),
  ],
  preview: {
    select: {title: 'label', subtitle: 'href'},
  },
})
