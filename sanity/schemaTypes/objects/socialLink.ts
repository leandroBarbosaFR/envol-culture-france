// sanity/schemaTypes/objects/socialLink.ts
import {defineType, defineField} from 'sanity'

export const socialLink = defineType({
  name: 'socialLink',
  title: 'Réseau social',
  type: 'object',
  fields: [
    defineField({
      name: 'platform',
      title: 'Plateforme',
      type: 'string',
      options: {
        list: [
          {title: 'Facebook', value: 'facebook'},
          {title: 'Instagram', value: 'instagram'},
          {title: 'YouTube', value: 'youtube'},
        ],
      },
    }),
    defineField({
      name: 'href',
      title: 'URL',
      type: 'url',
    }),
  ],
  preview: {
    select: {title: 'platform', subtitle: 'href'},
  },
})
