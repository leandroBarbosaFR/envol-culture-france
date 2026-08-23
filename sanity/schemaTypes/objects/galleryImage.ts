import {defineType, defineField} from 'sanity'

export const galleryImage = defineType({
  name: 'galleryImage',
  title: 'Photo',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Texte alternatif',
      type: 'string',
      description:
        "Décrit la photo pour les personnes qui utilisent un lecteur d'écran. " +
        'Ex : « Atelier de peinture, séance du mercredi ».',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Légende',
      type: 'string',
      description: 'Optionnel — affichée sous la photo.',
    }),
  ],
  preview: {
    select: {title: 'alt', subtitle: 'caption', media: 'image'},
  },
})
