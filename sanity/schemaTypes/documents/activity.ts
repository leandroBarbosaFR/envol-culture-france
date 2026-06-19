// sanity/schemaTypes/documents/activity.ts
import {defineType, defineField} from 'sanity'

export const activity = defineType({
  name: 'activity',
  title: 'Activity',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
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
      title: 'Tagline',
      type: 'string',
      description: 'Subtítulo curto — Ex: "Éveil musical, chant et instruments"',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: 'Texto longo exibido na página da atividade e nos cards',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Ex: "Cours individuels de 30 minutes par semaine"',
    }),
    defineField({
      name: 'scheduleItems',
      title: 'Schedule',
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
