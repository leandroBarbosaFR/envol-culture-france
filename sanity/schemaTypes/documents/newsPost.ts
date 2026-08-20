// sanity/schemaTypes/documents/newsPost.ts
import {defineType, defineField} from 'sanity'

export const newsPost = defineType({
  name: 'newsPost',
  title: 'Actualité',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Adresse URL (slug)',
      type: 'slug',
      options: {source: 'title'},
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      options: {dateFormat: 'DD/MM/YYYY'},
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          {title: 'Événement', value: 'Événement'},
          {title: 'Atelier', value: 'Atelier'},
          {title: "Vie de l'asso", value: "Vie de l'asso"},
        ],
      },
    }),
    defineField({
      name: 'excerpt',
      title: 'Extrait',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'body',
      title: 'Contenu',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Contenu complet de l\'article',
    }),
    defineField({
      name: 'image',
      title: 'Image de couverture',
      type: 'image',
      options: {hotspot: true},
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'category', media: 'image'},
  },
})
