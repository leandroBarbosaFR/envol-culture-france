import {defineMigration, at, patch, set, unset} from 'sanity/migrate'

/*
  `galleryImage` était un objet enveloppant une image ({image: {asset}}), ce qui
  interdisait l'import de plusieurs photos à la fois. Le type est désormais une
  image, donc l'asset (et son hotspot/crop) remonte à la racine de chaque item.
  Cette migration déplace les photos déjà en ligne vers la nouvelle forme.

  Lancer depuis sanity/ :
    npx sanity migration run flatten-gallery-images            # simulation
    npx sanity migration run flatten-gallery-images --no-dry-run
*/
export default defineMigration({
  title: 'Aplatit les photos d’album (image.asset → asset)',
  documentTypes: ['galleryAlbum'],

  migrate: {
    document(doc) {
      const images = Array.isArray(doc.images) ? doc.images : []

      const patches = images.flatMap((item: any) => {
        // Item déjà migré, ou emplacement vide : rien à déplacer.
        if (!item?._key || !item.image?.asset) return []
        const base = ['images', {_key: item._key}]
        return [
          at([...base, 'asset'], set(item.image.asset)),
          ...(item.image.hotspot ? [at([...base, 'hotspot'], set(item.image.hotspot))] : []),
          ...(item.image.crop ? [at([...base, 'crop'], set(item.image.crop))] : []),
          at([...base, 'image'], unset()),
        ]
      })

      if (patches.length === 0) return
      return patch(doc._id, patches)
    },
  },
})
