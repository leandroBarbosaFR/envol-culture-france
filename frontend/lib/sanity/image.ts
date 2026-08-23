import { createImageUrlBuilder } from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url';
import { client } from './client';

const builder = createImageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/**
 * Asset URL converted to JPEG at full resolution. The originals are AVIF,
 * which plenty of photo viewers and printer drivers still refuse to open.
 */
export function printableUrl(assetUrl: string): string {
  return `${assetUrl}?fm=jpg&q=90`;
}

/**
 * Same image, but Sanity's `dl` parameter sets Content-Disposition so the
 * browser saves the file instead of navigating to it, under a readable name.
 * A plain `download` attribute would not work here — the CDN is cross-origin.
 */
export function downloadUrl(assetUrl: string, fileName: string): string {
  return `${printableUrl(assetUrl)}&dl=${encodeURIComponent(fileName)}.jpg`;
}

/** Turns a caption or alt text into a safe, readable download file name. */
export function toFileName(text: string | undefined, fallback = 'photo'): string {
  const slug = (text ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // strip accents left by NFD
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
  return slug || fallback;
}
