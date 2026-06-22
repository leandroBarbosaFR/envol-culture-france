import {defineType, defineField} from 'sanity'

export const siteHeader = defineType({
  name: 'siteHeader',
  title: 'En-tête',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Nom du site',
      type: 'string',
      description: 'Ex: "Envol Culture"',
    }),
    defineField({
      name: 'navLinks',
      title: 'Liens de navigation',
      type: 'array',
      of: [{type: 'navItem'}],
    }),
    defineField({
      name: 'primaryButtonLabel',
      title: 'Bouton principal — Libellé',
      type: 'string',
      description: 'Ex: "S\'inscrire"',
    }),
    defineField({
      name: 'primaryButtonUrl',
      title: 'Bouton principal — URL',
      type: 'string',
      description: 'Ex: "/inscription"',
    }),
    defineField({
      name: 'secondaryButtonLabel',
      title: 'Bouton secondaire — Libellé',
      type: 'string',
      description: 'Ex: "Se connecter"',
    }),
    defineField({
      name: 'secondaryButtonUrl',
      title: 'Bouton secondaire — URL',
      type: 'string',
      description: 'Ex: "/connexion"',
    }),
  ],
})
