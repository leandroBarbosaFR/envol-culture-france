import {useCallback, useRef, useState} from 'react'
import {Button, Stack} from '@sanity/ui'
// @sanity/ui v4 a déplacé le hook de toasts sur un sous-chemin.
import {useToast} from '@sanity/ui/toast'
// @sanity/icons v5 a retiré les icônes nommées de l'entrée racine : elles n'y
// subsistent que comme déclarations `never`, d'où un import qui compile mais
// casse au runtime. Chaque icône a désormais son propre sous-chemin.
import {ImagesIcon} from '@sanity/icons/Images'
import {
  insert,
  setIfMissing,
  useClient,
  useFormValue,
  type ArrayOfObjectsInputProps,
} from 'sanity'

/*
  Sanity n'ouvre jamais le sélecteur de fichiers en mode multiple : son bouton
  « Télécharger » monte un <input type="file"> sans l'attribut `multiple`, et la
  médiathèque intégrée reste en sélection unique (sanity-io/sanity#1547). Seul
  le glisser-déposer accepte un lot. Ce bouton comble le manque : un clic, une
  sélection entière dans le Finder, tout part d'un coup.

  Chaque photo reçoit aussi un texte alternatif par défaut — sans quoi il
  faudrait rouvrir les 40 vignettes une à une pour les remplir.
*/

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz0123456789'

/** Clé d'item de tableau, au même format que celles générées par le Studio. */
function randomKey(length = 12): string {
  const bytes = crypto.getRandomValues(new Uint8Array(length))
  return Array.from(bytes, (b) => ALPHABET[b % ALPHABET.length]).join('')
}

/**
 * Texte alternatif de repli : « Gala de danse 2026 — photo 3 ». Générique mais
 * descriptif, et surtout rectifiable photo par photo quand le temps le permet.
 */
function defaultAlt(albumTitle: string | undefined, position: number): string {
  const label = `photo ${position + 1}`
  return albumTitle ? `${albumTitle} — ${label}` : label[0].toUpperCase() + label.slice(1)
}

export function MultiPhotoInput(props: ArrayOfObjectsInputProps) {
  const {onChange, value, schemaType} = props
  const client = useClient({apiVersion: '2024-01-01'})
  const albumTitle = useFormValue(['title']) as string | undefined
  const toast = useToast()
  const fileInput = useRef<HTMLInputElement>(null)
  const [progress, setProgress] = useState<{done: number; total: number} | null>(null)

  // Le nom du type membre porte le `_type` des items : on le lit dans le schéma
  // plutôt que de le coder en dur, pour que le champ reste réutilisable.
  const memberType = schemaType.of[0]?.name ?? 'image'

  const handleFiles = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(event.currentTarget.files ?? [])
      // Vidé tout de suite : sans ça, resélectionner les mêmes fichiers
      // n'émettrait pas de nouvel évènement `change`.
      event.currentTarget.value = ''
      if (files.length === 0) return

      setProgress({done: 0, total: files.length})
      let added = 0

      try {
        for (const file of files) {
          const asset = await client.assets.upload('image', file, {filename: file.name})
          onChange([
            setIfMissing([]),
            insert(
              [
                {
                  _key: randomKey(),
                  _type: memberType,
                  alt: defaultAlt(albumTitle, (value?.length ?? 0) + added),
                  asset: {_type: 'reference', _ref: asset._id},
                },
              ],
              'after',
              [-1],
            ),
          ])
          added += 1
          setProgress({done: added, total: files.length})
        }
        toast.push({
          status: 'success',
          title: `${added} photo${added > 1 ? 's' : ''} ajoutée${added > 1 ? 's' : ''}`,
          description: 'Pensez à préciser les textes alternatifs.',
        })
      } catch (err) {
        toast.push({
          status: 'error',
          title: added > 0 ? `Import interrompu après ${added} photo(s)` : 'Échec de l’import',
          description: err instanceof Error ? err.message : String(err),
        })
      } finally {
        setProgress(null)
      }
    },
    [albumTitle, client, memberType, onChange, toast, value],
  )

  return (
    <Stack gap={3}>
      {props.renderDefault(props)}
      <Stack>
        <input
          ref={fileInput}
          type="file"
          accept="image/*"
          multiple
          style={{display: 'none'}}
          onChange={handleFiles}
        />
        <Button
          icon={ImagesIcon}
          mode="ghost"
          disabled={progress !== null || props.readOnly}
          onClick={() => fileInput.current?.click()}
          text={
            progress
              ? `Import en cours… ${progress.done}/${progress.total}`
              : 'Ajouter plusieurs photos'
          }
        />
      </Stack>
    </Stack>
  )
}
