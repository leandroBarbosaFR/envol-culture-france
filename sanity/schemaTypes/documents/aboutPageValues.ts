import {defineType, defineField} from 'sanity'

export const aboutPageValues = defineType({
  name: 'aboutPageValues',
  title: 'Nos valeurs',
  type: 'document',
  fields: [
    defineField({
      name: 'valuesTitle',
      title: 'Titre de la section',
      type: 'string',
    }),
    defineField({
      name: 'values',
      title: 'Valeurs',
      type: 'array',
      of: [{type: 'valueItem'}],
    }),
  ],
})
