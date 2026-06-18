// sanity/structure.ts
import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Singleton
      S.listItem()
        .title('Site Settings')
        .icon(() => '⚙️')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),

      S.divider(),

      // Pages
      // S.listItem().title("Home Page").child(...),
      // S.documentTypeListItem("post").title("Posts"),
    ])
