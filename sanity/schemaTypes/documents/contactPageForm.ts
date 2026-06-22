import {defineType, defineField} from 'sanity'

export const contactPageForm = defineType({
  name: 'contactPageForm',
  title: 'Formulaire de contact',
  type: 'document',
  fields: [
    defineField({
      name: 'formTitle',
      title: 'Titre du formulaire',
      type: 'string',
      description: 'Ex: "Écrivez-nous"',
    }),
    defineField({
      name: 'formSubtitle',
      title: 'Sous-titre du formulaire',
      type: 'string',
      description: 'Ex: "Nous répondons généralement sous 48 heures."',
    }),
  ],
})
