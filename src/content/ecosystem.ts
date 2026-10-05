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
  connection: {
    eyebrow: 'One shared purpose',
    headline: 'More than four branches.',
    headlineSerif: 'A wider world of opportunity.',
    body: 'The Academy gives women a starting point. Innovations & Labs turns skills into practical work. BIET and the Foundation are being developed to extend that journey through structured learning and greater access.',
    note: 'Start with what is open today. Grow with what comes next.',
    cta: { label: 'Find your starting point', href: '/academy' },
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
