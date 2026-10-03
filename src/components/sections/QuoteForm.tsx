'use client';

import { useState, type FormEvent } from 'react';
import type { InnovationsQuote } from '@/lib/types';
import form from '@/components/ui/Form.module.css';

type Status = 'idle' | 'submitting' | 'success';

interface Errors {
  name?: string;
  email?: string;
  interest?: string;
  message?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * The quote/enquiry form (#quote on the Innovations page).
 *
 * One form for both commercial shapes: products & consulting and skills
 * programmes. No backend yet — same honest local resolve as the other
 * site forms.
 */
export function QuoteForm({ content }: { content: InnovationsQuote }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [org, setOrg] = useState('');
  const [interest, setInterest] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');

  function validate(): Errors {
    const next: Errors = {};
    if (name.trim() === '') next.name = 'Tell us your name so we know what to call you.';
    if (!EMAIL_RE.test(email.trim()))
      next.email = 'Enter an email address so we know where to reach you.';
    if (interest === '') next.interest = 'Choose what your enquiry is about.';
    if (message.trim().length < 20)
      next.message = 'Give us a little more detail — a sentence or two (20+ characters).';
    return next;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setStatus('submitting');
    // TODO: replace with the real quote-request endpoint.
    await new Promise((resolve) => setTimeout(resolve, 600));
    setStatus('success');
  }

  if (status === 'success') {
    return (
      <div className={form.success} aria-live="polite">
        <h3 className={form.successTitle}>{content.successTitle}</h3>
        <p className={form.successBody}>{content.successBody}</p>
        <p className={form.successNote}>
          Requests are not connected yet, so nothing was sent. We will wire this up before launch.
        </p>
      </div>
    );
  }

  const describedBy = (key: keyof Errors, id: string) =>
    errors[key] ? id : undefined;

  return (
    <form className={form.form} onSubmit={handleSubmit} noValidate>
      <div className={form.row}>
        <div className={form.field}>
          <label className={form.label} htmlFor="quote-name">
            Full name
          </label>
          <input
            id="quote-name"
            name="name"
            type="text"
            autoComplete="name"
            className={form.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setErrors(validate())}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy('name', 'quote-name-error')}
          />
          {errors.name && (
            <p className={form.fieldError} id="quote-name-error">
              {errors.name}
            </p>
          )}
        </div>

        <div className={form.field}>
          <label className={form.label} htmlFor="quote-email">
            Email address
          </label>
          <input
            id="quote-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            spellCheck={false}
            className={form.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setErrors(validate())}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy('email', 'quote-email-error')}
          />
          {errors.email && (
            <p className={form.fieldError} id="quote-email-error">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className={form.row}>
        <div className={form.field}>
          <label className={form.label} htmlFor="quote-org">
            Organisation <span aria-hidden="true">(optional)</span>
          </label>
          <input
            id="quote-org"
            name="organization"
            type="text"
            autoComplete="organization"
            className={form.input}
            value={org}
            onChange={(e) => setOrg(e.target.value)}
          />
        </div>

        <div className={form.field}>
          <label className={form.label} htmlFor="quote-interest">
            I’m interested in
          </label>
          <select
            id="quote-interest"
            name="interest"
            className={form.select}
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            onBlur={() => setErrors(validate())}
            aria-invalid={Boolean(errors.interest)}
            aria-describedby={describedBy('interest', 'quote-interest-error')}
          >
            <option value="">Choose one…</option>
            {content.interests.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          {errors.interest && (
            <p className={form.fieldError} id="quote-interest-error">
              {errors.interest}
            </p>
          )}
        </div>
      </div>

      <div className={form.field}>
        <label className={form.label} htmlFor="quote-message">
          What do you want to build?
        </label>
        <textarea
          id="quote-message"
          name="message"
          className={form.textarea}
          placeholder="A sentence or two about your goal, timeline, or team."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onBlur={() => setErrors(validate())}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describedBy('message', 'quote-message-error')}
        />
        {errors.message && (
          <p className={form.fieldError} id="quote-message-error">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className={form.submit}
        disabled={status === 'submitting'}
      >
        {status === 'submitting' ? 'Submitting…' : content.submitLabel}
      </button>
    </form>
  );
}
