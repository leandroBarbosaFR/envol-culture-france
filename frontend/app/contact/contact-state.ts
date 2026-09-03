/**
 * Shape of the contact form's action state.
 *
 * Deliberately outside `actions.ts`: every *value* exported from a `'use server'`
 * module is compiled into a server reference, so exporting the initial state
 * from there made React call it as a server function on first render.
 */
export type ContactField = 'firstname' | 'lastname' | 'email' | 'subject' | 'message';

export type ContactState = {
  status: 'idle' | 'success' | 'error';
  message: string;
  /** Per-field messages, rendered under the matching input. */
  fieldErrors: Partial<Record<ContactField, string>>;
};

export const initialContactState: ContactState = {
  status: 'idle',
  message: '',
  fieldErrors: {},
};
