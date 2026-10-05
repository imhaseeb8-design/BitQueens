import { home } from './home';

// Original editorial drafts for review before publication. No invented
// interviews, testimonials, publication dates or attributed quotes.
const articles = [
  {
    excerpt: 'A welcoming place to begin can change what someone believes is possible. Access starts with how we teach, who we welcome, and what happens next.',
    sections: [
      { title: 'A place to begin', paragraphs: ['Emerging technology can feel like a room where everyone already knows the language. For a beginner, the first challenge is often finding a place to ask a simple question without feeling left behind.', 'Access means making that first step possible: explaining an unfamiliar idea, making room for questions, and helping someone practise before expecting them to perform.'] },
      { title: 'Learning that fits real life', paragraphs: ['Clear language matters. So do time, cost, and the chance to learn alongside people facing similar challenges. A programme becomes more useful when its structure acknowledges the lives learners already lead.', 'A practical starting point is a small task someone can complete and understand. Each new skill should make the next step easier to see.'] },
      { title: 'From confidence to opportunity', paragraphs: ['Learning is a beginning. Projects, mentorship, and a community give people places to use their knowledge and keep growing.', 'At BitQueens, the invitation is simple: start where you are. Explore the Academy, meet other learners, and choose a path that makes sense for you.'] },
    ],
  },
  {
    excerpt: 'What does it mean to move from learning about technology to making something with it? Start with a useful problem and a small, practical project.',
    sections: [
      { title: 'Start with a problem you understand', paragraphs: ['You do not need a revolutionary idea to begin building. A task you repeat, a confusing process, or a question in your community can be the starting point for a useful project.', 'Describe who needs help and what they are trying to do. That gives your project a purpose before you choose a tool.'] },
      { title: 'Make the first version small', paragraphs: ['A first version might be a sketch, a simple website, or an organised collection of resources. It should help you learn whether your idea is useful.', 'Share it with someone who might use it. Ask what is clear, what is difficult, and what would make their next step easier. Use that feedback to improve the work.'] },
      { title: 'Build with people around you', paragraphs: ['A learning community makes room for work in progress. Asking for feedback, explaining a decision, and helping another learner are all part of building.', 'The Academy offers a place to begin. Innovations & Labs is the next door for people and organisations exploring products and professional skills programmes.'] },
    ],
  },
  {
    excerpt: 'AI and Web3 are easier to explore when we connect them to everyday needs. Understanding the basics helps you ask better questions about both.',
    sections: [
      { title: 'Begin with what the tools do', paragraphs: ['Artificial intelligence tools can help people draft, organise, and explore information. Their output still needs thoughtful checking, especially when accuracy or someone’s privacy matters.', 'Web3 describes approaches to building online services around blockchain networks. Understanding wallets, transactions, and shared records is a more useful beginning than memorising buzzwords.'] },
      { title: 'Choose understanding before hype', paragraphs: ['A new tool is not automatically the right tool. Ask what problem it solves, who benefits, and what it takes to use it responsibly.', 'For learners, the goal is to understand enough to make informed choices. Practise with small examples, ask questions, and learn how to recognise the limits of a tool.'] },
      { title: 'Find your starting point', paragraphs: ['You can begin with digital skills, explore how blockchain works, or learn to use AI in everyday work. You do not have to learn everything at once.', 'Explore the Academy’s learning tracks and choose a subject that connects with your interests. Practical knowledge grows one step at a time.'] },
    ],
  },
  {
    excerpt: 'Expertise, campus spaces, networks, and funding can each open a different door. Useful partnerships connect those resources to what learners need.',
    sections: [
      { title: 'Start with a shared purpose', paragraphs: ['A partnership begins with a question: what could we make possible together that would be harder to do alone?', 'For BitQueens, that purpose is helping more women learn and build through emerging technology. The contribution can take different forms, depending on the partner and the community.'] },
      { title: 'Different partners, different contributions', paragraphs: ['Companies can share expertise, mentors, and project opportunities. Universities can bring learning closer to students through campus communities.', 'Community networks can connect women to wider circles of support. Funders and institutions can help make learning more accessible. Each route starts with understanding the need and agreeing on a practical contribution.'] },
      { title: 'Make the next step clear', paragraphs: ['Good collaboration needs clear expectations: what each side contributes, who the work serves, and how progress will be reviewed.', 'If you have a space, a skill, a network, or an idea to share, start a conversation with BitQueens. We can explore the right shape together.'] },
    ],
  },
];

export const blogPosts = home.blog.posts.map((post, i) => ({
  ...post,
  slug: post.href.split('/').pop()!,
  excerpt: articles[i].excerpt,
  sections: articles[i].sections.map((section, n) => ({ ...section, id: `section-${n + 1}` })),
  readTime: '3 min read',
}));
export type BlogArticle = (typeof blogPosts)[number];
