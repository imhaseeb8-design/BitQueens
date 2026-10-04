'use client';

import { useState, type FormEvent } from 'react';
import type { CampusChapters } from '@/lib/types';
import form from '@/components/ui/Form.module.css';

type Status = 'idle' | 'submitting' | 'success';

interface Errors {
  name?: string;
  email?: string;
  university?: string;
  city?: string;
  why?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Campus chapter application form (#chapters on the Academy page).
 * No backend yet — same honest local resolve as the other Academy forms.
 */
export function ChapterForm({ content }: { content: CampusChapters }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [university, setUniversity] = useState('');
  const [city, setCity] = useState('');
  const [why, setWhy] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');

  function validate(): Errors {
    const next: Errors = {};
    if (name.trim() === '') next.name = 'Tell us your name so we know what to call you.';
    if (!EMAIL_RE.test(email.trim()))
      next.email = 'Enter an email address so we know where to reach you.';
    if (university.trim() === '') next.university = 'Which university is the chapter for?';
    if (city.trim() === '') next.city = 'Which city is your campus in?';
    if (why.trim().length < 20)
      next.why = 'Tell us a little more — a sentence or two about why (20+ characters).';
    return next;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setStatus('submitting');
    // TODO: replace with the real chapter-application endpoint.
    await new Promise((resolve) => setTimeout(resolve, 600));
    setStatus('success');
  }

  if (status === 'success') {
    return (
      <div className={form.success} aria-live="polite">
        <h3 className={form.successTitle}>{content.successTitle}</h3>
        <p className={form.successBody}>{content.successBody}</p>
        <p className={form.successNote}>
          Applications are not connected yet, so nothing was sent. We will wire this up before launch.
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
          <label className={form.label} htmlFor="chapter-name">
            Full name
          </label>
          <input
            id="chapter-name"
            name="name"
            type="text"
            autoComplete="name"
            className={form.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setErrors(validate())}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy('name', 'chapter-name-error')}
          />
          {errors.name && (
            <p className={form.fieldError} id="chapter-name-error">
              {errors.name}
            </p>
          )}
        </div>

        <div className={form.field}>
          <label className={form.label} htmlFor="chapter-email">
            Email address
          </label>
          <input
            id="chapter-email"
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
            aria-describedby={describedBy('email', 'chapter-email-error')}
          />
          {errors.email && (
            <p className={form.fieldError} id="chapter-email-error">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className={form.row}>
        <div className={form.field}>
          <label className={form.label} htmlFor="chapter-university">
            University
          </label>
          <input
            id="chapter-university"
            name="university"
            type="text"
            autoComplete="organization"
            className={form.input}
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
            onBlur={() => setErrors(validate())}
            aria-invalid={Boolean(errors.university)}
            aria-describedby={describedBy('university', 'chapter-university-error')}
          />
          {errors.university && (
            <p className={form.fieldError} id="chapter-university-error">
              {errors.university}
            </p>
          )}
        </div>

        <div className={form.field}>
          <label className={form.label} htmlFor="chapter-city">
            City
          </label>
          <input
            id="chapter-city"
            name="city"
            type="text"
            autoComplete="address-level2"
            className={form.input}
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onBlur={() => setErrors(validate())}
            aria-invalid={Boolean(errors.city)}
            aria-describedby={describedBy('city', 'chapter-city-error')}
          />
          {errors.city && (
            <p className={form.fieldError} id="chapter-city-error">
              {errors.city}
            </p>
          )}
        </div>
      </div>

      <div className={form.field}>
        <label className={form.label} htmlFor="chapter-why">
          Why do you want to start a chapter?
        </label>
        <textarea
          id="chapter-why"
          name="why"
          className={form.textarea}
          placeholder="A sentence or two about your campus and the women you want to bring together."
          value={why}
          onChange={(e) => setWhy(e.target.value)}
          onBlur={() => setErrors(validate())}
          aria-invalid={Boolean(errors.why)}
          aria-describedby={describedBy('why', 'chapter-why-error')}
        />
        {errors.why && (
          <p className={form.fieldError} id="chapter-why-error">
            {errors.why}
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
