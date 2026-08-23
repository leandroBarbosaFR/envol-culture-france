'use client';

import { Printer } from '@phosphor-icons/react/ssr';
import { Button } from '@/components/ui/button';

/** Triggers the browser print dialog; hidden on the printout itself. */
export function PrintButton({ label = 'Imprimer' }: { label?: string }) {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={() => window.print()}
      className="print:hidden"
      aria-label={`${label} cette page`}
    >
      <Printer />
      {label}
    </Button>
  );
}
