// sanity/schemaTypes/objects/heroSlide.ts
import {defineType, defineField} from 'sanity'

export const heroSlide = defineType({
  name: 'heroSlide',
  title: 'Hero Slide',
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
      title: 'Alt Text',
      type: 'string',
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Ex: "Musique"',
    }),
  ],
  preview: {
    select: {title: 'caption', media: 'image'},
  },
})
