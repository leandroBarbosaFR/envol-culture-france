/**
 * Resolves the copyright year in a footer mention so it is never stale.
 * Replaces the `{year}` placeholder, and also refreshes a year written
 * straight after a `©` (e.g. "© 2026 Envol"). Anchoring on `©` keeps
 * other numbers intact — "Association loi 1901" must not be rewritten.
 */
export function withCurrentYear(
  text: string,
  year: number = new Date().getFullYear(),
): string {
  return text
    .replace(/\{year\}/g, String(year))
    .replace(/(©\s*)\d{4}/g, `$1${year}`);
}
