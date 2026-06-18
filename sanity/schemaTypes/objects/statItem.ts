// sanity/schemaTypes/objects/statItem.ts
import {defineType, defineField} from 'sanity'

export const statItem = defineType({
  name: 'statItem',
  title: 'Stat Item',
  type: 'object',
  fields: [
    defineField({
      name: 'value',
      title: 'Value',
      type: 'string',
      description: 'Ex: "25+" ou "100%"',
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'Ex: "créneaux / semaine"',
    }),
  ],
  preview: {
    select: {title: 'value', subtitle: 'label'},
  },
})
