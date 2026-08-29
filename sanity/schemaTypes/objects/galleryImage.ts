import {defineType, defineField} from 'sanity'

/*
  Déclaré comme `image` — et non comme un objet contenant une image — pour que
  le Studio accepte plusieurs fichiers d'un coup : glisser-déposer d'une
  sélection entière, ou « Select » avec sélection multiple dans la médiathèque.
  Un objet enveloppant l'image force l'ajout photo par photo.
  Le texte alternatif et la légende s'éditent via le crayon sur la vignette.
*/
export const galleryImage = defineType({
  name: 'galleryImage',
  title: 'Photo',
  type: 'image',
  options: {hotspot: true},
  fields: [
    defineField({
      name: 'alt',
      title: 'Texte alternatif',
      type: 'string',
      description:
        "Décrit la photo pour les personnes qui utilisent un lecteur d'écran. " +
        'Ex : « Atelier de peinture, séance du mercredi ».',
      // Avertissement plutôt qu'erreur : après un import de 40 photos, une règle
      // bloquante empêcherait toute publication tant que les 40 textes ne sont
      // pas saisis. Le Studio signale les photos sans texte, sans bloquer.
      validation: (R) => R.required().warning('Ajoutez un texte alternatif pour l’accessibilité.'),
    }),
    defineField({
      name: 'caption',
      title: 'Légende',
      type: 'string',
      description: 'Optionnel — affichée sous la photo.',
    }),
  ],
  preview: {
    select: {title: 'alt', subtitle: 'caption', media: 'asset'},
  },
})
