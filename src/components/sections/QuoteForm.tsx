'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { prepareEmailEnquiry } from '@/lib/email-enquiry';
import { EmailDraftNotice } from './EmailDraftNotice';
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

/** QuoteForm: validates details and prepares an email draft without sending. */
export function QuoteForm({ content }: { content: InnovationsQuote }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [org, setOrg] = useState('');
  const [interest, setInterest] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');

  useEffect(() => {
    function select(event:Event) {
      const choice = (event as CustomEvent<{kind:string;value:string;message?:string}>).detail;
      if(choice.kind !== 'quote' || !content.interests.includes(choice.value)) return;
      setInterest(choice.value);
      if(choice.message) setMessage(choice.message);
      setErrors({}); setStatus('idle');
    }
    window.addEventListener('bq:form-selection',select);
    return () => window.removeEventListener('bq:form-selection',select);
  },[content.interests]);

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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    prepareEmailEnquiry('Labs enquiry', {Name:name, Email:email, Organisation:org, Interest:interest, Message:message});
    setStatus('success');
  }

  if (status === 'success') return <EmailDraftNotice onBack={() => setStatus('idle')} />;

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
            onBlur={() => setErrors(previous => ({ ...previous, name: validate().name }))}
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
            onBlur={() => setErrors(previous => ({ ...previous, email: validate().email }))}
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
            onBlur={() => setErrors(previous => ({ ...previous, interest: validate().interest }))}
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
          onBlur={() => setErrors(previous => ({ ...previous, message: validate().message }))}
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
      <p className={form.status}>This opens a draft in your email app. Review and send it to complete your request.</p>
    </form>
  );
}
