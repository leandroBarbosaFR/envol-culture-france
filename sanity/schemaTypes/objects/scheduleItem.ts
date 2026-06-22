// sanity/schemaTypes/objects/scheduleItem.ts
import {defineType, defineField} from 'sanity'

export const scheduleItem = defineType({
  name: 'scheduleItem',
  title: 'Créneau',
  type: 'object',
  fields: [
    defineField({
      name: 'activity',
      title: 'Nom du cours',
      type: 'string',
      description: 'Ex: "Danse : Classique"',
    }),
    defineField({
      name: 'day',
      title: 'Jour',
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
      title: 'Heure',
      type: 'string',
      description: 'Ex: "17h00 – 21h00"',
    }),
    defineField({
      name: 'duration',
      title: 'Durée',
      type: 'string',
      description: 'Ex: "1h15 ou 1h30"',
    }),
    defineField({
      name: 'place',
      title: 'Lieu',
      type: 'string',
    }),
    defineField({
      name: 'teacher',
      title: 'Professeur(e)',
      type: 'string',
    }),
  ],
  preview: {
    select: {title: 'activity', subtitle: 'day'},
  },
})
