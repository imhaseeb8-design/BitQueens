/**
 * /contact — the four ways in, and the form.
 *
 * The routes used to be a literal array inside the page component, which is
 * the one place on this site where copy is not editable without touching
 * JSX. They live here now, like every other page's words.
 */
export const contact = {
  eyebrow: 'Contact BitQueens',
  headline: 'One conversation.',
  headlineSerif: 'A place to start.',
  intro:
    'A question, a collaboration, or an idea for what comes next. Tell us what you have in mind.',

  /** What a message can be about. The form's topic list mirrors these. */
  routes: [
    {
      title: 'Learning & general enquiries',
      body: 'Questions about joining, programmes, or finding your way.',
    },
    {
      title: 'Partnerships',
      body: 'Bring your expertise, networks or support to the ecosystem.',
    },
    {
      title: 'Events',
      body: 'Talk about gatherings, sponsorship or an event idea.',
    },
    {
      title: 'Book Kristie as a speaker',
      body: 'Share your event, audience and the conversation you want to open.',
    },
  ],

  directLabel: 'Prefer to write directly?',
  formTitle: 'Tell us a little more.',
} as const;
