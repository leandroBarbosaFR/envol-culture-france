// sanity/schemaTypes/documents/homePage.ts
import {defineType, defineField} from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'hero',
    }),
    defineField({
      name: 'about',
      title: 'About Section',
      type: 'about',
    }),
    defineField({
      name: 'activitiesEyebrow',
      title: 'Activities — Eyebrow',
      type: 'string',
      description: 'Ex: "Les activités"',
    }),
    defineField({
      name: 'activitiesTitle',
      title: 'Activities — Title',
      type: 'string',
    }),
    defineField({
      name: 'activitiesLinkLabel',
      title: 'Activities — Link Label',
      type: 'string',
      description: 'Ex: "Voir toutes les activités"',
    }),
    defineField({
      name: 'newsEyebrow',
      title: 'News — Eyebrow',
      type: 'string',
      description: 'Ex: "Nos actualités"',
    }),
    defineField({
      name: 'newsTitle',
      title: 'News — Title',
      type: 'string',
    }),
    defineField({
      name: 'newsLinkLabel',
      title: 'News — Link Label',
      type: 'string',
      description: 'Ex: "Voir toutes les actualités"',
    }),
    defineField({
      name: 'contact',
      title: 'Contact Section',
      type: 'contact',
    }),
  ],
})
