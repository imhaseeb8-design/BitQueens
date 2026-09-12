'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { site } from '@/content/site';
import { neueMontreal, interTight } from '@/styles/fonts';
import styles from './SiteHeader.module.css';

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className={`${styles.header} ${neueMontreal.variable} ${interTight.variable}`}>
      <div className={`${styles.inner} ${open ? styles.open : ''}`}>
        <Link href="/" className={styles.logo} aria-label={`${site.name} home`}>
          {/* The wordmark from Figma 260:346, as its vector. */}
          <Image
            src="/bitqueens-wordmark.svg"
            alt=""
            width={120}
            height={24}
            priority
          />
        </Link>

        <button
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="bq-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Close' : 'Menu'}
        </button>

        <nav id="bq-nav" className={styles.nav} aria-label="Main">
          {site.nav.map((link) => (
            <Link key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </Link>
          ))}
        </nav>

        <Link href={site.primaryCta.href} className={styles.cta}>
          <span className={styles.ctaLabel}>{site.primaryCta.label}</span>
        </Link>
      </div>
    </header>
  );
}
