// sanity/schemaTypes/documents/activity.ts
import {defineType, defineField} from 'sanity'

export const activity = defineType({
  name: 'activity',
  title: 'Activité',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name'},
    }),
    defineField({
      name: 'tagline',
      title: 'Accroche',
      type: 'string',
      description: 'Ex: "Éveil musical, chant et instruments"',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: 'Texte affiché sur la page et les cartes activité.',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'highlightsTitle',
      title: 'Points forts — Titre',
      type: 'string',
    }),
    defineField({
      name: 'highlights',
      title: 'Points forts',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Ex: "Cours individuels de 30 minutes par semaine"',
    }),
    defineField({
      name: 'scheduleItems',
      title: 'Horaires',
      type: 'array',
      of: [{type: 'scheduleItem'}],
    }),
    defineField({
      name: 'tarifItems',
      title: 'Tarifs',
      type: 'array',
      of: [{type: 'tarifItem'}],
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'tagline', media: 'image'},
  },
})
