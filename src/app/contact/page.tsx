import type { Metadata } from 'next';
import { ContactForm } from '@/components/sections/ContactForm';
import { Faq } from '@/components/sections/Faq';
import { GlobalDotMap } from '@/components/ui/GlobalDotMap';
import { Reveal } from '@/components/ui/Reveal';
import { TextReveal } from '@/components/ui/TextReveal';
import { contact } from '@/content/contact';
import { home } from '@/content/home';
import { mailboxes } from '@/content/site';
import { bodySans, displaySans } from '@/styles/fonts';
import styles from '@/components/sections/ContactPage.module.css';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Talk to BitQueens about learning, partnerships, events or booking Kristie as a speaker.',
};

/**
 * /contact — one centred column on the dotted map.
 *
 * The form is the page, so it sits in the middle under the headline rather
 * than beside it. What a message can be about follows underneath, where it
 * answers the question the form has just raised instead of competing with
 * it for the reader's attention. The FAQ closes, as on /join.
 */
export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string }>;
}) {
  const { topic } = await searchParams;

  return (
    <>
      <section
        aria-label="Contact BitQueens"
        className={`${styles.section} ${styles.centred} ${displaySans.variable} ${bodySans.variable}`}
      >
        <GlobalDotMap className={styles.map} />

        <div className={styles.inner}>
          <div className={styles.head}>
            <Reveal>
              <p className={styles.eyebrow}>{contact.eyebrow}</p>
            </Reveal>
            <TextReveal
              as="h1"
              text={`${contact.headline}\n${contact.headlineSerif}`}
              className={styles.headline}
              lineClassNames={[styles.line, styles.line]}
            />
            <Reveal delay={140}>
              <p className={styles.intro}>{contact.intro}</p>
            </Reveal>
          </div>

          <Reveal delay={180} className={`${styles.panel} ${styles.formPanel}`}>
            <h2 className={styles.panelTitle}>{contact.formTitle}</h2>
            <ContactForm initialTopic={topic} />
          </Reveal>

          <div className={styles.ways}>
            {contact.routes.map((route, i) => (
              <Reveal key={route.title} delay={240 + i * 70} className={styles.way}>
                <h2 className={styles.wayTitle}>{route.title}</h2>
                <p className={styles.wayBody}>{route.body}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={520} className={styles.direct}>
            <p className={styles.directLabel}>{contact.directLabel}</p>
            <a className={styles.mail} href={`mailto:${mailboxes.general}`}>
              {mailboxes.general}
            </a>
          </Reveal>
        </div>
      </section>

      <Faq content={home.faq} name="contact-faq" />
    </>
  );
}
