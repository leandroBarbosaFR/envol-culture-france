// sanity/structure.ts
import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // ── Singletons ──────────────────────────────
      S.listItem()
        .title('Site Settings')
        .icon(() => '⚙️')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),

      S.listItem()
        .title('Home Page')
        .icon(() => '🏠')
        .child(S.document().schemaType('homePage').documentId('homePage')),

      S.listItem()
        .title('About Page')
        .icon(() => '👥')
        .child(S.document().schemaType('aboutPage').documentId('aboutPage')),

      S.listItem()
        .title('Contact Page')
        .icon(() => '✉️')
        .child(S.document().schemaType('contactPage').documentId('contactPage')),

      S.listItem()
        .title('Activities Page')
        .icon(() => '🎨')
        .child(S.document().schemaType('activitiesPage').documentId('activitiesPage')),

      S.divider(),

      // ── Collections ─────────────────────────────
      S.documentTypeListItem('activity').title('Activities'),

      S.documentTypeListItem('newsPost').title('News'),
    ])
