import Image from 'next/image';
import Link from 'next/link';
import { SocialIcon, type SocialName } from '@/components/ui/SocialIcon';
import { footerLinks, mailboxes, site } from '@/content/site';
import { interTight } from '@/styles/fonts';
import styles from './SiteFooter.module.css';

const SOCIAL_ICONS: Record<string, SocialName> = {
  LinkedIn: 'linkedin',
  X: 'x',
  Instagram: 'instagram',
};

/**
 * Footer — Figma 297:783 (block 298:41).
 *
 * A green hairline, then four columns: the wordmark with a line of purpose
 * and the three social marks; Ecosystem; Explore; Connect. A second hairline
 * over the legal row. Under everything the wordmark is set at the content
 * width and cut off by the bottom of the page.
 */
export function SiteFooter() {
  const columns = [
    { title: 'Ecosystem', links: footerLinks.ecosystem },
    { title: 'Explore', links: footerLinks.explore },
  ];

  return (
    <footer className={`${styles.footer} ${interTight.variable}`}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logo} aria-label={`${site.name} home`}>
              <Image src="/bitqueens-wordmark.svg" alt="" width={132} height={26} />
            </Link>
            <p className={styles.purpose}>{site.purpose}</p>
            <ul className={styles.social} aria-label="Social">
              {site.social.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className={styles.socialLink} rel="noreferrer" aria-label={link.label}>
                    <SocialIcon name={SOCIAL_ICONS[link.label] ?? 'x'} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {columns.map((column) => (
            <div key={column.title} className={styles.column}>
              <h2 className={styles.colTitle}>{column.title}</h2>
              <ul className={styles.list}>
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={styles.link}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className={styles.column}>
            <h2 className={styles.colTitle}>Connect</h2>
            <ul className={styles.list}>
              <li>
                <Link href="/contact" className={styles.link}>
                  Contact
                </Link>
              </li>
              <li>
                <a href={`mailto:${mailboxes.general}`} className={styles.link}>
                  {mailboxes.general}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.legal}>
          <p className={styles.entities}>
            {site.legal.entities.map((entity, i) => (
              <span key={entity}>
                {i > 0 && <span className={styles.legalSep} aria-hidden="true">/</span>}
                {entity.replace(' RC ', ' · RC ')}
              </span>
            ))}
          </p>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} {site.name}
            <span className={styles.legalDot} aria-hidden="true">·</span>
            {site.legal.jurisdiction}
          </p>
        </div>
      </div>

      {/* The wordmark at the content width, its lower third past the page's
          edge (node 297:806 sits 91 below the frame). */}
      <div className={styles.mark} aria-hidden="true">
        <Image
          src="/bitqueens-wordmark-large.svg"
          alt=""
          width={1298}
          height={256}
          className={styles.markImg}
        />
      </div>
    </footer>
  );
}
