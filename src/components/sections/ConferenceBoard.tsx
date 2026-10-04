'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import type { ConferenceBoard as ConferenceBoardContent } from '@/lib/types';
import { instrumentSerif, interTight, neueMontreal } from '@/styles/fonts';
import styles from './ConferenceBoard.module.css';

/**
 * The editions board: the list on the left, the selected edition on the right.
 *
 * Client, because selecting an edition is the whole interaction. The selected
 * row answers in deep green, which is the answer every selectable thing on
 * this site gives.
 *
 * While no edition is confirmed the board does not render at all — an empty
 * list beside an empty panel is worse than one sentence saying so. The empty
 * state is the page's honest state today, and it is what ships; the board
 * lights up the moment a real edition is added to the content.
 */
export function ConferenceBoard({
  content,
}: {
  content: ConferenceBoardContent;
}) {
  const { events } = content;
  const [selectedId, setSelectedId] = useState(events[0]?.id);
  const selected = events.find((e) => e.id === selectedId) ?? events[0];

  return (
    <section
      id="editions"
      aria-label="Conference editions"
      className={`${styles.section} ${neueMontreal.variable} ${instrumentSerif.variable} ${interTight.variable}`}
    >
      <div className={styles.inner}>
        <SectionHead
          eyebrow={content.eyebrow}
          headline={content.headline}
          headlineSerif={content.headlineSerif}
        />

        {events.length === 0 || !selected ? (
          <Reveal delay={120} className={styles.empty}>
            <p className={styles.emptyTitle}>{content.emptyTitle}</p>
            <p className={styles.emptyBody}>{content.emptyBody}</p>
            <Button
              href={content.emptyCta.href}
              variant="green"
              size="compact"
              className={styles.emptyCta}
            >
              {content.emptyCta.label}
            </Button>
          </Reveal>
        ) : (
          <div className={styles.board}>
            <div className={styles.listCol}>
              <p className={styles.listLabel}>{content.listLabel}</p>
              <ul className={styles.list}>
                {events.map((event, i) => {
                  const active = event.id === selected.id;
                  return (
                    <li key={event.id}>
                      <button
                        type="button"
                        onClick={() => setSelectedId(event.id)}
                        aria-current={active}
                        className={`${styles.row} ${active ? styles.rowActive : ''}`}
                      >
                        <span className={styles.rowIndex} aria-hidden="true">
                          / {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className={styles.rowName}>{event.name}</span>
                        <span className={styles.rowPlace}>
                          {event.location}
                          {event.past ? ' · Past' : ''}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <Reveal key={selected.id} delay={60} className={styles.detail}>
              {selected.image.src && (
                <div className={styles.media}>
                  <Image
                    src={selected.image.src}
                    alt={selected.image.alt}
                    fill
                    sizes="(max-width: 900px) 100vw, 760px"
                    className={styles.mediaImg}
                  />
                </div>
              )}

              <h3 className={styles.name}>{selected.name}</h3>

              <div className={styles.when}>
                <span className={styles.whenDate}>{selected.date}</span>
                <span className={styles.whenTime}>{selected.time}</span>
                <span className={styles.whenFormat}>{selected.format}</span>
              </div>

              <p className={styles.aboutLabel}>About the edition</p>
              <p className={styles.about}>{selected.about}</p>

              {selected.tags.length > 0 && (
                <ul className={styles.tags}>
                  {selected.tags.map((tag) => (
                    <li key={tag} className={styles.tag}>
                      {tag}
                    </li>
                  ))}
                </ul>
              )}

              {selected.speakers.length > 0 && (
                <>
                  <p className={styles.aboutLabel}>Speakers</p>
                  <ul className={styles.speakers}>
                    {selected.speakers.map((speaker) => (
                      <li key={speaker.name} className={styles.speaker}>
                        {speaker.portrait.src && (
                          <Image
                            src={speaker.portrait.src}
                            alt={speaker.portrait.alt}
                            width={48}
                            height={48}
                            className={styles.speakerPhoto}
                          />
                        )}
                        <span className={styles.speakerText}>
                          <span className={styles.speakerName}>
                            {speaker.name}
                          </span>
                          <span className={styles.speakerRole}>
                            {speaker.role}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {selected.cta && (
                <Button
                  href={selected.cta.href}
                  variant="quiet"
                  className={styles.detailCta}
                >
                  {selected.cta.label}
                </Button>
              )}
            </Reveal>
          </div>
        )}
      </div>
    </section>
  );
}
