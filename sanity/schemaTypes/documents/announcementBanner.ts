// sanity/schemaTypes/documents/announcementBanner.ts
// Bandeau d'annonce temporaire (ex: dates de permanence inscriptions),
// affiché en haut de la page d'accueil tant que `active` est coché et que
// la date du jour est comprise entre `startDate` et `endDate` (bornes optionnelles).
import {defineType, defineField} from 'sanity'

export const announcementBanner = defineType({
  name: 'announcementBanner',
  title: "Bandeau d'annonce",
  type: 'document',
  fields: [
    defineField({
      name: 'active',
      title: 'Afficher le bandeau',
      type: 'boolean',
      initialValue: false,
      description: "Coupe-circuit manuel : décochez pour masquer le bandeau immédiatement, même s'il est dans sa période de diffusion.",
    }),
    defineField({
      name: 'text',
      title: 'Texte',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
      description: 'Le texte défile horizontalement dans le bandeau.',
    }),
    defineField({
      name: 'startDate',
      title: 'Date de début',
      type: 'date',
      description: 'Optionnel. Le bandeau ne s\'affiche pas avant cette date.',
    }),
    defineField({
      name: 'endDate',
      title: 'Date de fin',
      type: 'date',
      description: "Optionnel. Le bandeau disparaît automatiquement le lendemain de cette date.",
    }),
  ],
  preview: {
    select: {subtitle: 'text', active: 'active'},
    prepare: ({subtitle, active}) => ({
      title: "Bandeau d'annonce",
      subtitle: active ? subtitle : `(masqué) ${subtitle ?? ''}`,
    }),
  },
})
