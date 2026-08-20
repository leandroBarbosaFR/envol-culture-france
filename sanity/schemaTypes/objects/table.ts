// sanity/schemaTypes/objects/table.ts
// Forme « canonique » attendue par l'éditeur de tableaux intégré au Studio (≥ 6.6) :
// table { headerRows, rows[] → row { cells[] → cell { value[] (blocs) } } }
// Les noms `table`, `rows`, `row`, `cells`, `cell`, `value` et `headerRows` ne doivent pas changer.
import {defineType, defineField, defineArrayMember} from 'sanity'

export const table = defineType({
  name: 'table',
  title: 'Tableau',
  type: 'object',
  fields: [
    defineField({
      name: 'headerRows',
      title: "Lignes d'en-tête",
      type: 'number',
      description: 'Nombre de lignes affichées comme en-tête du tableau (généralement 1).',
    }),
    defineField({
      name: 'rows',
      title: 'Lignes',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'row',
          title: 'Ligne',
          type: 'object',
          fields: [
            defineField({
              name: 'cells',
              title: 'Cellules',
              type: 'array',
              of: [
                defineArrayMember({
                  name: 'cell',
                  title: 'Cellule',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'value',
                      title: 'Contenu',
                      type: 'array',
                      of: [
                        defineArrayMember({
                          type: 'block',
                          styles: [{title: 'Normal', value: 'normal'}],
                          lists: [],
                          marks: {
                            decorators: [
                              {title: 'Gras', value: 'strong'},
                              {title: 'Italique', value: 'em'},
                            ],
                            annotations: [],
                          },
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {rows: 'rows', headerRows: 'headerRows'},
    prepare({rows, headerRows}: {rows?: {cells?: unknown[]}[]; headerRows?: number}) {
      const rowList = Array.isArray(rows) ? rows : []
      const n = rowList.length
      const firstCells = n > 0 ? rowList[0].cells : undefined
      const cols = Array.isArray(firstCells) ? firstCells.length : 0
      return {
        title: 'Tableau',
        subtitle: `${n} ligne${n > 1 ? 's' : ''} × ${cols} colonne${cols > 1 ? 's' : ''}${
          headerRows ? ' — avec en-tête' : ''
        }`,
      }
    },
  },
})
