import {defineType, defineField} from 'sanity'

export const homeContactSection = defineType({
  name: 'homeContactSection',
  title: 'Section Contact (Accueil)',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Surtitre',
      type: 'string',
      description: 'Ex: "Nous contacter"',
    }),
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
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
    // Les coordonnées viennent du document « Coordonnées » (siteContact).
    // Ancien champ conservé mais masqué.
    defineField({
      name: 'channels',
      title: 'Canaux de contact',
      type: 'array',
      of: [{type: 'contactChannel'}],
      hidden: true,
    }),
    defineField({
      name: 'socials',
      title: 'Réseaux sociaux',
      type: 'array',
      of: [{type: 'socialLink'}],
    }),
  ],
})
