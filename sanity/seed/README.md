# Seed — page « Tarifs & Horaires »

`tarifs-horaires.ndjson` crée le document `tarifsHorairesPage` avec les deux
tableaux pré-remplis (17 lignes de tarifs, 25 créneaux), repris des fiches
activité et de l'ancien site. Import effectué le 2026-08-20 sur `production`. Pour ré-importer (écrase le document) :

```sh
cd sanity
nvm use
npx sanity dataset import seed/tarifs-horaires.ndjson --dataset production --replace
```

Le compte utilisé doit être membre du projet `yrndrbta` (rôle Éditeur ou
Administrateur). Le dossier peut être supprimé après l'import.

## `site-contact.ndjson` — Coordonnées

Crée le document `siteContact` (adresse, téléphone, e-mail) utilisé par le pied
de page, la page Contact et l'accueil. Importé le 2026-08-21. Ré-import :

```sh
npx sanity dataset import seed/site-contact.ndjson --dataset production --replace
```

## `legal-pages.ndjson` — Mentions légales & Politique de confidentialité

Crée les deux documents `legalPage` (`mentionsLegales`, `politiqueConfidentialite`)
avec un texte de départ en français (à faire valider ; RNA/SIRET à compléter).
Importé le 2026-08-21. Ré-import (écrase le texte édité dans le Studio !) :

```sh
npx sanity dataset import seed/legal-pages.ndjson --dataset production --replace
```

## `cookie-banner.ndjson` — Bandeau cookies

Crée le document `cookieBanner` (textes et boutons du bandeau). Importé le 2026-08-21.
