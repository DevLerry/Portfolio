import bankPreview from '../assets/bank-preview.png'
import vioraPreview from '../assets/viora-preview.png'

/* -----------------------------------------------------------------------------------------
   The projects, as data.

   Everything the section renders comes from this file, so adding, reordering or editing a
   project never means touching a component.

   ── A rule worth keeping ───────────────────────────────────────────────────────────────
   Only verified facts go in here. Every description below was read out of the project's own
   README or source; every link was checked and returned 200; both screenshots are of the
   real running applications, not mockups.

   Where something could not be verified it is marked `unverified: true` and flagged in the
   UI rather than quietly invented. A portfolio that overstates is worse than one that is
   modest — the first thing a reviewer does is click the links.
----------------------------------------------------------------------------------------- */

export type ProjectStatus = 'live' | 'in-development' | 'coming-soon'

export type Preview =
  | { kind: 'image'; src: string; alt: string }
  | { kind: 'placeholder'; note: string }
  | { kind: 'coming-soon' }

export interface Project {
  number: string
  name: string
  category: string
  description: string
  /** Only technologies found in the project's own package.json or source. */
  tech: string[]
  status: ProjectStatus
  /** A short, honest note about where the project actually stands. */
  statusNote?: string
  preview: Preview
  /** Rendered only when present — never a dead link. */
  liveUrl?: string
  repoUrl?: string
  /** A second real link, e.g. API documentation. */
  extraUrl?: { label: string; href: string }
  /** True when the copy is a placeholder Imran still needs to replace. */
  unverified?: boolean
  layout: 'feature' | 'left' | 'right' | 'compact'
}

export const projects: Project[] = [
  {
    number: '01',
    name: 'Digital Banking System',
    category: 'Financial Technology',
    // From the project's own README: "OUR Bank", bank code 210.
    description:
      'A production-shaped banking backend built on the NibssByPhoenix rails. It handles customer onboarding with BVN and NIN verification, account creation, intra- and inter-bank transfers, and per-customer transaction history with strict data isolation. The service is the bank that sits on top of the rails — it never treats the provider as its own database.',
    tech: ['TypeScript', 'Express', 'MongoDB', 'Mongoose', 'Zod', 'JWT', 'React', 'Tailwind CSS'],
    status: 'in-development',
    // Backend and React client are both published now (client pushed 15 Oct 2026). There is
    // still no hosted deployment, so no Live preview link is rendered.
    statusNote: 'Full stack published · not deployed',
    preview: {
      kind: 'image',
      src: bankPreview,
      alt: 'The OUR Bank account registration screen, asking for name, email, phone and password before BVN or NIN verification.',
    },
    repoUrl: 'https://github.com/DevLerry/digital-banking-backend-assignment',
    layout: 'feature',
  },
  {
    number: '02',
    name: 'Viora',
    category: 'Video Streaming Platform',
    description:
      'A full-stack video platform: upload, browse and search a catalogue, then watch in a custom-built player that resumes where you stopped, takes keyboard shortcuts and autoplays what is next. Viewers can comment, like, save to Watch Later and review their history, and an admin area moderates the catalogue. Dark and light themes throughout, checked against WCAG AA contrast.',
    tech: [
      'React 19',
      'TypeScript',
      'Vite',
      'Tailwind CSS 4',
      'React Router',
      'Vitest',
      'Express',
      'MongoDB Atlas',
      'Cloudinary',
    ],
    status: 'live',
    statusNote: 'Deployed and running',
    preview: {
      kind: 'image',
      src: vioraPreview,
      alt: 'The Viora home page in dark mode, showing a featured video banner and a row of trending videos with thumbnails.',
    },
    liveUrl: 'https://viora-swart.vercel.app',
    repoUrl: 'https://github.com/hollops/Reelio',
    extraUrl: { label: 'API docs', href: 'https://viora-api-oe5a.onrender.com/api-docs' },
    layout: 'right',
  },
  {
    number: '03',
    name: 'Triax Pulse',
    category: 'Software Product', // TODO(Imran): replace with the real category.
    // TODO(Imran): nothing about this project exists in any repository I could inspect, so
    // this is the placeholder wording from the brief, not a verified description. Replace it
    // — and the category and tech tags — with the real thing before sharing the portfolio.
    description:
      'An evolving software project built around a clear product vision and a focus on reliable engineering.',
    tech: [], // TODO(Imran): add the real stack once the project exists in a repository.
    status: 'in-development',
    statusNote: 'In development',
    preview: {
      kind: 'placeholder',
      note: 'Screenshot to be added',
    },
    unverified: true,
    layout: 'left',
  },
  {
    number: '04',
    name: 'AI Response Bot',
    category: 'Artificial Intelligence',
    description:
      'An upcoming AI-powered project currently in development. More details will be revealed as the product takes shape.',
    tech: [],
    status: 'coming-soon',
    preview: { kind: 'coming-soon' },
    layout: 'compact',
  },
]
