// sanity/schemaTypes/objects/scheduleItem.ts
import {defineType, defineField} from 'sanity'

export const scheduleItem = defineType({
  name: 'scheduleItem',
  title: 'Schedule Item',
  type: 'object',
  fields: [
    defineField({
      name: 'activity',
      title: 'Course Name',
      type: 'string',
      description: 'Ex: "Danse : Classique"',
    }),
    defineField({
      name: 'day',
      title: 'Day',
      type: 'string',
      options: {
        list: [
          {title: 'Lundi', value: 'Lundi'},
          {title: 'Mardi', value: 'Mardi'},
          {title: 'Mercredi', value: 'Mercredi'},
          {title: 'Jeudi', value: 'Jeudi'},
          {title: 'Vendredi', value: 'Vendredi'},
          {title: 'Samedi', value: 'Samedi'},
          {title: 'Non défini', value: 'Non défini'},
        ],
      },
    }),
    defineField({
      name: 'time',
      title: 'Time',
      type: 'string',
      description: 'Ex: "17h00 – 21h00"',
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'Ex: "1h15 ou 1h30"',
    }),
    defineField({
      name: 'place',
      title: 'Place',
      type: 'string',
    }),
    defineField({
      name: 'teacher',
      title: 'Teacher',
      type: 'string',
    }),
  ],
  preview: {
    select: {title: 'activity', subtitle: 'day'},
  },
})
