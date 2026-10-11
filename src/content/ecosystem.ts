import { home } from './home';

/** The branch descriptions, offerings, and launch states share the homepage source. */
export const ecosystem = {
  hero: {
    eyebrow: 'The BitQueens ecosystem',
    headline: 'One ecosystem.',
    headlineSerif: 'Four ways in.',
    body: 'Learn emerging technology, build with it, and help more women take part. Four branches work toward one purpose: opening the digital economy to women across Africa and beyond.',
    cta: { label: 'Explore the branches', href: '#branches' },
    partnerCta: { label: 'Build with us', href: '#partners' },
  },
  proof: {
    headline: 'What the BitQueens ecosystem has done so far.',
    stats: home.impact.stats,
  },
  branches: home.ecosystem.learn.pillars.map((pillar, index) => ({
    ...pillar,
    id: ['academy', 'labs', 'biet', 'foundation'][index],
    headline: [
      'A place to begin.',
      'A place to build.',
      'A place to go further.',
      'A way to open doors.',
    ][index],
    audience: [
      'For beginners, learners and campus communities',
      'For builders, teams and organisations',
      'For women seeking structured qualifications',
      'For women who need access, and people who can support it',
    ][index],
    note: [
      'Start with the free community, then choose a learning track or a guided cohort. No technical background needed.',
      'Explore our technology products and professional skills programmes. Every engagement starts with a conversation and a clear proposal.',
      'The Institute of Emerging Technologies is in development. Programmes and enrolment will be announced when they are ready.',
      'The Foundation is in development. Scholarship, advocacy and giving opportunities will be announced when they are ready.',
    ][index],
  })),
  /* The closing band is the page's ask, not a summary of it. The four
     branches have just been described in full; restating them here only
     delayed the one thing a reader can act on. Every claim below is already
     answered on the site — the free weekly sessions, the peer community and
     the beginner library are the FAQ's own words, and `/join` is the form
     that routes someone to a track. Nothing here promises more than that. */
  connection: {
    eyebrow: 'Start here',
    headline: 'One form.',
    headlineSerif: 'Every way in.',
    body: 'Tell us where you are and we will point you to the right track, cohort and community. Joining brings weekly live sessions, a peer community, and a library of beginner resources.',
    note: 'Free, always. No technical background needed.',
    cta: { label: 'Join BitQueens', href: '/join' },
  },
  partners: {
    ...home.partners,
    invitation: {
      ...home.partners.invitation,
      cta: {
        label: 'Start a conversation',
        href: home.ecosystem.partner.pillars[0].href,
      },
    },
  },
};
