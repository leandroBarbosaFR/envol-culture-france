/**
 * Sanity `date` fields arrive as plain `YYYY-MM-DD`. Parsing that with the
 * Date constructor reads it as UTC midnight, which slips to the previous day
 * for anyone west of Greenwich — so the parts are split by hand instead.
 */
export function formatFrenchDate(date: string | undefined): string | undefined {
  if (!date) return undefined;
  const [year, month, day] = date.split('-').map(Number);
  if (!year || !month || !day) return undefined;
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(year, month - 1, day));
}

/** "1 photo" / "12 photos" — nothing at all when the album is still empty. */
export function formatPhotoCount(count: number | undefined): string | undefined {
  if (!count) return undefined;
  return `${count} photo${count > 1 ? 's' : ''}`;
}
