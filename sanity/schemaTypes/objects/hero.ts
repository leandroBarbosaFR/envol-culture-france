// sanity/schemaTypes/objects/hero.ts
import {defineType, defineField} from 'sanity'

export const hero = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'object',
  fields: [
    defineField({
      name: 'titleLine1',
      title: 'Title — Line 1',
      type: 'string',
      description: 'Ex: "Laissez votre créativité"',
    }),
    defineField({
      name: 'titleLine2',
      title: 'Title — Line 2 (gradient)',
      type: 'string',
      description: 'Ex: "s\'exprimer"',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'primaryButtonLabel',
      title: 'Primary Button — Label',
      type: 'string',
    }),
    defineField({
      name: 'primaryButtonUrl',
      title: 'Primary Button — URL',
      type: 'string',
    }),
    defineField({
      name: 'secondaryButtonLabel',
      title: 'Secondary Button — Label',
      type: 'string',
    }),
    defineField({
      name: 'secondaryButtonUrl',
      title: 'Secondary Button — URL',
      type: 'string',
    }),
    defineField({
      name: 'slides',
      title: 'Slides',
      type: 'array',
      of: [{type: 'heroSlide'}],
    }),
  ],
})
