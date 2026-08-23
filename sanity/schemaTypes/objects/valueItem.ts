// sanity/schemaTypes/objects/valueItem.ts
import {defineType, defineField} from 'sanity'

export const valueItem = defineType({
  name: 'valueItem',
  title: 'Valeur',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Contenu',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      description:
        "Optionnelle. Sur la page d'accueil, les valeurs illustrées se superposent " +
        'au fil du défilement. Sans image, le bloc reste lisible sur un fond coloré.',
    }),
    defineField({
      name: 'alt',
      title: 'Texte alternatif',
      type: 'string',
      description: "Décrit l'image pour les lecteurs d'écran. Inutile sans image.",
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'body', media: 'image'},
  },
})
