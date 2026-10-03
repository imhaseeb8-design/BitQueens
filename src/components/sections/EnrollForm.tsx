'use client';

import { useState, type FormEvent } from 'react';
import type { AcademyCohort, AcademyEnroll } from '@/lib/types';
import form from '@/components/ui/Form.module.css';

type Status = 'idle' | 'submitting' | 'success';

interface Errors {
  cohort?: string;
  name?: string;
  email?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Cohort application form (#enroll on the Academy page).
 *
 * Application-only, not checkout: pricing is still being finalised, so paid
 * cohorts take applications here and confirm personally. No backend yet —
 * same honest local resolve as the other Academy forms.
 */
export function EnrollForm({
  content,
  cohorts,
}: {
  content: AcademyEnroll;
  cohorts: AcademyCohort[];
}) {
  const [cohort, setCohort] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [about, setAbout] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');

  function validate(): Errors {
    const next: Errors = {};
    if (cohort === '') next.cohort = 'Choose the cohort you want to join.';
    if (name.trim() === '') next.name = 'Tell us your name so we know what to call you.';
    if (!EMAIL_RE.test(email.trim()))
      next.email = 'Enter an email address so we know where to reach you.';
    return next;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setStatus('submitting');
    // TODO: replace with the real enrollment endpoint.
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

  return (
    <form className={form.form} onSubmit={handleSubmit} noValidate>
      <div className={form.field}>
        <label className={form.label} htmlFor="enroll-cohort">
          Cohort
        </label>
        <select
          id="enroll-cohort"
          name="cohort"
          className={form.select}
          value={cohort}
          onChange={(e) => setCohort(e.target.value)}
          onBlur={() => setErrors(validate())}
          aria-invalid={Boolean(errors.cohort)}
          aria-describedby={errors.cohort ? 'cohort-error' : undefined}
        >
          <option value="">Choose a cohort…</option>
          {cohorts.map((c) => (
            <option key={c.name} value={c.name}>
              {c.name} · {c.access}
            </option>
          ))}
        </select>
        {errors.cohort && (
          <p className={form.fieldError} id="cohort-error">
            {errors.cohort}
          </p>
        )}
      </div>

      <div className={form.row}>
        <div className={form.field}>
          <label className={form.label} htmlFor="enroll-name">
            Full name
          </label>
          <input
            id="enroll-name"
            name="name"
            type="text"
            autoComplete="name"
            className={form.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setErrors(validate())}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'enroll-name-error' : undefined}
          />
          {errors.name && (
            <p className={form.fieldError} id="enroll-name-error">
              {errors.name}
            </p>
          )}
        </div>

        <div className={form.field}>
          <label className={form.label} htmlFor="enroll-email">
            Email address
          </label>
          <input
            id="enroll-email"
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
            aria-describedby={errors.email ? 'enroll-email-error' : undefined}
          />
          {errors.email && (
            <p className={form.fieldError} id="enroll-email-error">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className={form.field}>
        <label className={form.label} htmlFor="enroll-about">
          A little about yourself <span aria-hidden="true">(optional)</span>
        </label>
        <textarea
          id="enroll-about"
          name="about"
          className={form.textarea}
          placeholder="What brings you to this cohort?"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />
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
