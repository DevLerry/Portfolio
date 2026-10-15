import portrait from '../assets/imran.jpg'
import { CV_URL } from '../data/contact'
import { HeroBackground } from './HeroBackground'
import { ArrowRightIcon, DownloadIcon } from './icons'

/** The Projects section. */
const PROJECTS_HREF = '#projects'

/**
 * The portrait, in an oval.
 *
 * `rounded-full` on a box that is not square gives an ellipse rather than a circle — the
 * radius clamps to half of each axis independently — so a 4:5 frame becomes the oval this
 * wants without any clip-path.
 *
 * object-position sits slightly above centre because the source is a 9:16 phone photo and
 * a straight centre crop would cut the chin.
 */
function Portrait() {
  return (
    <div className="motion-safe:animate-rise relative mx-auto w-full max-w-[300px] lg:mx-0 lg:max-w-[360px]">
      {/* A violet pool behind the oval, slightly larger than it, so the portrait sits in
          light rather than on top of the page. Decorative, so it takes no clicks. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-6 -z-10 rounded-full blur-2xl"
        style={{
          background:
            'radial-gradient(circle, color-mix(in oklab, var(--color-violet) 38%, transparent) 0%, transparent 68%)',
        }}
      />

      <img
        src={portrait}
        alt="Murtala Imran Dauda"
        width={608}
        height={1080}
        /* The only image above the fold, so it loads eagerly and is fetched early —
           everything else on the page waits until it is near the viewport. */
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="aspect-[4/5] w-full rounded-full object-cover shadow-[0_30px_80px_-30px_rgba(0,0,0,0.95)] ring-1 ring-violet/30"
        style={{ objectPosition: 'center 38%' }}
      />
    </div>
  )
}

export function Hero() {
  return (
    <section
      // `relative` makes this the positioning context for the background layers.
      // `isolate` gives it its own stacking context, so the -z-10 layers can never slide
      // behind the page background or over something later on the page.
      className="relative isolate flex min-h-svh items-center justify-center overflow-hidden px-6 py-24"
    >
      <HeroBackground />

      {/*
        Portrait left, words right — on wide screens only.

        In the DOM the portrait comes first, which is also the order it should be read in:
        who this is, then what he does. On a phone the columns stack in that same order, so
        nothing needs reordering and the reading order is identical for everyone.
      */}
      <div className="mx-auto grid w-full max-w-5xl items-center gap-12 lg:grid-cols-[320px_1fr] lg:gap-16">
        <Portrait />

        {/* Centred on a phone where the portrait sits above it; left-aligned beside the
            portrait, where centred text against a left-hand image reads as unanchored. */}
        <div className="text-center lg:text-left">
          {/* --- A. Availability ----------------------------------------------------- */}
          <p className="motion-safe:animate-rise inline-flex items-center gap-2.5 rounded-full border border-violet/20 bg-surface/60 px-4 py-1.5 text-sm text-ink-muted backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="motion-safe:animate-pulse-dot absolute inline-flex h-2 w-2 rounded-full bg-online" />
              <span className="inline-flex h-2 w-2 rounded-full bg-online" />
            </span>
            Available for opportunities
          </p>

          {/* --- B. Headline --------------------------------------------------------- */}
          {/* clamp(min, preferred, max): never smaller than 2.25rem on a phone, never
              larger than 4rem on a wide monitor, fluid in between. The ceiling came down
              from 4.75rem when the portrait took a third of the width — the same type that
              was balanced across the full page is overbearing in a column.
              text-balance evens the line lengths so no line keeps one orphan word. */}
          <h1
            className="motion-safe:animate-rise mt-7 text-balance font-semibold tracking-[-0.03em] text-ink"
            style={{
              fontSize: 'clamp(2.25rem, 5.4vw, 4rem)',
              lineHeight: 1.07,
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

          {/* --- C. Description ------------------------------------------------------ */}
          <p
            className="motion-safe:animate-rise mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-ink-muted lg:mx-0"
            style={{ animationDelay: '160ms' }}
          >
            I&rsquo;m a software developer focused on building thoughtful, reliable, and
            scalable digital experiences &mdash; from intuitive interfaces to the systems that
            power them.
          </p>

          {/* --- D. Actions ---------------------------------------------------------- */}
          {/* Real anchors, not divs with onClick: they are keyboard reachable, work with
              middle-click and "open in new tab", and need no JavaScript to function. */}
          <div
            className="motion-safe:animate-rise mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start"
            style={{ animationDelay: '240ms' }}
          >
            <a
              href={PROJECTS_HREF}
              className="group inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-gradient-to-r from-violet-deep to-violet-mid px-7 py-3.5 font-medium text-ink shadow-[0_8px_30px_-8px_var(--color-violet)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-8px_var(--color-violet)] sm:w-auto"
            >
              Explore My Projects
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>

            {/* Only rendered once CV_URL is set in src/data/contact.ts. Before this guard the
                button pointed at /cv.pdf, which does not exist — a 404 waiting for the first
                recruiter who clicked it. */}
            {CV_URL && (
              <a
                href={CV_URL}
                download
                className="inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-violet/30 bg-surface/40 px-7 py-3.5 font-medium text-ink-muted backdrop-blur-sm transition duration-200 hover:-translate-y-0.5 hover:border-violet/60 hover:bg-surface/70 hover:text-ink sm:w-auto"
              >
                <DownloadIcon />
                Download CV
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
