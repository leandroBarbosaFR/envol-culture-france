import {defineType, defineField} from 'sanity'

export const homeActivitiesSection = defineType({
  name: 'homeActivitiesSection',
  title: 'Section Activités (Accueil)',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Surtitre',
      type: 'string',
      description: 'Ex: "Les activités"',
    }),
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
    }),
    defineField({
      name: 'linkLabel',
      title: 'Libellé du lien',
      type: 'string',
      description: 'Ex: "Voir toutes les activités"',
    }),
  ],
})
