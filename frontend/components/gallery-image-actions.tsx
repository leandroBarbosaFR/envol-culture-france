'use client';

import { DownloadSimple, Printer } from '@phosphor-icons/react/ssr';

const ACTION =
  'grid size-9 cursor-pointer place-items-center rounded-md bg-background/90 text-foreground shadow-sm ' +
  'transition-colors hover:bg-background focus-visible:outline-2 focus-visible:outline-offset-2 ' +
  'focus-visible:outline-primary';

/**
 * Prints one photo by loading it into an offscreen iframe and printing that,
 * which keeps the rest of the page off the printout without needing a
 * page-wide print stylesheet.
 */
function printImage(url: string, title: string) {
  const frame = document.createElement('iframe');
  frame.setAttribute('aria-hidden', 'true');
  frame.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0;';
  document.body.appendChild(frame);

  const doc = frame.contentDocument;
  const win = frame.contentWindow;
  if (!doc || !win) {
    frame.remove();
    return;
  }

  doc.title = title;
  doc.body.style.margin = '0';

  const img = doc.createElement('img');
  img.alt = '';
  img.style.cssText = 'width:100%;height:auto;';
  img.onload = () => {
    // Safari and Firefox do not reliably fire afterprint from inside an
    // iframe, so fall back to a slow cleanup rather than pulling the frame
    // while the print dialog is still open.
    win.addEventListener('afterprint', () => frame.remove(), { once: true });
    window.setTimeout(() => frame.remove(), 60_000);
    win.focus();
    win.print();
  };
  img.onerror = () => frame.remove();
  img.src = url;
  doc.body.appendChild(img);
}

/**
 * Hover overlay for a gallery photo. Hidden until the card is hovered, but
 * revealed on keyboard focus, and shown permanently where there is no hover
 * (touch), otherwise the actions would be unreachable.
 */
export function GalleryImageActions({
  printUrl,
  downloadHref,
  label,
}: {
  printUrl: string;
  downloadHref: string;
  label: string;
}) {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-black/10 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100 [@media(hover:none)]:opacity-100 print:hidden"
      />
      <div className="absolute right-2 top-2 flex gap-1.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100 focus-within:opacity-100 [@media(hover:none)]:opacity-100 print:hidden">
        <a href={downloadHref} className={ACTION} aria-label={`Télécharger : ${label}`}>
          <DownloadSimple className="size-4" />
        </a>
        <button
          type="button"
          onClick={() => printImage(printUrl, label)}
          className={ACTION}
          aria-label={`Imprimer : ${label}`}
        >
          <Printer className="size-4" />
        </button>
      </div>
    </>
  );
}
