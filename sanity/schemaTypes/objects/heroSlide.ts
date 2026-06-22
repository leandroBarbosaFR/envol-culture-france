// sanity/schemaTypes/objects/heroSlide.ts
import {defineType, defineField} from 'sanity'

export const heroSlide = defineType({
  name: 'heroSlide',
  title: 'Diapositive',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'alt',
      title: 'Texte alternatif',
      type: 'string',
    }),
    defineField({
      name: 'caption',
      title: 'Légende',
      type: 'string',
      description: 'Ex: "Musique"',
    }),
  ],
  preview: {
    select: {title: 'caption', media: 'image'},
  },
})
