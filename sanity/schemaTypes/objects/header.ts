// sanity/schemaTypes/objects/header.ts
import {defineType, defineField} from 'sanity'

export const header = defineType({
  name: 'header',
  title: 'Header',
  type: 'object',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      description: 'Ex: "Envol Culture"',
    }),
    defineField({
      name: 'navLinks',
      title: 'Navigation Links',
      type: 'array',
      of: [{type: 'navItem'}],
    }),
    defineField({
      name: 'primaryButtonLabel',
      title: 'Primary Button — Label',
      type: 'string',
      description: 'Ex: "S\'inscrire"',
    }),
    defineField({
      name: 'primaryButtonUrl',
      title: 'Primary Button — URL',
      type: 'string',
      description: 'Ex: "/inscription"',
    }),
    defineField({
      name: 'secondaryButtonLabel',
      title: 'Secondary Button — Label',
      type: 'string',
      description: 'Ex: "Se connecter"',
    }),
    defineField({
      name: 'secondaryButtonUrl',
      title: 'Secondary Button — URL',
      type: 'string',
      description: 'Ex: "/connexion"',
    }),
  ],
})
