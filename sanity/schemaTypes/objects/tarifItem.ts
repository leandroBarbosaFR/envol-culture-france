// sanity/schemaTypes/objects/tarifItem.ts
import {defineType, defineField} from 'sanity'

export const tarifItem = defineType({
  name: 'tarifItem',
  title: 'Tarif',
  type: 'object',
  fields: [
    defineField({
      name: 'activity',
      title: 'Formule',
      type: 'string',
      description: 'Ex: "Danse : Classique, Jazz, Éveil"',
    }),
    defineField({
      name: 'weekly',
      title: 'Durée hebdomadaire',
      type: 'string',
      description: 'Ex: "1h à 1h30"',
    }),
    defineField({
      name: 'price',
      title: 'Prix',
      type: 'string',
      description: 'Ex: "120 € / trimestre — hors commune 160 €"',
    }),
    defineField({
      name: 'age',
      title: "Tranche d'âge",
      type: 'string',
      description: 'Ex: "À partir de 3 ans"',
    }),
  ],
  preview: {
    select: {title: 'activity', subtitle: 'price'},
  },
})
