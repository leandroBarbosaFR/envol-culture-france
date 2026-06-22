import {defineType, defineField} from 'sanity'

export const homeNewsSection = defineType({
  name: 'homeNewsSection',
  title: 'Section Actualités (Accueil)',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Surtitre',
      type: 'string',
      description: 'Ex: "Nos actualités"',
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
      description: 'Ex: "Voir toutes les actualités"',
    }),
  ],
})
