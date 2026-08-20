// sanity/schemaTypes/documents/siteContact.ts
// Source unique des coordonnées de l'association : pied de page, page Contact,
// section Contact de l'accueil. À modifier ici, et nulle part ailleurs.
import {defineType, defineField} from 'sanity'

export const siteContact = defineType({
  name: 'siteContact',
  title: 'Coordonnées',
  type: 'document',
  fields: [
    defineField({
      name: 'organisationName',
      title: "Nom de l'association",
      type: 'string',
      description: 'Ex: "Association ENVOL"',
    }),
    defineField({
      name: 'contactName',
      title: 'Personne à contacter',
      type: 'string',
      description: 'Ex: "Jean-Marc Caboni" — affiché à côté du téléphone.',
    }),
    defineField({
      name: 'phone',
      title: 'Téléphone',
      type: 'string',
      description: 'Ex: "06 70 01 30 60"',
    }),
    defineField({
      name: 'email',
      title: 'E-mail',
      type: 'string',
      validation: (R) => R.email().error('Adresse e-mail invalide.'),
    }),
    defineField({
      name: 'addressLine1',
      title: 'Adresse',
      type: 'string',
      description: 'Ex: "9 avenue Marius Ghirardelli"',
    }),
    defineField({
      name: 'addressLine2',
      title: "Complément d'adresse",
      type: 'string',
      description: 'Facultatif (bâtiment, étage…)',
    }),
    defineField({
      name: 'postalCode',
      title: 'Code postal',
      type: 'string',
      description: 'Ex: "13830"',
    }),
    defineField({
      name: 'city',
      title: 'Ville',
      type: 'string',
      description: 'Ex: "Roquefort-la-Bédoule"',
    }),
    defineField({
      name: 'openingHours',
      title: "Permanence / horaires d'accueil",
      type: 'string',
      description: 'Facultatif. Ex: "Mercredi et samedi, 10h – 12h"',
    }),
  ],
  preview: {
    prepare: () => ({title: 'Coordonnées'}),
  },
})
