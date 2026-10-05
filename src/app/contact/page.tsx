import type { Metadata } from 'next';
import { ContactForm } from '@/components/sections/ContactForm';
import { mailboxes } from '@/content/site';
import { instrumentSerif, interTight, neueMontreal } from '@/styles/fonts';
import styles from '@/components/sections/ContactPage.module.css';

export const metadata:Metadata = {title:'Contact',description:'Talk to BitQueens about learning, partnerships, events or booking Kristie as a speaker.'};
export default async function ContactPage({searchParams}:{searchParams:Promise<{topic?:string}>}) {
  const {topic} = await searchParams;
  return <section className={`${styles.section} ${neueMontreal.variable} ${instrumentSerif.variable} ${interTight.variable}`} aria-label="Contact BitQueens"><div className={styles.inner}><div className={styles.grid}>
    <div className={styles.copy}><p className={styles.eyebrow}>Contact BitQueens</p><h1>One conversation.<span>A place to start.</span></h1><p className={styles.intro}>A question, a collaboration, or an idea for what comes next. Tell us what you have in mind.</p>
      <div className={styles.routes}>{[
        ['Learning & general enquiries','Questions about joining, programmes, or finding your way.'],
        ['Partnerships','Bring your expertise, networks or support to the ecosystem.'],
        ['Conference & events','Talk about gatherings, sponsorship or an event idea.'],
        ['Book Kristie as a speaker','Share your event, audience and the conversation you want to open.'],
      ].map(([title,body])=><div className={styles.route} key={title}><h2>{title}</h2><p>{body}</p></div>)}</div>
      <p>Prefer to write directly?</p><a className={styles.mail} href={`mailto:${mailboxes.general}`}>{mailboxes.general}</a>
    </div>
    <div className={styles.panel}><h2>Tell us a little more.</h2><ContactForm initialTopic={topic}/></div>
  </div></div></section>;
}
