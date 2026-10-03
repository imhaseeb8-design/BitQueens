'use client';

import { useState, type FormEvent } from 'react';
import type { JoinPage } from '@/lib/types';
import form from '@/components/ui/Form.module.css';

type Status = 'idle' | 'submitting' | 'success';

interface Errors {
  name?: string;
  email?: string;
  track?: string;
  level?: string;
  location?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * The /join signup form.
 *
 * Validation runs on blur and on submit, never per keystroke. There is no
 * backend yet: submit resolves locally and says so plainly, following the
 * NewsletterForm convention. Wire the submit to the real endpoint when it
 * exists — the field contract is the form state below.
 */
export function JoinForm({ content }: { content: JoinPage }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [track, setTrack] = useState('');
  const [level, setLevel] = useState('');
  const [location, setLocation] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');

  function validate(): Errors {
    const next: Errors = {};
    if (name.trim() === '') next.name = 'Tell us your name so we know what to call you.';
    if (!EMAIL_RE.test(email.trim()))
      next.email = 'Enter an email address so we know where to reach you.';
    if (track === '') next.track = 'Pick the track closest to what you want to learn.';
    if (level === '') next.level = 'Pick the level that sounds most like you.';
    if (location.trim() === '') next.location = 'Tell us your city and country.';
    return next;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setStatus('submitting');
    // TODO: replace with the real join endpoint.
    await new Promise((resolve) => setTimeout(resolve, 600));
    setStatus('success');
  }

  if (status === 'success') {
    return (
      <div className={form.success} aria-live="polite">
        <h2 className={form.successTitle}>{content.successTitle}</h2>
        <p className={form.successBody}>{content.successBody}</p>
        <p className={form.successNote}>
          Signup is not connected yet, so nothing was sent. We will wire this up before launch.
        </p>
      </div>
    );
  }

  const describedBy = (key: keyof Errors) =>
    errors[key] ? `${key}-error` : undefined;

  return (
    <form className={form.form} onSubmit={handleSubmit} noValidate>
      <div className={form.row}>
        <div className={form.field}>
          <label className={form.label} htmlFor="join-name">
            Full name
          </label>
          <input
            id="join-name"
            name="name"
            type="text"
            autoComplete="name"
            className={form.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setErrors(validate())}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy('name')}
          />
          {errors.name && (
            <p className={form.fieldError} id="name-error">
              {errors.name}
            </p>
          )}
        </div>

        <div className={form.field}>
          <label className={form.label} htmlFor="join-email">
            Email address
          </label>
          <input
            id="join-email"
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
            aria-describedby={describedBy('email')}
          />
          {errors.email && (
            <p className={form.fieldError} id="email-error">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className={form.row}>
        <div className={form.field}>
          <label className={form.label} htmlFor="join-track">
            What do you want to learn?
          </label>
          <select
            id="join-track"
            name="track"
            className={form.select}
            value={track}
            onChange={(e) => setTrack(e.target.value)}
            onBlur={() => setErrors(validate())}
            aria-invalid={Boolean(errors.track)}
            aria-describedby={describedBy('track')}
          >
            <option value="">Choose a track…</option>
            {content.tracks.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {errors.track && (
            <p className={form.fieldError} id="track-error">
              {errors.track}
            </p>
          )}
        </div>

        <div className={form.field}>
          <label className={form.label} htmlFor="join-level">
            Your experience level
          </label>
          <select
            id="join-level"
            name="level"
            className={form.select}
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            onBlur={() => setErrors(validate())}
            aria-invalid={Boolean(errors.level)}
            aria-describedby={describedBy('level')}
          >
            <option value="">Choose your level…</option>
            {content.levels.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
          {errors.level && (
            <p className={form.fieldError} id="level-error">
              {errors.level}
            </p>
          )}
        </div>
      </div>

      <div className={form.field}>
        <label className={form.label} htmlFor="join-location">
          City and country
        </label>
        <input
          id="join-location"
          name="location"
          type="text"
          autoComplete="country-name"
          placeholder="e.g. Lagos, Nigeria"
          className={form.input}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onBlur={() => setErrors(validate())}
          aria-invalid={Boolean(errors.location)}
          aria-describedby={describedBy('location')}
        />
        {errors.location && (
          <p className={form.fieldError} id="location-error">
            {errors.location}
          </p>
        )}
      </div>

      <button
        type="submit"
        className={form.submit}
        disabled={status === 'submitting'}
      >
        {status === 'submitting' ? 'Joining…' : content.submitLabel}
      </button>

      <p className={form.status} data-tone="muted">
        {content.privacy}
      </p>
    </form>
  );
}
