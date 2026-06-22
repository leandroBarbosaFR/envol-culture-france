// sanity/schemaTypes/objects/statItem.ts
import {defineType, defineField} from 'sanity'

export const statItem = defineType({
  name: 'statItem',
  title: 'Statistique',
  type: 'object',
  fields: [
    defineField({
      name: 'value',
      title: 'Valeur',
      type: 'string',
      description: 'Ex: "25+" ou "100%"',
    }),
    defineField({
      name: 'label',
      title: 'Libellé',
      type: 'string',
      description: 'Ex: "créneaux / semaine"',
    }),
  ],
  preview: {
    select: {title: 'value', subtitle: 'label'},
  },
})
