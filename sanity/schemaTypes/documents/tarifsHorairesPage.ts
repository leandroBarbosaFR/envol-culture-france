// sanity/schemaTypes/documents/tarifsHorairesPage.ts
// Page unique « Tarifs & Horaires » : deux onglets dans le Studio, deux boutons sur le site.
import {defineType, defineField, defineArrayMember} from 'sanity'

const contentField = (name: string, title: string, group: 'tarifs' | 'horaires') =>
  defineField({
    name,
    title,
    type: 'array',
    group,
    description:
      'Cliquez sur « + » puis « Tableau » pour insérer un tableau. ' +
      'Survolez une ligne ou une colonne pour l\'ajouter, la déplacer ou la supprimer. ' +
      'Vous pouvez aussi écrire un paragraphe avant ou après le tableau.',
    of: [
      defineArrayMember({
        type: 'block',
        styles: [
          {title: 'Normal', value: 'normal'},
          {title: 'Titre de section', value: 'h2'},
        ],
        lists: [],
        marks: {
          decorators: [
            {title: 'Gras', value: 'strong'},
            {title: 'Italique', value: 'em'},
          ],
          annotations: [],
        },
      }),
      defineArrayMember({type: 'table'}),
    ],
  })

export const tarifsHorairesPage = defineType({
  name: 'tarifsHorairesPage',
  title: 'Tarifs & Horaires',
  type: 'document',
  groups: [
    {name: 'tarifs', title: 'Tarifs', default: true},
    {name: 'horaires', title: 'Horaires'},
  ],
  fields: [
    // ── Onglet Tarifs ────────────────────────────────────────────────────────
    defineField({
      name: 'tarifsTabLabel',
      title: 'Libellé du bouton',
      type: 'string',
      group: 'tarifs',
      description: 'Texte du bouton en haut de la page. Ex: "Tarifs des activités"',
      initialValue: 'Tarifs des activités',
    }),
    defineField({
      name: 'tarifsEyebrow',
      title: 'Surtitre',
      type: 'string',
      group: 'tarifs',
      description: 'Ex: "Tarifs"',
    }),
    defineField({
      name: 'tarifsTitle',
      title: 'Titre',
      type: 'string',
      group: 'tarifs',
      description: 'Ex: "Les tarifs des activités"',
    }),
    defineField({
      name: 'tarifsDescription',
      title: 'Description',
      type: 'text',
      rows: 3,
      group: 'tarifs',
    }),
    contentField('tarifsContent', 'Contenu — tableau des tarifs', 'tarifs'),

    // ── Onglet Horaires ──────────────────────────────────────────────────────
    defineField({
      name: 'horairesTabLabel',
      title: 'Libellé du bouton',
      type: 'string',
      group: 'horaires',
      description: 'Texte du bouton en haut de la page. Ex: "Horaires des activités"',
      initialValue: 'Horaires des activités',
    }),
    defineField({
      name: 'horairesEyebrow',
      title: 'Surtitre',
      type: 'string',
      group: 'horaires',
      description: 'Ex: "Horaires"',
    }),
    defineField({
      name: 'horairesTitle',
      title: 'Titre',
      type: 'string',
      group: 'horaires',
      description: 'Ex: "Le planning des activités"',
    }),
    defineField({
      name: 'horairesDescription',
      title: 'Description',
      type: 'text',
      rows: 3,
      group: 'horaires',
    }),
    contentField('horairesContent', 'Contenu — tableau des horaires', 'horaires'),
  ],
  preview: {
    prepare: () => ({title: 'Tarifs & Horaires'}),
  },
})
