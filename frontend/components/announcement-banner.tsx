type AnnouncementBannerData = {
  active?: boolean;
  text?: string;
  startDate?: string;
  endDate?: string;
};

/**
 * Resolves the banner to its visible text (or null), so callers never render
 * an inactive or out-of-window banner. Dates compare as YYYY-MM-DD strings in
 * the association's own timezone, so the window flips at local midnight
 * rather than UTC midnight.
 */
export function resolveAnnouncementText(data?: AnnouncementBannerData): string | null {
  if (!data?.active || !data.text) return null;

  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Paris' }).format(new Date());
  if (data.startDate && today < data.startDate) return null;
  if (data.endDate && today > data.endDate) return null;

  return data.text;
}

export function AnnouncementBanner({ text }: { text: string }) {
  return (
    <div className="overflow-hidden bg-brand-deep text-primary-foreground">
      <div className="animate-marquee whitespace-nowrap py-1.5 text-sm font-medium motion-reduce:animate-none motion-reduce:whitespace-normal motion-reduce:py-2 motion-reduce:text-center">
        <span className="mx-8 motion-reduce:mx-0">{text}</span>
        <span className="mx-8 motion-reduce:hidden" aria-hidden="true">
          {text}
        </span>
      </div>
    </div>
  );
}
