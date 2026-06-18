// sanity/schemaTypes/objects/socialLink.ts
import {defineType, defineField} from 'sanity'

export const socialLink = defineType({
  name: 'socialLink',
  title: 'Social Link',
  type: 'object',
  fields: [
    defineField({
      name: 'platform',
      title: 'Platform',
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
