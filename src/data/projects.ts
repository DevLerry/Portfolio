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

/** `planned` is deliberately distinct from `in-development`: nothing has been built yet,
    and saying otherwise on a public portfolio is the kind of small overstatement a reviewer
    notices. */
export type ProjectStatus = 'live' | 'in-development' | 'planned' | 'coming-soon'

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
    repoUrl: 'https://github.com/DevLerry/Reelio',
    extraUrl: { label: 'API docs', href: 'https://viora-api-oe5a.onrender.com/api-docs' },
    layout: 'right',
  },
  {
    number: '03',
    name: 'Enterprise App Management & Tracking System',
    category: 'Enterprise Software', // TODO(Imran): confirm the category once scoped.
    // TODO(Imran): this project has not been started — there is no repository, no code and no
    // documentation to describe. The wording below says only that, and nothing more. Replace
    // it with the real problem, users and stack once the build begins.
    description:
      'An enterprise platform for managing and tracking applications across an organisation. Currently at the planning stage — scope and architecture still being defined.',
    tech: [], // TODO(Imran): add the real stack once the build begins.
    status: 'planned',
    statusNote: 'Planned — not yet started',
    preview: {
      kind: 'placeholder',
      note: 'Not yet built',
    },
    unverified: true,
    layout: 'left',
  },
  {
    number: '04',
    name: 'AI Response Bot',
    category: 'Artificial Intelligence',
    description:
      'An AI-powered project currently in development. More details will be revealed as the product takes shape.',
    tech: [],
    status: 'in-development',
    statusNote: 'In development',
    // Still the abstract treatment: there is no interface to photograph yet, and a mockup
    // presented as a screenshot would be the most misleading thing on this page.
    preview: { kind: 'coming-soon' },
    layout: 'compact',
  },
]
