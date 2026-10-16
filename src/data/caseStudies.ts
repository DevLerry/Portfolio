/* -----------------------------------------------------------------------------------------
   Case studies — the thinking behind the products, not a second set of project cards.

   Same rule as projects.ts, applied harder: a case study invites a reader to judge how you
   think, so every claim below is traceable. The Viora narrative comes from its own codebase
   and from bugs that were actually found and fixed in it; the banking narrative is taken
   from that project's README, including the limitations its author wrote down.

   Nothing here claims a metric, a user count, a client or a business result. None of those
   exist to claim, and a reviewer who checks is the reviewer worth impressing.
----------------------------------------------------------------------------------------- */

export interface CaseSection {
  heading: string
  /** A paragraph, or a list of points. */
  body: string | string[]
}

export interface CaseStudy {
  id: string
  name: string
  status: 'live' | 'in-development' | 'planned' | 'coming-soon'
  statusLabel: string
  tagline: string
  /** Stated only where it is verifiable. */
  role?: string
  /** Shown on the flagship before the reader expands the rest. */
  intro: CaseSection[]
  /** Revealed by "View case study". */
  detail: CaseSection[]
  liveUrl?: string
  repoUrl?: string
  unverified?: boolean
}

export const flagship: CaseStudy = {
  id: 'viora',
  name: 'Viora',
  status: 'live',
  statusLabel: 'Live product',
  tagline: 'A full-stack video platform — deployed, in use, and still being improved.',
  role: 'Frontend developer on a two-person team. I built the web application, integrated it with the API my teammate wrote, and deployed both halves.',
  intro: [
    {
      heading: 'The problem',
      body: 'Two developers building one product in parallel, where neither half could wait for the other. A video platform needs upload, playback, search, comments, likes, history and moderation — and every one of those screens needs an API that, on day one, did not exist yet.',
    },
    {
      heading: 'The approach',
      body: 'Build the frontend against a mock API that lived in the browser, so every screen was complete and testable before the real backend existed. A single environment flag switches between the mock and the real service, which meant integration day was a configuration change rather than a rewrite.',
    },
  ],
  detail: [
    {
      heading: 'Architecture',
      body: [
        'The frontend and the API were designed independently, so their contracts disagreed — the backend returned data in five different envelope shapes depending on the endpoint.',
        'Rather than teach every component those quirks, one adapter module sits at the boundary and normalises them. No component knows the backend has an opinion about envelopes, and when the API changes, exactly one file changes.',
        'The player is custom rather than a library: it resumes where you stopped, takes keyboard shortcuts, autoplays what is next, and handles its own buffering and error states.',
      ],
    },
    {
      heading: 'Challenges and decisions',
      body: [
        'Deleting a video left behind the watch-history rows pointing at it. The API returned those rows with a null video, the frontend type said that could not happen, and the null reached a card component and took down two whole pages. Fixed in both places: the delete now cascades, and the frontend drops orphaned rows regardless — a server fix alone would not have helped viewers whose history already held one.',
        'The full-screen button did nothing on iPhones. iOS has no element full-screen API at all, so the standard call was not merely unsupported, it was absent and threw. The fix falls back to the video element’s own method and now covers three browser families.',
        'Long videos stalled during playback. Measuring the host rather than guessing showed it was delivering 450 kbps for a file that needs 697 kbps to play in real time — stalling was arithmetically certain, and no amount of code could fix a bandwidth deficit.',
      ],
    },
    {
      heading: 'Current status',
      body: 'Deployed and running: the web app on Vercel, the API on Render, media on Cloudinary and MongoDB Atlas. 108 automated tests cover the parts most likely to break quietly — API translation, form validation, player logic and the data shaping behind the home page.',
    },
    {
      heading: 'What is next',
      body: 'Moving the media off the third-party host it currently streams from, which is the single biggest remaining cause of playback stalls. Measurement, not guesswork, put it at the top of the list.',
    },
  ],
  liveUrl: 'https://viora-swart.vercel.app',
  repoUrl: 'https://github.com/DevLerry/Reelio',
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'banking',
    name: 'Digital Banking System',
    status: 'in-development',
    statusLabel: 'Built · not deployed',
    tagline: 'A bank built on top of real banking rails, with two separate layers of trust.',
    role: 'Sole developer — backend, web client and API integration.',
    intro: [
      {
        heading: 'The problem',
        body: 'Build a working bank — onboarding, verified identity, accounts, transfers and statements — on top of a third-party provider that holds the real account numbers and moves the real money.',
      },
    ],
    detail: [
      {
        heading: 'Architecture',
        body: [
          'The single idea the codebase is built around: the provider is not our database, it is the rails. The service is the bank that sits on top of them.',
          'That produces two entirely separate authentication layers. A customer signs in to us with an email and password and receives our own token, which identifies who is asking. Our service signs in to the provider with an API key and secret and receives one token for the whole bank, cached and renewed before it expires.',
          'Keeping those layers distinct is what makes per-customer data isolation possible: the provider will happily return every account the business owns, so that call is deliberately never reachable from a customer-facing route.',
        ],
      },
      {
        heading: 'Challenges and decisions',
        body: [
          'The provider’s documentation and its behaviour disagreed. Sending the documented uppercase value for an identity type returned a 500; only lowercase worked. Response payloads were wrapped under a different key on almost every endpoint. Dates came back in a different format than they were sent.',
          'Every one of those findings is absorbed inside a single client module, so the quirks never leak into the rest of the codebase — the same instinct as the adapter in Viora, arrived at independently.',
        ],
      },
      {
        heading: 'Current status and honest limitations',
        body: [
          'Backend and web client are both published. There is no hosted deployment, so there is no live link to offer.',
          'Inter-bank transfers are implemented but could not be demonstrated against live data, because every account the provider issues carries our own bank code.',
          'There is no automated test suite. Verification was done through scripted request flows against the live API, including deliberate attack cases: using someone else’s identity number, reading another customer’s transactions, overdrawing, forging tokens and creating duplicate accounts.',
          'Rate limiting is absent and would be the first addition before any real deployment.',
        ],
      },
    ],
    repoUrl: 'https://github.com/DevLerry/digital-banking-backend-assignment',
  },
  {
    id: 'enterprise-app-management',
    name: 'Enterprise App Management & Tracking System',
    status: 'planned',
    statusLabel: 'Planned',
    tagline: 'An enterprise platform for managing and tracking applications across an organisation.',
    // TODO(Imran): the build has not started, so there is no architecture, no decision and no
    // challenge to write about yet. This becomes a real case study once there is a codebase.
    intro: [
      {
        heading: 'Status',
        body: 'At the planning stage. Scope and architecture are still being defined, so there is nothing built to write a case study about yet.',
      },
    ],
    detail: [],
    unverified: true,
  },
  {
    id: 'ai-response-bot',
    name: 'AI Response Bot',
    status: 'in-development',
    statusLabel: 'In development',
    tagline: 'An AI-powered project currently in development.',
    intro: [
      {
        heading: 'About',
        body: 'An AI-powered project currently in development. More details will be revealed as the product takes shape.',
      },
    ],
    detail: [],
  },
]
