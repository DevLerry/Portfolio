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
 * Set, so both CV buttons render — the one in the hero and the one in Contact. While this
 * was `null` neither appeared, which is what kept a 404 off the page before the file existed.
 *
 * The file lives in `public/`, which is served from the site root. Its name is what lands in
 * a recruiter's downloads folder, so it carries his, not "cv.pdf".
 *
 * To take the buttons down again, set this back to `null`.
 */
export const CV_URL: string | null = '/Murtala-Imran-Dauda-CV.pdf'

export interface Profile {
  name: string
  href: string
  /** Shown to screen readers, where "GitHub" alone is ambiguous out of context. */
  label: string
}

/** Only profiles whose URL has been checked. */
export const profiles: Profile[] = [
  {
    name: 'GitHub',
    href: 'https://github.com/DevLerry',
    label: 'GitHub profile, DevLerry — opens in a new tab',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/imran-murtala-702b1a19a',
    label: 'LinkedIn profile, Imran Murtala — opens in a new tab',
  },
]

/** Footer navigation. Every href is a section id that exists on the page. */
export const navLinks = [
  { label: 'Work', href: '#projects' },
  { label: 'Case studies', href: '#case-studies' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]
