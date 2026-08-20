// sanity/schemaTypes/documents/legalPage.ts
// Pages légales (Mentions légales, Politique de confidentialité) : un seul type,
// deux documents à identifiants fixes (`mentionsLegales`, `politiqueConfidentialite`).
import {defineType, defineField, defineArrayMember} from 'sanity'

export const legalPage = defineType({
  name: 'legalPage',
  title: 'Page légale',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Dernière mise à jour',
      type: 'date',
      options: {dateFormat: 'DD/MM/YYYY'},
      description: 'Affichée sous le titre de la page.',
    }),
    defineField({
      name: 'showContact',
      title: "Afficher les coordonnées de l'association",
      type: 'boolean',
      initialValue: true,
      description:
        'Insère en haut de page un encart avec les coordonnées du document « Coordonnées » (toujours à jour).',
    }),
    defineField({
      name: 'body',
      title: 'Contenu',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Titre de section', value: 'h2'},
            {title: 'Sous-titre', value: 'h3'},
          ],
          lists: [
            {title: 'Liste à puces', value: 'bullet'},
            {title: 'Liste numérotée', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Gras', value: 'strong'},
              {title: 'Italique', value: 'em'},
            ],
            annotations: [
              defineArrayMember({
                name: 'link',
                title: 'Lien',
                type: 'object',
                fields: [
                  defineField({
                    name: 'href',
                    title: 'URL',
                    type: 'url',
                    validation: (R) =>
                      R.uri({scheme: ['http', 'https', 'mailto', 'tel'], allowRelative: true}),
                  }),
                ],
              }),
            ],
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'lastUpdated'},
    prepare({title, subtitle}: {title?: string; subtitle?: string}) {
      return {title: title || 'Page légale', subtitle: subtitle ? `Mise à jour : ${subtitle}` : undefined}
    },
  },
})
