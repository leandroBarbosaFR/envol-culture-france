import {defineType, defineField} from 'sanity'

export const aboutPageIntro = defineType({
  name: 'aboutPageIntro',
  title: 'En-tête & Mission',
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
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'missionImage',
      title: 'Mission — Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'missionTitle',
      title: 'Mission — Titre',
      type: 'string',
    }),
    defineField({
      name: 'missionParagraph1',
      title: 'Mission — Paragraphe 1',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'missionParagraph2',
      title: 'Mission — Paragraphe 2',
      type: 'text',
      rows: 4,
    }),
  ],
})
