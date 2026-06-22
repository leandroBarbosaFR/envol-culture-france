import {defineType, defineField} from 'sanity'

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Hero',
  type: 'document',
  fields: [
    defineField({
      name: 'titleLine1',
      title: 'Titre — Ligne 1',
      type: 'string',
      description: 'Ex: "Laissez votre créativité"',
    }),
    defineField({
      name: 'titleLine2',
      title: 'Titre — Ligne 2 (gradient)',
      type: 'string',
      description: "Ex: \"s'exprimer\"",
    }),
    defineField({
      name: 'subtitle',
      title: 'Sous-titre',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'primaryButtonLabel',
      title: 'Bouton principal — Libellé',
      type: 'string',
    }),
    defineField({
      name: 'primaryButtonUrl',
      title: 'Bouton principal — URL',
      type: 'string',
    }),
    defineField({
      name: 'secondaryButtonLabel',
      title: 'Bouton secondaire — Libellé',
      type: 'string',
    }),
    defineField({
      name: 'secondaryButtonUrl',
      title: 'Bouton secondaire — URL',
      type: 'string',
    }),
    defineField({
      name: 'slides',
      title: 'Diapositives',
      type: 'array',
      of: [{type: 'heroSlide'}],
    }),
  ],
})
