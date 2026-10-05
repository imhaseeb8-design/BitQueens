'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { prepareEmailEnquiry } from '@/lib/email-enquiry';
import { EmailDraftNotice } from './EmailDraftNotice';
import type { AcademyCohort, AcademyEnroll } from '@/lib/types';
import form from '@/components/ui/Form.module.css';

type Status = 'idle' | 'submitting' | 'success';

interface Errors {
  cohort?: string;
  name?: string;
  email?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** EnrollForm: validates details and prepares an email draft without sending. */
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

  useEffect(() => {
    function select(event:Event) {
      const choice = (event as CustomEvent<{kind:string;value:string}>).detail;
      if(choice.kind !== 'cohort' || !cohorts.some(c=>c.name===choice.value)) return;
      setCohort(choice.value); setErrors({}); setStatus('idle');
    }
    window.addEventListener('bq:form-selection',select);
    return () => window.removeEventListener('bq:form-selection',select);
  },[cohorts]);

  function validate(): Errors {
    const next: Errors = {};
    if (cohort === '') next.cohort = 'Choose the cohort you want to join.';
    if (name.trim() === '') next.name = 'Tell us your name so we know what to call you.';
    if (!EMAIL_RE.test(email.trim()))
      next.email = 'Enter an email address so we know where to reach you.';
    return next;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    prepareEmailEnquiry('Academy cohort application', {Cohort:cohort, Name:name, Email:email, About:about});
    setStatus('success');
  }

  if (status === 'success') return <EmailDraftNotice onBack={() => setStatus('idle')} />;

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
          onBlur={() => setErrors(previous => ({ ...previous, cohort: validate().cohort }))}
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
            onBlur={() => setErrors(previous => ({ ...previous, name: validate().name }))}
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
            onBlur={() => setErrors(previous => ({ ...previous, email: validate().email }))}
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
      <p className={form.status}>This opens a draft in your email app. Review and send it to complete your request.</p>
    </form>
  );
}
