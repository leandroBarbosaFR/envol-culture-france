import {defineType, defineField} from 'sanity'

export const homeAboutSection = defineType({
  name: 'homeAboutSection',
  title: 'Section À propos (Accueil)',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Surtitre',
      type: 'string',
      description: 'Ex: "Qui sommes-nous"',
    }),
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
    }),
    defineField({
      name: 'paragraph1',
      title: 'Paragraphe 1',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'paragraph2',
      title: 'Paragraphe 2',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'values',
      title: 'Valeurs',
      type: 'array',
      of: [{type: 'valueItem'}],
    }),
  ],
})
