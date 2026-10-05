'use client';
import {useState,type FormEvent} from 'react';
import {prepareEmailEnquiry} from '@/lib/email-enquiry';
import form from '@/components/ui/Form.module.css';
import styles from './UpdatesRequest.module.css';

export function UpdatesRequest(){
  const [email,setEmail]=useState('');const [error,setError]=useState('');const [prepared,setPrepared]=useState(false);
  function submit(event:FormEvent<HTMLFormElement>){event.preventDefault();if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())){setError('Enter a valid email address.');return;}setError('');prepareEmailEnquiry('Programme and event updates',{Email:email,Request:'Please share BitQueens programme, event and opportunity updates with me.'});setPrepared(true);}
  return <section aria-label="BitQueens updates" className={styles.band}><div><p className={styles.eyebrow}>Stay in the loop</p><h2>What’s next, in your inbox.</h2><p>Programmes, gatherings and opportunities from BitQueens.</p></div><form onSubmit={submit} noValidate><label className={form.label} htmlFor="updates-email">Email address</label><div className={styles.row}><input id="updates-email" name="email" type="email" autoComplete="email" className={form.input} placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} aria-invalid={!!error} aria-describedby="updates-status"/><button className={form.submit}>Request updates →</button></div><p id="updates-status" className={error?form.fieldError:styles.note} role="status">{error||(prepared?'Review and send the draft in your email app to request updates.':'Continue in your email app to request updates.')}</p></form></section>;
}
