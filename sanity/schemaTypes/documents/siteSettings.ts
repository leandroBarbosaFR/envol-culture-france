import {defineType, defineField} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'seoTitle',
      title: 'SEO — Meta Title',
      type: 'string',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO — Meta Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'header',
      title: 'Header',
      type: 'header',
    }),
    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'footer',
    }),
  ],
})
