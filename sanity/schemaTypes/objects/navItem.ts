// sanity/schemaTypes/objects/navItem.ts
import {defineType, defineField} from 'sanity'

export const navItem = defineType({
  name: 'navItem',
  title: 'Élément de navigation',
  type: 'object',
  fields: [
    defineField({name: 'label', title: 'Libellé', type: 'string'}),
    defineField({name: 'href', title: 'URL', type: 'string'}),
  ],
  preview: {
    select: {title: 'label', subtitle: 'href'},
  },
})
