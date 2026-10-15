import { HeroBackground } from './HeroBackground'
import { ArrowRightIcon, DownloadIcon } from './icons'

/* -----------------------------------------------------------------------------------------
   Links.

   Kept at the top as named constants so there is one obvious place to change them, and so
   nothing in the markup is a guess buried in a sea of class names.

   TODO(Imran): both are placeholders until the real things exist.
----------------------------------------------------------------------------------------- */

/** The Projects section, which we build next. Until then this scrolls to the page bottom. */
const PROJECTS_HREF = '#projects'

/**
 * Put the PDF at `public/cv.pdf` and this works with no code change — anything in `public/`
 * is served from the site root. Change the name here if you'd rather call the file
 * something else.
 */
const CV_HREF = '/cv.pdf'

export function Hero() {
  return (
    <section
      // `relative` makes this the positioning context for the background layers.
      // `isolate` gives it its own stacking context, so the -z-10 layers can never slide
      // behind the page background or over something later on the page.
      className="relative isolate flex min-h-svh items-center justify-center overflow-hidden px-6 py-24"
    >
      <HeroBackground />

      {/* max-w-3xl + centred text + generous padding = the negative space the brief asks for. */}
      <div className="mx-auto w-full max-w-3xl text-center">
        {/* --- A. Availability ------------------------------------------------------- */}
        <p className="motion-safe:animate-rise inline-flex items-center gap-2.5 rounded-full border border-violet/20 bg-surface/60 px-4 py-1.5 text-sm text-ink-muted backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="motion-safe:animate-pulse-dot absolute inline-flex h-2 w-2 rounded-full bg-online" />
            <span className="inline-flex h-2 w-2 rounded-full bg-online" />
          </span>
          Available for opportunities
        </p>

        {/* --- B. Headline ----------------------------------------------------------- */}
        {/* clamp(min, preferred, max): never smaller than 2.5rem on a phone, never larger
            than 4.75rem on a wide monitor, and fluid in between — so there is no screen
            width where the type is awkward.
            text-balance evens out the line lengths so no line is left with one orphan word. */}
        <h1
          className="motion-safe:animate-rise mt-7 text-balance font-semibold tracking-[-0.03em] text-ink"
          style={{
            fontSize: 'clamp(2.5rem, 7.2vw, 4.75rem)',
            lineHeight: 1.06,
            animationDelay: '80ms',
          }}
        >
          I build{' '}
          {/* The one accent in the composition: a restrained violet gradient clipped to
              the text. `inline-block` keeps the gradient box tight to the words, and
              pb/-mb stop the descender of the 'g' being clipped by the gradient box. */}
          <span className="inline-block bg-gradient-to-r from-violet to-violet-soft bg-clip-text pb-1 -mb-1 text-transparent">
            digital products
          </span>{' '}
          that turn ideas into reality.
        </h1>

        {/* --- C. Description -------------------------------------------------------- */}
        <p
          className="motion-safe:animate-rise mx-auto mt-7 max-w-xl text-pretty text-lg leading-relaxed text-ink-muted"
          style={{ animationDelay: '160ms' }}
        >
          I&rsquo;m a software developer focused on building thoughtful, reliable, and scalable
          digital experiences &mdash; from intuitive interfaces to the systems that power them.
        </p>

        {/* --- D. Actions ------------------------------------------------------------ */}
        {/* Real anchors, not divs with onClick: they are keyboard reachable, work with
            middle-click and "open in new tab", and need no JavaScript to function. */}
        <div
          className="motion-safe:animate-rise mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          style={{ animationDelay: '240ms' }}
        >
          <a
            href={PROJECTS_HREF}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-deep to-violet-mid px-7 py-3.5 font-medium text-ink shadow-[0_8px_30px_-8px_var(--color-violet)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-8px_var(--color-violet)] sm:w-auto"
          >
            Explore My Projects
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>

          <a
            href={CV_HREF}
            download
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-violet/30 bg-surface/40 px-7 py-3.5 font-medium text-ink-muted backdrop-blur-sm transition duration-200 hover:-translate-y-0.5 hover:border-violet/60 hover:bg-surface/70 hover:text-ink sm:w-auto"
          >
            <DownloadIcon />
            Download CV
          </a>
        </div>
      </div>
    </section>
  )
}
