import {defineType, defineField} from 'sanity'

export const homeGallerySection = defineType({
  name: 'homeGallerySection',
  title: 'Section Galerie (Accueil)',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Surtitre',
      type: 'string',
      description: 'Ex: "En images"',
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
      description: 'Ex: "Voir la galerie"',
    }),
  ],
})
