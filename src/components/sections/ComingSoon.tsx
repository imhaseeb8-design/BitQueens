import { AcademyHero } from './AcademyHero';
import { Button } from '@/components/ui/Button';
import { instrumentSerif, interTight, neueMontreal } from '@/styles/fonts';
import styles from './ContactPage.module.css';

export function ComingSoon({foundation=false}:{foundation?:boolean}) {
  const title = foundation ? 'BitQueens Foundation' : 'BitQueens Institute of Emerging Technologies';
  const areas = foundation ? [
    ['Scholarships','Helping more women access learning and opportunity.'],
    ['Advocacy','Supporting a future in technology that includes women.'],
    ['Social impact','Connecting support to the communities that need it.'],
  ] : [
    ['Formal programmes','A future pathway into structured emerging-tech education.'],
    ['Certificates & diplomas','Formal qualifications are part of the Institute’s planned scope.'],
    ['Fellowships','Opportunities for deeper learning and professional growth.'],
  ];
  return <>
    <AcademyHero content={{eyebrow:`${title} · Coming soon`,headline:foundation?'More doors open.':'A deeper path.',headlineSerif:foundation?'More women thrive.':'A new chapter.',body:foundation?'The Foundation is in development, with a focus on scholarships, advocacy and social impact. Support and giving opportunities will be shared when they are ready.':'BIET is in development as the formal education arm of BitQueens. Programme details, qualification status and enrolment will be published when confirmed.',primaryCta:{label:foundation?'Talk about supporting us':'Ask about the Institute',href:'/contact'},secondaryCta:{label:'Explore the ecosystem',href:'/ecosystem'}}}/>
    <section aria-label="Planned focus" className={`${styles.section} ${neueMontreal.variable} ${instrumentSerif.variable} ${interTight.variable}`}><div className={styles.inner}><div className={styles.grid}><div className={styles.copy}><p className={styles.eyebrow}>In development</p><h2 style={{fontSize:'clamp(2.5rem,4vw,4rem)'}}>What’s taking shape.</h2><p className={styles.intro}>{foundation?'Registration is in progress. Donations and scholarship applications are not open yet.':'Filing is in progress. Enrolment is not open yet; accreditation and programme availability will be confirmed before applications begin.'}</p></div><div className={styles.panel}>{areas.map(([heading,body])=><div className={styles.route} key={heading}><h2>{heading}</h2><p>{body}</p></div>)}<div style={{marginTop:'2rem'}}><Button href="/academy" variant="green" size="compact">Start learning at the Academy</Button></div></div></div></div></section>
  </>;
}
