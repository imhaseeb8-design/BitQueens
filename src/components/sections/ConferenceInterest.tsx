'use client';
import { useState, type FormEvent } from 'react';
import { prepareEmailEnquiry } from '@/lib/email-enquiry';
import { EmailDraftNotice } from './EmailDraftNotice';
import { instrumentSerif, interTight, neueMontreal } from '@/styles/fonts';
import styles from './ContactPage.module.css';
import form from '@/components/ui/Form.module.css';

export function ConferenceInterest(){
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [interest,setInterest]=useState('Attend');
  const [errors,setErrors]=useState<Record<string,string>>({});
  const [prepared,setPrepared]=useState(false);
  function submit(event:FormEvent<HTMLFormElement>){
    event.preventDefault(); const next:Record<string,string>={};
    if(!name.trim())next.name='Please enter your name.';
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))next.email='Please enter a valid email address.';
    setErrors(next);if(Object.keys(next).length)return;
    prepareEmailEnquiry('Conference interest',{Name:name,Email:email,Interest:interest});setPrepared(true);
  }
  return <section id="interest" aria-label="Conference interest" className={`${styles.section} ${neueMontreal.variable} ${instrumentSerif.variable} ${interTight.variable}`}><div className={styles.inner}><div className={styles.grid}><div className={styles.copy}><p className={styles.eyebrow}>The next edition</p><h2 style={{fontSize:'clamp(2.5rem,4vw,4rem)'}}>Be part of<span>what’s next.</span></h2><p className={styles.intro}>Tell us how you’d like to take part. The next edition has not been announced; this is an expression of interest, not a ticket reservation.</p></div><div className={styles.panel}>{prepared?<EmailDraftNotice onBack={()=>setPrepared(false)}/>:<form className={form.form} noValidate onSubmit={submit}>
    <div className={form.row}>{[{id:'name',label:'Full name',value:name,set:setName},{id:'email',label:'Email address',value:email,set:setEmail}].map(f=><div className={form.field} key={f.id}><label className={form.label} htmlFor={`interest-${f.id}`}>{f.label}</label><input id={`interest-${f.id}`} name={f.id} type={f.id==='email'?'email':'text'} autoComplete={f.id} required className={form.input} value={f.value} onChange={e=>f.set(e.target.value)} aria-invalid={!!errors[f.id]} aria-describedby={errors[f.id]?`interest-${f.id}-error`:undefined}/>{errors[f.id]&&<p className={form.fieldError} id={`interest-${f.id}-error`}>{errors[f.id]}</p>}</div>)}</div>
    <div className={form.field}><label className={form.label} htmlFor="interest-type">I’d like to</label><select id="interest-type" className={form.select} value={interest} onChange={e=>setInterest(e.target.value)}>{['Attend','Sponsor or partner','Speak','Volunteer'].map(value=><option key={value}>{value}</option>)}</select></div><button type="submit" className={form.submit}>Continue in email →</button><p className={form.status}>Review and send the draft in your email app.</p>
  </form>}</div></div></div></section>;
}
