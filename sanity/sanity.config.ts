import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {frFRLocale} from '@sanity/locale-fr-fr'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'

export default defineConfig({
  name: 'envol-culture-france',
  title: 'Envol Culture France',

  projectId: 'yrndrbta',
  dataset: 'production',

  plugins: [structureTool({structure}), visionTool(), frFRLocale()],

  schema: {
    types: schemaTypes,
  },

  form: {
    components: {
      portableText: {
        // Active l'éditeur de tableaux intégré (Studio ≥ 6.6) dans les champs
        // de texte riche qui déclarent {type: 'table'} dans leur liste `of`.
        plugins: (props) =>
          props.renderDefault({
            ...props,
            plugins: {...props.plugins, table: {enabled: true}},
          }),
      },
    },
  },
})
