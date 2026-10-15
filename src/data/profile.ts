/* -----------------------------------------------------------------------------------------
   Who Imran is, what he can actually do, and how he works.

   ── The rule this file exists to enforce ───────────────────────────────────────────────
   A skills list is the easiest place in a portfolio to overstate, and the easiest place for
   an interviewer to catch you. So every technology below is either in the package.json of a
   project he built, or written in that project's own documentation. Nothing is here because
   it appeared in a tutorial or a plan.

   Two labels, not three, and no percentages, no star ratings, no years-of-experience counts
   and no progress bars. A bar at "80% React" means nothing and invites the question it
   cannot answer.

   No employment history, education or certifications appear anywhere in this file, because
   none of it has been confirmed. Those are left for Imran to supply rather than guessed at.
----------------------------------------------------------------------------------------- */

export type SkillLevel = 'used' | 'learning'

export interface Skill {
  name: string
  level: SkillLevel
  /** Where it was used. Shown as evidence, and only ever a real project. */
  where?: string
}

export interface SkillGroup {
  title: string
  skills: Skill[]
}

export const SKILL_LABELS: Record<SkillLevel, string> = {
  used: 'Used in projects',
  learning: 'Currently learning',
}

export const about = {
  eyebrow: 'The developer behind the products',
  heading: 'Curious by nature. Intentional in execution.',
  paragraphs: [
    'I build web applications end to end — the interface people use, the API behind it, and the plumbing that gets both onto the internet. What interests me most is the part before the code: understanding what a product is actually for, and who is going to be let down if it does not work.',
    'I care about the decisions that are invisible when they are right. Where a quirk in a third-party API gets absorbed so it never spreads. Why a bug that looks like one broken page is really one missing check. I would rather measure a problem than guess at it, and I would rather say what a project cannot do yet than imply that it can.',
  ],
  /** Drawn from what he has actually built — not aspirations. */
  focus: [
    {
      title: 'Full-stack web applications',
      note: 'React and TypeScript on the front, Node and MongoDB behind it.',
    },
    {
      title: 'Third-party API integration',
      note: 'Banking rails and media services, including the parts the docs get wrong.',
    },
    {
      title: 'Accessible, responsive interfaces',
      note: 'Keyboard navigation and WCAG AA contrast checked rather than assumed.',
    },
    {
      title: 'AI product development',
      note: 'Currently building an AI response system — in development.',
    },
  ],
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Languages',
    skills: [
      { name: 'TypeScript', level: 'used', where: 'Both projects' },
      { name: 'JavaScript', level: 'used', where: 'Both projects' },
      { name: 'HTML & CSS', level: 'used', where: 'Both projects' },
      { name: 'Go', level: 'learning' },
    ],
  },
  {
    title: 'Frontend',
    skills: [
      { name: 'React', level: 'used', where: 'Viora, Banking client' },
      { name: 'React Router', level: 'used', where: 'Viora, Banking client' },
      { name: 'Tailwind CSS', level: 'used', where: 'Viora, Banking client' },
      { name: 'Vite', level: 'used', where: 'Viora, Banking client' },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node.js', level: 'used', where: 'Banking system' },
      { name: 'Express', level: 'used', where: 'Banking system' },
      { name: 'REST API design', level: 'used', where: 'Banking system' },
      { name: 'JWT authentication', level: 'used', where: 'Banking system' },
      { name: 'Zod validation', level: 'used', where: 'Banking system' },
      { name: 'bcrypt', level: 'used', where: 'Banking system' },
    ],
  },
  {
    title: 'Data & services',
    skills: [
      { name: 'MongoDB', level: 'used', where: 'Both projects' },
      { name: 'Mongoose', level: 'used', where: 'Both projects' },
      { name: 'MongoDB Atlas', level: 'used', where: 'Viora' },
      { name: 'Cloudinary', level: 'used', where: 'Viora' },
    ],
  },
  {
    title: 'Testing & tooling',
    skills: [
      { name: 'Vitest', level: 'used', where: 'Viora — 108 tests' },
      { name: 'React Testing Library', level: 'used', where: 'Viora' },
      { name: 'Git & GitHub', level: 'used', where: 'Both projects' },
      { name: 'Postman', level: 'used', where: 'Banking system' },
      { name: 'ESLint / oxlint', level: 'used', where: 'Both projects' },
    ],
  },
  {
    title: 'Deployment',
    skills: [
      { name: 'Vercel', level: 'used', where: 'Viora' },
      { name: 'Render', level: 'used', where: 'Viora API' },
      { name: 'Environment configuration', level: 'used', where: 'Both projects' },
    ],
  },
]

export interface Principle {
  title: string
  body: string
}

/** Each one is tied to something that actually happened, not a slogan. */
export const principles: Principle[] = [
  {
    title: 'Problem first',
    body: 'Work out what is actually being asked before choosing how to build it. Most of the engineering decisions I am happiest with came from spending longer on the question.',
  },
  {
    title: 'Contain the mess',
    body: 'When an external API is inconsistent, absorb it at one boundary so the rest of the codebase never learns its quirks. I have now done this twice, in two different projects, and arrived at it independently both times.',
  },
  {
    title: 'Measure, do not guess',
    body: 'When videos stalled on my streaming platform, I measured the host instead of guessing: it was delivering 450 kbps for a file needing 697 kbps. No amount of code fixes a bandwidth deficit, and knowing that saved days.',
  },
  {
    title: 'Be honest about status',
    body: 'A project that is half built should say so. Overstating what works is the fastest way to lose the trust of the person reviewing it — and it is always found out.',
  },
]

export interface Evidence {
  name: string
  href: string
  role: string
  stack: string[]
  status: string
}

/** Skills, traced back to the work that proves them. Links reuse the case-study anchors. */
export const evidence: Evidence[] = [
  {
    name: 'Viora',
    href: '#case-viora',
    role: 'Frontend developer, two-person team',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Vitest', 'Vercel', 'Render', 'Cloudinary'],
    status: 'Live',
  },
  {
    name: 'Digital Banking System',
    href: '#case-banking',
    role: 'Sole developer',
    stack: ['TypeScript', 'Express', 'MongoDB', 'Zod', 'JWT', 'React'],
    status: 'Built',
  },
]
