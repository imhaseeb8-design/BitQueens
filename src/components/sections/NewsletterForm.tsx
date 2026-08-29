'use client';

import { useState, type FormEvent } from 'react';
import type { JoinSection } from '@/lib/types';
import styles from './Join.module.css';

type Status = 'idle' | 'submitting' | 'error' | 'success';

/**
 * Newsletter signup.
 *
 * Validation runs on blur and on submit, never per keystroke — correcting
 * someone mid-word is what makes forms feel hostile. Errors say what happened
 * and what to do, and the status region is polite so it does not interrupt.
 *
 * There is no subscribe endpoint yet: submit resolves locally and tells the
 * user plainly. Wire `subscribe()` to the real list when it exists.
 */
export function NewsletterForm({
  content,
}: {
  content: JoinSection['newsletter'];
}) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  const isValid = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  function validate() {
    if (email.trim() === '') return;
    if (!isValid(email)) {
      setStatus('error');
      setMessage('That email address is missing an @ or a domain.');
    } else if (status === 'error') {
      setStatus('idle');
      setMessage('');
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isValid(email)) {
      setStatus('error');
      setMessage('Enter an email address so we know where to send updates.');
      return;
    }

    setStatus('submitting');
    setMessage('');

    // TODO: replace with the real subscribe endpoint.
    await new Promise((resolve) => setTimeout(resolve, 600));

    setStatus('success');
    setMessage(
      'Thanks — signup is not connected yet, so nothing was sent. We will wire this up before launch.',
    );
    setEmail('');
  }

  const statusClass =
    status === 'error'
      ? styles.error
      : status === 'success'
        ? styles.success
        : '';

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.field}>
        <label htmlFor="bq-email" className="bq-visually-hidden">
          Your email address
        </label>
        <input
          id="bq-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          spellCheck={false}
          placeholder={content.placeholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={validate}
          aria-invalid={status === 'error'}
          aria-describedby="bq-email-status"
          className={styles.input}
        />
        <button
          type="submit"
          className={styles.submit}
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? 'Subscribing…' : content.submitLabel}
        </button>
      </div>

      <p
        id="bq-email-status"
        aria-live="polite"
        className={`${styles.status} ${statusClass}`}
      >
        {message}
      </p>

      <p className={styles.disclaimer}>{content.disclaimer}</p>
    </form>
  );
}
