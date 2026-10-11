import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import type { AcademyCommunity as AcademyCommunityContent } from '@/lib/types';
import { bodySans, displaySans } from '@/styles/fonts';
import styles from './AcademyCommunity.module.css';

/**
 * The free community — the page's primary conversion band.
 *
 * The one full blue band on the page: the Academy's division colour, used as
 * a flat solid per the palette rules.
 *
 * It is a card inside the gutters rather than a full-bleed band, the way the
 * homepage's Conference section is: the blue should read as a block on the
 * page, not as the page changing colour.
 *
 * The left column is the ask and nothing else — one filled button, and only
 * one. It used to carry a WhatsApp link under it as well, which is a second
 * door out of the page's primary conversion band. The right column is what
 * membership actually gets you: the checklist, and under it, when the live
 * sessions run. The sessions are not ways in, they are part of what you
 * get, so they belong on this side.
 *
 * Both sessions run at the same hour, so the time is printed once and the
 * days carry the links — rather than repeating a three-timezone string twice.
 * If the times ever diverge the per-row form comes back automatically.
 */
/** The same 14px tick the ecosystem and partner lists use. */
function TickIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M3 8.4 6.2 11.6 13 4.8" />
    </svg>
  );
}

export function AcademyCommunity({
  content,
}: {
  content: AcademyCommunityContent;
}) {
  const sessions = content.sessions ?? [];
  const sharedTime =
    sessions.length > 1 && sessions.every((s) => s.time === sessions[0].time)
      ? sessions[0].time
      : null;

  return (
    <section
      id="community"
      aria-label="The free community"
      className={`${styles.section} ${displaySans.variable} ${bodySans.variable}`}
    >
      <div className={styles.block}>
        <div className={styles.card}>
          <div className={styles.copy}>
            <SectionHead
              eyebrow={content.eyebrow}
              headline={content.headline}
              headlineSerif={content.headlineSerif}
              intro={content.body}
              onDark
            />

            <Reveal delay={200} className={styles.actions}>
              <Button href={content.cta.href} variant="primary" onDark arrow={false}>
                {content.cta.label}
              </Button>
            </Reveal>
          </div>

          <div className={styles.gets}>
            <ul className={styles.list}>
              {content.includes.map((item, i) => (
                <Reveal key={item} as="li" delay={i * 80} className={styles.item}>
                  <span className={styles.tick} aria-hidden="true">
                    <TickIcon />
                  </span>
                  <span className={styles.text}>{item}</span>
                </Reveal>
              ))}
            </ul>

            {sessions.length > 0 && (
              <Reveal delay={320} className={styles.sessions}>
                <p className={styles.sessionsTitle}>Live training, every week</p>
                {sharedTime && <p className={styles.sessionsTime}>{sharedTime}</p>}
                <ul className={styles.sessionsList}>
                  {sessions.map((session) => (
                    <li key={session.day}>
                      <a
                        href={session.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.session}
                      >
                        <span className={styles.sessionDay}>{session.day}</span>
                        {!sharedTime && (
                          <span className={styles.sessionTime}>{session.time}</span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
