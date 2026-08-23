// sanity/schemaTypes/documents/activity.ts
import {defineType, defineField, defineArrayMember} from 'sanity'

export const activity = defineType({
  name: 'activity',
  title: 'Activité',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Adresse URL (slug)',
      type: 'slug',
      options: {source: 'name'},
    }),
    defineField({
      name: 'tagline',
      title: 'Accroche',
      type: 'string',
      description: 'Ex: "Éveil musical, chant et instruments"',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: 'Texte affiché sur la page et les cartes activité.',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'body',
      title: 'Contenu détaillé',
      type: 'array',
      description:
        "Texte long affiché sous l'image sur la page de l'activité : déroulé des " +
        'cours, niveaux, matériel… Laisser vide pour ne rien afficher.',
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
    defineField({
      name: 'highlightsTitle',
      title: 'Points forts — Titre',
      type: 'string',
    }),
    defineField({
      name: 'highlights',
      title: 'Points forts',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Ex: "Cours individuels de 30 minutes par semaine"',
    }),
    // Horaires et tarifs sont désormais gérés dans la page « Tarifs & Horaires »
    // (tableaux). Les champs ci-dessous sont masqués mais conservés : le site les
    // affiche encore tant que les nouveaux tableaux sont vides.
    defineField({
      name: 'scheduleItems',
      title: 'Horaires',
      type: 'array',
      of: [{type: 'scheduleItem'}],
      hidden: true,
    }),
    defineField({
      name: 'tarifItems',
      title: 'Tarifs',
      type: 'array',
      of: [{type: 'tarifItem'}],
      hidden: true,
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'tagline', media: 'image'},
  },
})
