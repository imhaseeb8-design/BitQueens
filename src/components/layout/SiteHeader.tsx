'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { site } from '@/content/site';
import { displaySans, bodySans } from '@/styles/fonts';
import styles from './SiteHeader.module.css';

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (!surfaceRef.current?.contains(event.target as Node)) setMobileOpen(false);
    }
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, []);

  return (
    <header className={[styles.header, displaySans.variable, bodySans.variable].join(' ')}>
      <div className={styles.inner}>
        <div
          ref={surfaceRef}
          className={styles.surface}
          data-mobile-open={mobileOpen}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setMobileOpen(false);
          }}
          onKeyDown={(event) => {
            if (event.key === 'Escape' && mobileOpen) {
              event.preventDefault();
              setMobileOpen(false);
              mobileToggleRef.current?.focus();
            }
          }}
        >
          <div className={styles.bar}>
            <Link href="/" className={styles.logo} aria-label={site.name + ' home'} onClick={() => setMobileOpen(false)}>
              <Image src="/bitqueens-wordmark.svg" alt="" width={120} height={24} priority />
            </Link>

            <nav className={styles.desktopNav} aria-label="Main navigation">
              {site.nav.map((link) => (
                <Link key={link.href} href={link.href} className={styles.navItem}>
                  <span className={styles.flipLabel}>
                    <span className={styles.flipFront}>{link.label}</span>
                    <span className={styles.flipBack} aria-hidden="true">{link.label}</span>
                  </span>
                </Link>
              ))}
            </nav>

            <Link href={site.primaryCta.href} className={styles.desktopCta}>
              <span className={styles.flipLabel}>
                <span className={styles.flipFront}>{site.primaryCta.label}</span>
                <span className={styles.flipBack} aria-hidden="true">{site.primaryCta.label}</span>
              </span>
            </Link>

            <button
              ref={mobileToggleRef}
              type="button"
              className={styles.mobileToggle}
              aria-expanded={mobileOpen}
              aria-controls="bq-mobile-panel"
              onClick={() => setMobileOpen((current) => !current)}
            >
              {mobileOpen ? 'Close' : 'Menu'}
              <span aria-hidden="true">{mobileOpen ? '×' : '+'}</span>
            </button>
          </div>

          <div id="bq-mobile-panel" className={styles.mobilePanelClip} aria-hidden={!mobileOpen} inert={!mobileOpen}>
            <nav className={styles.mobilePanel} aria-label="Mobile navigation">
              {site.nav.map((link) => (
                <Link key={link.href} href={link.href} className={styles.mobileLink} onClick={() => setMobileOpen(false)}>
                  {link.label}
                </Link>
              ))}
              <Link href={site.primaryCta.href} className={styles.mobileCta} onClick={() => setMobileOpen(false)}>
                {site.primaryCta.label}
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
