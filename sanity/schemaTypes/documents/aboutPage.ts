// sanity/schemaTypes/documents/aboutPage.ts
import {defineType, defineField} from 'sanity'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    // ── Page Header ─────────────────────────────
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'Ex: "Qui sommes-nous"',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),

    // ── Mission Section ──────────────────────────
    defineField({
      name: 'missionImage',
      title: 'Mission — Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'missionTitle',
      title: 'Mission — Title',
      type: 'string',
    }),
    defineField({
      name: 'missionParagraph1',
      title: 'Mission — Paragraph 1',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'missionParagraph2',
      title: 'Mission — Paragraph 2',
      type: 'text',
      rows: 4,
    }),

    // ── Stats ────────────────────────────────────
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [{type: 'statItem'}],
      validation: (R) => R.max(3),
    }),

    // ── Values ───────────────────────────────────
    defineField({
      name: 'valuesTitle',
      title: 'Values — Title',
      type: 'string',
    }),
    defineField({
      name: 'values',
      title: 'Values',
      type: 'array',
      of: [{type: 'valueItem'}],
    }),
  ],
})
