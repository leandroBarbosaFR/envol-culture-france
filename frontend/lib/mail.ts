import nodemailer, { type Transporter } from 'nodemailer';

/**
 * SMTP transport for the contact form. Credentials never leave the server:
 * this module is only imported from `'use server'` code.
 *
 * With Gmail, MAIL_PASS must be an application password (a 16-character code
 * generated at myaccount.google.com/apppasswords) — Google refuses the normal
 * account password over SMTP, and 2-step verification must be on to create one.
 */
const {
  MAIL_HOST,
  MAIL_PORT,
  MAIL_USER,
  MAIL_PASS,
  MAIL_RECEIVER,
  MAIL_INFO,
} = process.env;

/** False when the environment is incomplete, so the form can say so instead of throwing. */
export const mailConfigured = Boolean(MAIL_HOST && MAIL_USER && MAIL_PASS);

/** Where visitor messages land. Falls back to the sending account itself. */
export const mailReceiver = MAIL_RECEIVER || MAIL_USER || '';

/*
  Gmail rewrites (or rejects) a From: that is not the authenticated account,
  so the envelope stays MAIL_USER and the visitor's address goes in Reply-To —
  hitting "Répondre" in the mailbox then answers the visitor directly.
*/
export const mailFrom = MAIL_INFO || MAIL_USER || '';

let cached: Transporter | null = null;

export function mailer(): Transporter {
  if (!mailConfigured) {
    throw new Error('SMTP non configuré : MAIL_HOST, MAIL_USER et MAIL_PASS sont requis.');
  }
  const port = Number(MAIL_PORT) || 465;
  cached ??= nodemailer.createTransport({
    host: MAIL_HOST,
    port,
    // 465 is implicit TLS; 587 starts in clear text and upgrades via STARTTLS.
    secure: port === 465,
    auth: { user: MAIL_USER, pass: MAIL_PASS },
  });
  return cached;
}
