// sanity/schemaTypes/documents/cookieBanner.ts
// Bandeau cookies : mode « information » tant qu'aucune catégorie optionnelle
// n'est proposée ; mode « consentement » (accepter / refuser / personnaliser)
// dès que « Mesure d'audience » est activée.
import {defineType, defineField} from 'sanity'

export const cookieBanner = defineType({
  name: 'cookieBanner',
  title: 'Bandeau cookies',
  type: 'document',
  groups: [
    {name: 'content', title: 'Textes', default: true},
    {name: 'categories', title: 'Catégories'},
    {name: 'labels', title: 'Boutons'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      group: 'content',
      initialValue: 'Cookies',
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      rows: 3,
      group: 'content',
      description: 'Texte principal du bandeau.',
      initialValue:
        "Ce site utilise uniquement des cookies strictement nécessaires à son fonctionnement. Aucun cookie publicitaire ni de mesure d'audience n'est déposé sans votre accord.",
    }),
    defineField({
      name: 'necessaryDescription',
      title: 'Description des cookies nécessaires',
      type: 'text',
      rows: 2,
      group: 'categories',
      initialValue:
        "Indispensables au fonctionnement du site (mémorisation de vos choix, connexion à l'espace adhérent). Ils ne peuvent pas être désactivés.",
    }),
    defineField({
      name: 'analyticsEnabled',
      title: 'Proposer la catégorie « Mesure d\'audience »',
      type: 'boolean',
      group: 'categories',
      initialValue: false,
      description:
        "À activer uniquement si un outil de mesure d'audience est installé sur le site. Le bandeau passe alors en mode consentement (Tout accepter / Tout refuser / Personnaliser).",
    }),
    defineField({
      name: 'analyticsDescription',
      title: 'Description « Mesure d\'audience »',
      type: 'text',
      rows: 2,
      group: 'categories',
      initialValue:
        'Nous aident à comprendre comment le site est utilisé (pages consultées, provenance) afin de l\'améliorer. Données anonymisées.',
    }),
    defineField({name: 'acknowledgeLabel', title: 'Bouton « compris » (mode information)', type: 'string', group: 'labels', initialValue: "J'ai compris"}),
    defineField({name: 'acceptLabel', title: 'Bouton « tout accepter »', type: 'string', group: 'labels', initialValue: 'Tout accepter'}),
    defineField({name: 'refuseLabel', title: 'Bouton « tout refuser »', type: 'string', group: 'labels', initialValue: 'Tout refuser'}),
    defineField({name: 'customizeLabel', title: 'Bouton « personnaliser »', type: 'string', group: 'labels', initialValue: 'Personnaliser'}),
    defineField({name: 'saveLabel', title: 'Bouton « enregistrer »', type: 'string', group: 'labels', initialValue: 'Enregistrer mes choix'}),
    defineField({name: 'policyLinkLabel', title: 'Lien vers la politique de confidentialité', type: 'string', group: 'labels', initialValue: 'Politique de confidentialité'}),
    defineField({name: 'manageLabel', title: 'Lien « gérer les cookies » (pied de page)', type: 'string', group: 'labels', initialValue: 'Gérer les cookies'}),
  ],
  preview: {prepare: () => ({title: 'Bandeau cookies'})},
})
