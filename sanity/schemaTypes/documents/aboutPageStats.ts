import {defineType, defineField} from 'sanity'

export const aboutPageStats = defineType({
  name: 'aboutPageStats',
  title: 'Chiffres clés',
  type: 'document',
  fields: [
    defineField({
      name: 'stats',
      title: 'Statistiques',
      type: 'array',
      of: [{type: 'statItem'}],
      validation: (R) => R.max(3),
    }),
  ],
})
