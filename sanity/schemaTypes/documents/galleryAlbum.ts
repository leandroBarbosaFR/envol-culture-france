// sanity/schemaTypes/documents/galleryAlbum.ts
import {defineType, defineField} from 'sanity'

export const galleryAlbum = defineType({
  name: 'galleryAlbum',
  title: 'Album photo',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      description: 'Ex : « Gala de danse 2026 », « Bal 2027 ».',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Adresse URL (slug)',
      type: 'slug',
      options: {source: 'title'},
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date de l’événement',
      type: 'date',
      options: {dateFormat: 'DD/MM/YYYY'},
      description: 'Sert à classer les albums, du plus récent au plus ancien.',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Optionnel — affichée en haut de l’album.',
    }),
    defineField({
      name: 'coverImage',
      title: 'Image de couverture',
      type: 'image',
      options: {hotspot: true},
      description:
        'Optionnel — visuel de la vignette dans la galerie. ' +
        'Si vide, la première photo de l’album est utilisée.',
    }),
    defineField({
      name: 'images',
      title: 'Photos',
      type: 'array',
      of: [{type: 'galleryImage'}],
      options: {layout: 'grid'},
      description: 'Glissez-déposez les photos pour changer l’ordre d’affichage.',
    }),
  ],
  orderings: [
    {
      title: 'Date (plus récent en premier)',
      name: 'dateDesc',
      by: [{field: 'date', direction: 'desc'}],
    },
    {
      title: 'Date (plus ancien en premier)',
      name: 'dateAsc',
      by: [{field: 'date', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      cover: 'coverImage',
      firstPhoto: 'images.0.image',
      images: 'images',
    },
    prepare({title, date, cover, firstPhoto, images}) {
      const count = Array.isArray(images) ? images.length : 0
      // A Sanity `date` is a plain YYYY-MM-DD; `new Date()` would read it as
      // UTC midnight and slip a day for editors west of Greenwich.
      const when = typeof date === 'string' ? date.split('-').reverse().join('/') : null
      const photos = `${count} photo${count > 1 ? 's' : ''}`
      return {
        title,
        subtitle: [when, photos].filter(Boolean).join(' · '),
        media: cover ?? firstPhoto,
      }
    },
  },
})
