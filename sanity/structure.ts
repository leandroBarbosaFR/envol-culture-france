import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenu')
    .items([
      // ── Paramètres Généraux ──────────────────────────────────────────────────
      S.listItem()
        .title('Paramètres généraux')
        .child(
          S.list()
            .title('Paramètres généraux')
            .items([
              S.listItem()
                .title('En-tête')
                .child(S.editor().schemaType('siteHeader').documentId('siteHeader')),
              S.listItem()
                .title('Pied de page')
                .child(S.editor().schemaType('siteFooter').documentId('siteFooter')),
              S.listItem()
                .title('Coordonnées')
                .child(S.editor().schemaType('siteContact').documentId('siteContact')),
              S.listItem()
                .title('Bandeau cookies')
                .child(S.editor().schemaType('cookieBanner').documentId('cookieBanner')),
              S.listItem()
                .title('🔍 SEO global')
                .child(
                  S.editor()
                    .schemaType('pageSeo')
                    .documentId('seoGlobal')
                    .title('SEO global (valeurs par défaut)'),
                ),
            ]),
        ),

      S.divider(),

      // ── Page d'accueil ───────────────────────────────────────────────────────
      S.listItem()
        .title("Page d'accueil")
        .child(
          S.list()
            .title("Page d'accueil")
            .items([
              S.listItem()
                .title('🔍 SEO')
                .child(
                  S.editor()
                    .schemaType('pageSeo')
                    .documentId('seoHome')
                    .title("SEO — Page d'accueil"),
                ),
              S.divider(),
              S.listItem()
                .title("Bannière d'accueil")
                .child(S.editor().schemaType('heroSection').documentId('heroSection')),
              S.listItem()
                .title('Section À propos')
                .child(
                  S.editor().schemaType('homeAboutSection').documentId('homeAboutSection'),
                ),
              S.listItem()
                .title('Section Activités')
                .child(
                  S.editor()
                    .schemaType('homeActivitiesSection')
                    .documentId('homeActivitiesSection'),
                ),
              S.listItem()
                .title('Section Actualités')
                .child(
                  S.editor().schemaType('homeNewsSection').documentId('homeNewsSection'),
                ),
              S.listItem()
                .title('Section Galerie')
                .child(
                  S.editor()
                    .schemaType('homeGallerySection')
                    .documentId('homeGallerySection'),
                ),
              S.listItem()
                .title('Section Contact')
                .child(
                  S.editor().schemaType('homeContactSection').documentId('homeContactSection'),
                ),
            ]),
        ),

      // ── À propos ─────────────────────────────────────────────────────────────
      S.listItem()
        .title('À propos')
        .child(
          S.list()
            .title('À propos')
            .items([
              S.listItem()
                .title('🔍 SEO')
                .child(
                  S.editor()
                    .schemaType('pageSeo')
                    .documentId('seoAbout')
                    .title('SEO — À propos'),
                ),
              S.divider(),
              S.listItem()
                .title('En-tête & Mission')
                .child(S.editor().schemaType('aboutPageIntro').documentId('aboutPageIntro')),
              S.listItem()
                .title('Chiffres clés')
                .child(S.editor().schemaType('aboutPageStats').documentId('aboutPageStats')),
              S.listItem()
                .title('Nos valeurs')
                .child(S.editor().schemaType('aboutPageValues').documentId('aboutPageValues')),
            ]),
        ),

      // ── Activités ────────────────────────────────────────────────────────────
      S.listItem()
        .title('Activités')
        .child(
          S.list()
            .title('Activités')
            .items([
              S.listItem()
                .title('🔍 SEO')
                .child(
                  S.editor()
                    .schemaType('pageSeo')
                    .documentId('seoActivities')
                    .title('SEO — Activités'),
                ),
              S.divider(),
              S.listItem()
                .title('Contenu de la page')
                .child(S.editor().schemaType('activitiesPage').documentId('activitiesPage')),
              S.listItem()
                .title('Liste des activités')
                .child(S.documentTypeList('activity').title('Activités')),
            ]),
        ),

      // ── Actualités ───────────────────────────────────────────────────────────
      S.listItem()
        .title('Actualités')
        .child(
          S.list()
            .title('Actualités')
            .items([
              S.listItem()
                .title('🔍 SEO')
                .child(
                  S.editor()
                    .schemaType('pageSeo')
                    .documentId('seoActualites')
                    .title('SEO — Actualités'),
                ),
              S.divider(),
              S.listItem()
                .title('Contenu de la page')
                .child(S.editor().schemaType('actualitesPage').documentId('actualitesPage')),
              S.listItem()
                .title('Articles')
                .child(S.documentTypeList('newsPost').title('Articles')),
            ]),
        ),

      // ── Galerie ──────────────────────────────────────────────────────────────
      S.listItem()
        .title('Galerie')
        .child(
          S.list()
            .title('Galerie')
            .items([
              S.listItem()
                .title('🔍 SEO')
                .child(
                  S.editor()
                    .schemaType('pageSeo')
                    .documentId('seoGalerie')
                    .title('SEO — Galerie'),
                ),
              S.divider(),
              S.listItem()
                .title('Contenu de la page')
                .child(S.editor().schemaType('galeriePage').documentId('galeriePage')),
            ]),
        ),

      // ── Tarifs & Horaires ────────────────────────────────────────────────────
      S.listItem()
        .title('Tarifs & Horaires')
        .child(
          S.list()
            .title('Tarifs & Horaires')
            .items([
              S.listItem()
                .title('🔍 SEO')
                .child(
                  S.editor()
                    .schemaType('pageSeo')
                    .documentId('seoTarifsHoraires')
                    .title('SEO — Tarifs & Horaires'),
                ),
              S.divider(),
              S.listItem()
                .title('Contenu de la page')
                .child(
                  S.editor()
                    .schemaType('tarifsHorairesPage')
                    .documentId('tarifsHorairesPage'),
                ),
            ]),
        ),

      // ── Contact ──────────────────────────────────────────────────────────────
      S.listItem()
        .title('Contact')
        .child(
          S.list()
            .title('Contact')
            .items([
              S.listItem()
                .title('🔍 SEO')
                .child(
                  S.editor()
                    .schemaType('pageSeo')
                    .documentId('seoContact')
                    .title('SEO — Contact'),
                ),
              S.divider(),
              S.listItem()
                .title('En-tête & Coordonnées')
                .child(S.editor().schemaType('contactPageInfo').documentId('contactPageInfo')),
              S.listItem()
                .title('Formulaire')
                .child(S.editor().schemaType('contactPageForm').documentId('contactPageForm')),
            ]),
        ),

      S.divider(),

      // ── Pages légales ────────────────────────────────────────────────────────
      S.listItem()
        .title('Pages légales')
        .child(
          S.list()
            .title('Pages légales')
            .items([
              S.listItem()
                .title('Mentions légales')
                .child(
                  S.editor()
                    .schemaType('legalPage')
                    .documentId('mentionsLegales')
                    .title('Mentions légales'),
                ),
              S.listItem()
                .title('Politique de confidentialité')
                .child(
                  S.editor()
                    .schemaType('legalPage')
                    .documentId('politiqueConfidentialite')
                    .title('Politique de confidentialité'),
                ),
            ]),
        ),
    ])
