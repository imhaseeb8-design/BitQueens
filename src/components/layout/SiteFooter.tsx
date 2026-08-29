import Image from 'next/image';
import Link from 'next/link';
import { mailboxes, site } from '@/content/site';
import styles from './SiteFooter.module.css';

/** Footer-only links, per the brief: not main nav, but they must exist. */
const moreLinks = [
  { label: 'Contact', href: '/contact' },
  { label: 'Brand assets', href: '/brand' },
  { label: 'Careers', href: '/careers' },
];

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div>
            <Link
              href="/"
              className={styles.logo}
              aria-label={`${site.name} home`}
            >
              <Image
                src="/bitqueens-logo.png"
                alt=""
                width={376}
                height={76}
              />
            </Link>
            <p className={styles.tagline}>{site.tagline}</p>
          </div>

          <div className={styles.columns}>
            <div>
              <h2 className={styles.colTitle}>Ecosystem</h2>
              <div className={styles.list}>
                {site.nav.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={styles.link}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h2 className={styles.colTitle}>More</h2>
              <div className={styles.list}>
                {moreLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={styles.link}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h2 className={styles.colTitle}>Contact</h2>
              <div className={styles.list}>
                <a href={`mailto:${mailboxes.general}`} className={styles.link}>
                  {mailboxes.general}
                </a>
                <a
                  href={`mailto:${mailboxes.partnerships}`}
                  className={styles.link}
                >
                  {mailboxes.partnerships}
                </a>
                <a href={`mailto:${mailboxes.events}`} className={styles.link}>
                  {mailboxes.events}
                </a>
              </div>
            </div>

            <div>
              <h2 className={styles.colTitle}>Follow</h2>
              <div className={styles.list}>
                {site.social.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className={styles.link}
                    rel="noreferrer"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.legal}>
            {site.legal.entities.join(' · ')}
            <br />© {new Date().getFullYear()} {site.name}.
          </p>
          <p className={styles.jurisdiction}>{site.legal.jurisdiction}</p>
        </div>
      </div>
    </footer>
  );
}
