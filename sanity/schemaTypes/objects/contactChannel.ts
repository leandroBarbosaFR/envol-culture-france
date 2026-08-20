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
      description: 'Ex: "E-mail", "Téléphone", "Adresse"',
    }),
    defineField({
      name: 'value',
      title: 'Valeur',
      type: 'string',
      description: 'Ex: "associationenvol13830@gmail.com"',
    }),
    defineField({
      name: 'href',
      title: 'URL',
      type: 'string',
      description: 'Ex: "mailto:associationenvol13830@gmail.com" ou "tel:+33670013060"',
    }),
  ],
  preview: {
    select: {title: 'label', subtitle: 'value'},
  },
})
