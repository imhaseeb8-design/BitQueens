'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { site } from '@/content/site';
import styles from './SiteHeader.module.css';

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={`${styles.inner} ${open ? styles.open : ''}`}>
        <Link href="/" className={styles.logo} aria-label={`${site.name} home`}>
          <Image
            src="/bitqueens-logo.png"
            alt=""
            width={376}
            height={76}
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
          {site.primaryCta.label}
        </Link>
      </div>

      <div className={styles.rule}>
        <div className={styles.ruleLine} />
      </div>
    </header>
  );
}
