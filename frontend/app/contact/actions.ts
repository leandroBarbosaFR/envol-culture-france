'use server';

import type { ContactField, ContactState } from '@/app/contact/contact-state';
import { mailConfigured, mailFrom, mailReceiver, mailer } from '@/lib/mail';

/** Caps mirror the inputs' maxLength: a bot posting straight to the action ignores those. */
const MAX = { firstname: 80, lastname: 80, email: 160, subject: 150, message: 5000 } as const;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function value(formData: FormData, field: ContactField): string {
  const raw = formData.get(field);
  return typeof raw === 'string' ? raw.trim() : '';
}

/** The visitor's own words end up in an HTML mail — never interpolate them raw. */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/*
  Header injection guard: a newline in a subject or a display name lets a
  crafted submission append its own SMTP headers (Bcc:, Content-Type: …).
*/
function singleLine(text: string): string {
  return text.replace(/[\r\n]+/g, ' ').trim();
}

export async function sendContactMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  /*
    Honeypot: a field hidden from people and left empty by them, filled in by
    the bots that submit every input they find. Silently answered with the
    success message — telling a bot it was caught only helps it adapt.
  */
  if (formData.get('website')) {
    return { status: 'success', message: 'Merci, votre message a bien été envoyé.', fieldErrors: {} };
  }

  const firstname = value(formData, 'firstname');
  const lastname = value(formData, 'lastname');
  const email = value(formData, 'email');
  const subject = value(formData, 'subject');
  const message = value(formData, 'message');

  const fieldErrors: ContactState['fieldErrors'] = {};
  if (!firstname) fieldErrors.firstname = 'Indiquez votre prénom.';
  if (!lastname) fieldErrors.lastname = 'Indiquez votre nom.';
  if (!email) fieldErrors.email = 'Indiquez votre e-mail.';
  else if (!EMAIL.test(email)) fieldErrors.email = "Cet e-mail ne semble pas valide.";
  if (!message) fieldErrors.message = 'Écrivez votre message.';
  else if (message.length < 10) fieldErrors.message = 'Votre message est un peu court.';

  for (const [field, max] of Object.entries(MAX) as [ContactField, number][]) {
    if (value(formData, field).length > max) {
      fieldErrors[field] = `Ce champ est limité à ${max} caractères.`;
    }
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: 'error',
      message: 'Vérifiez les champs signalés puis renvoyez votre message.',
      fieldErrors,
    };
  }

  if (!mailConfigured || !mailReceiver) {
    // Configuration gap, not a visitor mistake: log it and give a usable fallback.
    console.error('[contact] SMTP non configuré — message non envoyé.');
    return {
      status: 'error',
      message:
        "L'envoi est momentanément indisponible. Écrivez-nous directement par e-mail ou par téléphone.",
      fieldErrors: {},
    };
  }

  const fullName = singleLine(`${firstname} ${lastname}`);
  const mailSubject = singleLine(
    subject
      ? `${process.env.CONTACT_FORM_SUBJECT || 'Message de Envol Culture'} — ${subject}`
      : `${process.env.CONTACT_FORM_SUBJECT || 'Message de Envol Culture'} — ${fullName}`,
  );

  try {
    await mailer().sendMail({
      from: { name: 'Site Envol Culture', address: mailFrom },
      to: mailReceiver,
      replyTo: { name: fullName, address: email },
      subject: mailSubject,
      text: [
        `Nom : ${fullName}`,
        `E-mail : ${email}`,
        subject ? `Sujet : ${subject}` : null,
        '',
        message,
      ]
        .filter((line) => line !== null)
        .join('\n'),
      html: `
        <p><strong>Nom :</strong> ${escapeHtml(fullName)}<br />
        <strong>E-mail :</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>
        ${subject ? `<br /><strong>Sujet :</strong> ${escapeHtml(subject)}` : ''}</p>
        <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
      `,
    });
  } catch (error) {
    console.error('[contact] envoi SMTP échoué', error);
    return {
      status: 'error',
      message:
        "Votre message n'a pas pu être envoyé. Réessayez dans un instant, ou contactez-nous par téléphone.",
      fieldErrors: {},
    };
  }

  return {
    status: 'success',
    message: 'Merci, votre message a bien été envoyé. Nous vous répondrons rapidement.',
    fieldErrors: {},
  };
}
