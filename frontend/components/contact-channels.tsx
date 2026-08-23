import { Clock, Envelope, MapPin, Phone } from '@phosphor-icons/react/ssr';
import { cardClass, cardHoverClass } from '@/components/ui/card';
import { contactChannels, type ContactChannel, type SiteContact } from '@/lib/contact';
import { cn } from '@/lib/utils';

const ICONS: Record<ContactChannel['kind'], React.FC<React.SVGProps<SVGSVGElement>>> = {
  address: MapPin,
  phone: Phone,
  email: Envelope,
  hours: Clock,
};

/** Address / phone / e-mail / opening-hours cards, derived from `siteContact`. */
export function ContactChannels({ contact }: { contact: SiteContact }) {
  const channels = contactChannels(contact);
  if (channels.length === 0) return null;

  return (
    <ul className="grid gap-3">
      {channels.map(({ kind, label, value, href }) => {
        const Icon = ICONS[kind];
        const inner = (
          <>
            <span className="grid size-10 shrink-0 place-items-center rounded-md bg-brand-soft text-brand-deep">
              <Icon className="size-5" />
            </span>
            <div className="min-w-0">
              <div className="text-xs text-muted-foreground">{label}</div>
              <div className="mt-0.5 font-medium break-words">{value}</div>
            </div>
          </>
        );
        const cls = cn(cardClass, 'flex-row items-center gap-4 p-5');
        return (
          <li key={kind}>
            {href ? (
              <a
                href={href}
                className={cn(cls, cardHoverClass)}
                {...(kind === 'address' ? { target: '_blank', rel: 'noreferrer' } : {})}
              >
                {inner}
              </a>
            ) : (
              <div className={cls}>{inner}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
