/**
 * Single source of truth for the association's coordinates (CMS document
 * `siteContact`). Every place that shows an address, phone or e-mail —
 * footer, contact page, home contact block — derives from these helpers.
 */

export type SiteContact = {
  organisationName?: string | null;
  contactName?: string | null;
  phone?: string | null;
  email?: string | null;
  addressLine1?: string | null;
  addressLine2?: string | null;
  postalCode?: string | null;
  city?: string | null;
  openingHours?: string | null;
} | null;

export type ContactChannel = {
  kind: 'address' | 'phone' | 'email' | 'hours';
  label: string;
  value: string;
  href?: string;
};

/** "06 70 01 30 60" → "tel:+33670013060" */
export function phoneHref(phone: string): string {
  const digits = phone.replace(/[^\d+]/g, '');
  const intl = digits.startsWith('0') ? `+33${digits.slice(1)}` : digits;
  return `tel:${intl}`;
}

/** Address as display lines: street, complement, "postal code city". */
export function addressLines(contact: SiteContact): string[] {
  if (!contact) return [];
  const cityLine = [contact.postalCode, contact.city].filter(Boolean).join(' ');
  return [contact.addressLine1, contact.addressLine2, cityLine].filter(
    (l): l is string => Boolean(l && l.trim()),
  );
}

export function formatAddress(contact: SiteContact): string | null {
  const lines = addressLines(contact);
  return lines.length ? lines.join(', ') : null;
}

export function mapsHref(contact: SiteContact): string | undefined {
  const address = formatAddress(contact);
  return address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
    : undefined;
}

/** The channel list rendered on the contact page and the home contact block. */
export function contactChannels(contact: SiteContact): ContactChannel[] {
  if (!contact) return [];
  const channels: ContactChannel[] = [];
  const address = formatAddress(contact);
  if (address) {
    channels.push({ kind: 'address', label: 'Adresse', value: address, href: mapsHref(contact) });
  }
  if (contact.phone) {
    channels.push({
      kind: 'phone',
      label: 'Téléphone',
      value: contact.contactName ? `${contact.contactName} – ${contact.phone}` : contact.phone,
      href: phoneHref(contact.phone),
    });
  }
  if (contact.email) {
    channels.push({ kind: 'email', label: 'E-mail', value: contact.email, href: `mailto:${contact.email}` });
  }
  if (contact.openingHours) {
    channels.push({ kind: 'hours', label: 'Permanence', value: contact.openingHours });
  }
  return channels;
}
