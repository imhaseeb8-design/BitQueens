'use client';

import { useState, type FormEvent } from 'react';
import { mailboxes } from '@/content/site';
import form from '@/components/ui/Form.module.css';

export const enquiryTopics = [
  {value:'general',label:'General enquiry'},
  {value:'partnerships',label:'Partnerships'},
  {value:'events',label:'Conference & events'},
  {value:'speaker',label:'Book Kristie as a speaker'},
];

export function ContactForm({initialTopic='general'}:{initialTopic?:string}) {
  const [topic,setTopic] = useState(enquiryTopics.some(t => t.value === initialTopic) ? initialTopic : 'general');
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [org,setOrg] = useState('');
  const [message,setMessage] = useState('');
  const [errors,setErrors] = useState<Record<string,string>>({});
  const [prepared,setPrepared] = useState(false);
  function submit(event:FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next:Record<string,string> = {};
    if(!name.trim()) next.name = 'Please enter your name.';
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = 'Please enter a valid email address.';
    if(message.trim().length < 20) next.message = 'Tell us a little more (at least 20 characters).';
    setErrors(next);
    if(Object.keys(next).length) return;
    const label = enquiryTopics.find(t => t.value === topic)!.label;
    // Confirmed public mailbox until the team confirms the departmental inboxes.
    const body = `Name: ${name.trim()}\nEmail: ${email.trim()}\nOrganisation: ${org.trim() || 'Not specified'}\nEnquiry: ${label}\n\n${message.trim()}`;
    window.location.href = `mailto:${mailboxes.general}?subject=${encodeURIComponent(`BitQueens — ${label}`)}&body=${encodeURIComponent(body)}`;
    setPrepared(true);
  }
  return <form className={form.form} onSubmit={submit} noValidate>
    <div className={form.field}><label className={form.label} htmlFor="contact-topic">What would you like to talk about?</label><select id="contact-topic" className={form.select} value={topic} onChange={e=>{setTopic(e.target.value);setPrepared(false);}}>{enquiryTopics.map(t=><option value={t.value} key={t.value}>{t.label}</option>)}</select></div>
    <div className={form.row}>
      <div className={form.field}><label className={form.label} htmlFor="contact-name">Full name</label><input id="contact-name" name="name" autoComplete="name" required className={form.input} value={name} onChange={e=>setName(e.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name?'contact-name-error':undefined}/>{errors.name&&<p id="contact-name-error" className={form.fieldError}>{errors.name}</p>}</div>
      <div className={form.field}><label className={form.label} htmlFor="contact-email">Email address</label><input id="contact-email" name="email" type="email" autoComplete="email" required className={form.input} value={email} onChange={e=>setEmail(e.target.value)} aria-invalid={!!errors.email} aria-describedby={errors.email?'contact-email-error':undefined}/>{errors.email&&<p id="contact-email-error" className={form.fieldError}>{errors.email}</p>}</div>
    </div>
    <div className={form.field}><label className={form.label} htmlFor="contact-org">Organisation (optional)</label><input id="contact-org" name="organization" autoComplete="organization" className={form.input} value={org} onChange={e=>setOrg(e.target.value)}/></div>
    <div className={form.field}><label className={form.label} htmlFor="contact-message">{topic==='speaker'?'Tell us about your event':'Your message'}</label><textarea id="contact-message" name="message" required className={form.textarea} placeholder={topic==='speaker'?'Share the date, location, audience and topic you have in mind.':'Tell us what you have in mind and how we can help.'} value={message} onChange={e=>setMessage(e.target.value)} aria-invalid={!!errors.message} aria-describedby={errors.message?'contact-message-error':undefined}/>{errors.message&&<p id="contact-message-error" className={form.fieldError}>{errors.message}</p>}</div>
    <button className={form.submit} type="submit">Continue in email →</button>
    <p className={form.status}>This opens a draft in your email app. Review it and send it there.</p>
    {prepared&&<p className={form.status} role="status">Your email draft is ready. If your email app didn’t open, write directly to <a href={`mailto:${mailboxes.general}`}>{mailboxes.general}</a>.</p>}
  </form>;
}
