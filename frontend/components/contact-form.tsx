'use client';

import { useActionState, useState } from 'react';
import { CheckCircle, WarningCircle } from '@phosphor-icons/react/ssr';
import { sendContactMessage } from '@/app/contact/actions';
import { initialContactState, type ContactField } from '@/app/contact/contact-state';
import { Field } from '@/components/form-field';
import { Button } from '@/components/ui/button';

const EMPTY: Record<ContactField, string> = {
  firstname: '',
  lastname: '',
  email: '',
  subject: '',
  message: '',
};

/**
 * Contact form. The fields are controlled so a rejected submission keeps what
 * the visitor wrote — React resets an uncontrolled form once the action
 * resolves, which would throw away a long message over a typo in the e-mail.
 */
export function ContactForm({ submitLabel = 'Envoyer le message' }: { submitLabel?: string }) {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialContactState);
  const [values, setValues] = useState(EMPTY);

  /*
    Clear the fields once a send succeeds. Adjusting state during render (the
    "previous value" pattern) rather than from an effect: no cascading render,
    and the empty fields are painted in the same pass as the confirmation.
  */
  const [seenState, setSeenState] = useState(state);
  if (seenState !== state) {
    setSeenState(state);
    if (state.status === 'success') setValues(EMPTY);
  }

  const set = (field: ContactField) => (value: string) =>
    setValues((current) => ({ ...current, [field]: value }));

  return (
    <form action={formAction} className="mt-6 grid gap-4">
      {/*
        Honeypot: off-screen rather than display:none (which some bots skip),
        hidden from assistive tech and from the tab order.
      */}
      <div className="absolute left-[-9999px]" aria-hidden>
        <label htmlFor="website">Ne remplissez pas ce champ</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {state.status !== 'idle' && (
        <p
          role="status"
          className={`flex items-start gap-2 rounded-lg border p-3 text-sm ${
            state.status === 'success'
              ? 'border-brand-deep/30 bg-brand-soft text-brand-deep'
              : 'border-destructive/30 bg-destructive/5 text-destructive'
          }`}
        >
          {state.status === 'success' ? (
            <CheckCircle className="mt-0.5 size-4 shrink-0" />
          ) : (
            <WarningCircle className="mt-0.5 size-4 shrink-0" />
          )}
          {state.message}
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Prénom"
          id="firstname"
          required
          autoComplete="given-name"
          maxLength={80}
          value={values.firstname}
          onChange={set('firstname')}
          error={state.fieldErrors.firstname}
          disabled={pending}
        />
        <Field
          label="Nom"
          id="lastname"
          required
          autoComplete="family-name"
          maxLength={80}
          value={values.lastname}
          onChange={set('lastname')}
          error={state.fieldErrors.lastname}
          disabled={pending}
        />
      </div>
      <Field
        label="Email"
        id="email"
        type="email"
        required
        autoComplete="email"
        maxLength={160}
        value={values.email}
        onChange={set('email')}
        error={state.fieldErrors.email}
        disabled={pending}
      />
      <Field
        label="Sujet"
        id="subject"
        maxLength={150}
        value={values.subject}
        onChange={set('subject')}
        error={state.fieldErrors.subject}
        disabled={pending}
      />
      <Field
        label="Message"
        id="message"
        textarea
        required
        maxLength={5000}
        placeholder="Votre message…"
        value={values.message}
        onChange={set('message')}
        error={state.fieldErrors.message}
        disabled={pending}
      />
      <Button type="submit" disabled={pending} className="mt-2 justify-self-start">
        {pending ? 'Envoi en cours…' : submitLabel}
      </Button>
    </form>
  );
}
