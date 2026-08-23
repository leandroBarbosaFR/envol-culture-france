// sanity/schemaTypes/documents/galeriePage.ts
import {defineType, defineField} from 'sanity'

export const galeriePage = defineType({
  name: 'galeriePage',
  title: 'Page Galerie',
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
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'images',
      title: 'Photos',
      type: 'array',
      of: [{type: 'galleryImage'}],
      options: {layout: 'grid'},
      description: "Glissez-déposez les photos pour changer l'ordre d'affichage.",
    }),
  ],
})
