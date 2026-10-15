/* -----------------------------------------------------------------------------------------
   Contact details — the single place any of this is written down.

   The hero, the contact section and the footer all read from here, so enabling the CV or
   adding a profile is one edit in one file rather than a hunt through components.

   Nothing in this file is invented. The email and the GitHub profile were both confirmed —
   the profile returns HTTP 200 and belongs to Imran Murtala. LinkedIn, X and the rest are
   absent because no URL for them has been supplied, and a link to a platform's homepage
   instead of someone's actual account is worse than no link.
----------------------------------------------------------------------------------------- */

export const EMAIL = 'murtalaimran@gmail.com'

/** A professional subject line, so a reply does not arrive with an empty one. */
export const EMAIL_SUBJECT = 'Hello Imran — enquiry from your portfolio'

export const mailtoHref = `mailto:${EMAIL}?subject=${encodeURIComponent(EMAIL_SUBJECT)}`

/**
 * ──────────────────────────────────────────────────────────────────────────────────────
 *  THE CV.  ← this is the one line to change
 * ──────────────────────────────────────────────────────────────────────────────────────
 *
 * No CV exists yet, so this is `null` and every CV button simply does not render — in the
 * hero and in the contact section both. A button that 404s is worse than no button, and
 * until now the hero had exactly that.
 *
 * To turn them all on: drop the PDF into `public/` and set this to its path, for example
 *   export const CV_URL: string | null = '/Murtala-Imran-Dauda-CV.pdf'
 * Anything in `public/` is served from the site root. Use the real filename — it is what
 * a recruiter sees in their downloads folder.
 */
export const CV_URL: string | null = null

export interface Profile {
  name: string
  href: string
  /** Shown to screen readers, where "GitHub" alone is ambiguous out of context. */
  label: string
}

/** Only profiles whose URL has been checked. Add LinkedIn and X here once supplied. */
export const profiles: Profile[] = [
  {
    name: 'GitHub',
    href: 'https://github.com/DevLerry',
    label: 'GitHub profile, DevLerry — opens in a new tab',
  },
]

/** Footer navigation. Every href is a section id that exists on the page. */
export const navLinks = [
  { label: 'Work', href: '#projects' },
  { label: 'Case studies', href: '#case-studies' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]
