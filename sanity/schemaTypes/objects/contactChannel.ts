// sanity/schemaTypes/objects/contactChannel.ts
import {defineType, defineField} from 'sanity'

export const contactChannel = defineType({
  name: 'contactChannel',
  title: 'Canal de contact',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Libellé',
      type: 'string',
      description: 'Ex: "Email", "Téléphone", "Adresse"',
    }),
    defineField({
      name: 'value',
      title: 'Valeur',
      type: 'string',
      description: 'Ex: "contact@envol-culture.fr"',
    }),
    defineField({
      name: 'href',
      title: 'URL',
      type: 'string',
      description: 'Ex: "mailto:contact@envol-culture.fr" ou "tel:+33..."',
    }),
  ],
  preview: {
    select: {title: 'label', subtitle: 'value'},
  },
})
