import {defineType, defineField} from 'sanity'

export const pageSeo = defineType({
  name: 'pageSeo',
  title: 'SEO de la page',
  type: 'document',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Titre SEO (Meta Title)',
      type: 'string',
      description: 'Le titre qui apparaît sur Google. Idéalement entre 50 et 60 caractères.',
      validation: (R) => R.max(70).warning('Le titre est trop long.'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Description SEO (Meta Description)',
      type: 'text',
      rows: 3,
      description: 'Le résumé qui apparaît sous le titre dans les résultats de recherche.',
      validation: (R) => R.max(160).warning('La description est trop longue.'),
    }),
    defineField({
      name: 'shareImage',
      title: 'Image de partage (Open Graph)',
      type: 'image',
      description: "L'image qui s'affiche lors du partage sur les réseaux sociaux.",
      options: {hotspot: true},
    }),
  ],
  preview: {
    select: {
      title: 'metaTitle',
      subtitle: 'metaDescription',
    },
    prepare({title, subtitle}: {title?: string; subtitle?: string}) {
      return {
        title: title || 'Sans titre (SEO)',
        subtitle: subtitle || 'Aucune description configurée',
      }
    },
  },
})
