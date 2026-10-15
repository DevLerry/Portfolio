import { useState } from 'react'
import vioraPreview from '../assets/viora-preview.png'
import { caseStudies, flagship, type CaseSection, type CaseStudy } from '../data/caseStudies'
import { useReveal } from '../hooks/useReveal'
import { ChevronDownIcon, ExternalLinkIcon, GithubIcon } from './icons'

/* -----------------------------------------------------------------------------------------
   Behind the build.

   The Featured Projects section says what exists; this one says how it was thought through.
   Viora leads as the only deployed product, and the rest are disclosures that open in place.

   No router is needed: "View case study" expands the detail where the reader already is,
   with a real anchor so a specific study can still be linked. Adding a routing dependency
   to show four panels would be cost without benefit.
----------------------------------------------------------------------------------------- */

const STATUS_STYLE = {
  live: 'border-online/35 bg-online/10 text-online',
  'in-development': 'border-violet/30 bg-violet/10 text-violet-soft',
  'coming-soon': 'border-violet/30 bg-violet/10 text-violet-soft',
} as const

function Status({ study }: { study: CaseStudy }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] ${STATUS_STYLE[study.status]}`}
    >
      {study.status === 'live' && (
        <span className="motion-safe:animate-pulse-dot h-1.5 w-1.5 rounded-full bg-online" />
      )}
      {study.statusLabel}
    </span>
  )
}

function Section({ section }: { section: CaseSection }) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-soft">
        {section.heading}
      </h4>
      {Array.isArray(section.body) ? (
        <ul className="mt-3 space-y-3">
          {section.body.map((point) => (
            <li key={point} className="flex gap-3 text-pretty leading-relaxed text-ink-muted">
              <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-violet/40" />
              {point}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-pretty leading-relaxed text-ink-muted">{section.body}</p>
      )}
    </div>
  )
}

function PlaceholderNote() {
  return (
    <p className="inline-flex items-center gap-2 rounded-lg border border-violet/20 bg-surface/70 px-3 py-2 text-xs text-ink-muted">
      <span aria-hidden="true">✎</span>
      Case study to be written — project details still to be supplied
    </p>
  )
}

/** The flagship: the one genuinely deployed product, given the most room. */
function Flagship() {
  const { ref, shown } = useReveal<HTMLElement>()
  const [open, setOpen] = useState(false)

  return (
    <article
      ref={ref}
      id="case-viora"
      className={`group scroll-mt-24 overflow-hidden rounded-3xl border border-violet/20 bg-surface/40 transition-all duration-700 ease-out ${
        shown ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}
    >
      <div className="grid lg:grid-cols-[1.05fr_1fr]">
        {/* Narrative FIRST in the DOM so the h3 precedes the role h4 — heading order
            must make sense to a screen reader. CSS order still paints the product shot
            first on mobile and on the right at lg. */}
        {/* Narrative */}
        <div className="order-2 p-6 sm:p-8 lg:order-1 lg:p-10">
          <Status study={flagship} />
          <h3
            className="mt-5 font-semibold tracking-[-0.025em] text-ink"
            style={{ fontSize: 'clamp(2rem, 4vw, 2.9rem)' }}
          >
            {flagship.name}
          </h3>
          <p className="mt-3 text-pretty text-lg leading-relaxed text-ink-muted">
            {flagship.tagline}
          </p>

          <div className="mt-8 space-y-7">
            {flagship.intro.map((s) => (
              <Section key={s.heading} section={s} />
            ))}
          </div>

          {/* The deeper narrative, revealed in place. aria-expanded + id wiring means a
              screen reader knows the button controls this region and whether it is open. */}
          <div
            id="viora-case-detail"
            hidden={!open}
            className="mt-8 space-y-7 border-t border-violet/15 pt-8"
          >
            {flagship.detail.map((s) => (
              <Section key={s.heading} section={s} />
            ))}
          </div>

          {/* flex-wrap + whitespace-nowrap: the buttons may wrap as whole units, but a
              label never breaks across two lines mid-phrase. */}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href={flagship.liveUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="group/cta inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-gradient-to-r from-violet-deep to-violet-mid px-6 py-3.5 font-medium text-ink shadow-[0_8px_30px_-8px_var(--color-violet)] transition duration-200 hover:-translate-y-0.5"
            >
              Explore Live Product
              {/* A diagonal arrow, not a straight one: it is the conventional signal that a
                  link leaves the site and opens in a new tab. */}
              <ExternalLinkIcon className="h-4 w-4 transition-transform duration-200 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5" />
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="viora-case-detail"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-violet/30 bg-surface/50 px-6 py-3.5 font-medium text-ink-muted transition duration-200 hover:border-violet/60 hover:text-ink"
            >
              {open ? 'Hide case study' : 'View case study'}
              <ChevronDownIcon
                className={`h-4 w-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
              />
            </button>

            {flagship.repoUrl && (
              <a
                href={flagship.repoUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center justify-center gap-2 px-2 py-3.5 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
              >
                <GithubIcon className="h-4 w-4" />
                Code
              </a>
            )}
          </div>
        </div>
        {/* Product shot: a real screenshot of the running site. */}
        <div className="order-1 border-violet/15 p-6 lg:order-2 lg:border-l lg:p-8">
          <div className="overflow-hidden rounded-xl border border-violet/15 bg-elevated shadow-[0_24px_70px_-30px_rgba(0,0,0,0.9)]">
            <div
              aria-hidden="true"
              className="flex items-center gap-1.5 border-b border-violet/10 bg-surface px-4 py-2.5"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-ink-muted/25" />
              <span className="h-2.5 w-2.5 rounded-full bg-ink-muted/25" />
              <span className="h-2.5 w-2.5 rounded-full bg-ink-muted/25" />
            </div>
            <img
              src={vioraPreview}
              alt="The Viora home page in dark mode, with a featured video banner and a row of trending videos."
              loading="lazy"
              decoding="async"
              className="w-full object-cover object-top transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.02]"
            />
          </div>

          {flagship.role && (
            <div className="mt-6 rounded-xl border border-violet/15 bg-canvas/50 p-4">
              <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-soft">
                My role
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{flagship.role}</p>
            </div>
          )}
        </div>

      </div>
    </article>
  )
}

/** The rest: a disclosure each, opening in place. */
function StudyPanel({ study, index }: { study: CaseStudy; index: number }) {
  const { ref, shown } = useReveal<HTMLElement>()
  const [open, setOpen] = useState(false)
  const hasDetail = study.detail.length > 0
  const panelId = `case-detail-${study.id}`

  return (
    <article
      ref={ref}
      id={`case-${study.id}`}
      className={`scroll-mt-24 rounded-2xl border border-violet/15 bg-surface/30 p-6 transition-all duration-700 ease-out hover:border-violet/30 sm:p-8 ${
        shown ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}
      style={{ transitionDelay: `${index * 70}ms` }}
    >
      <div className="flex flex-wrap items-center gap-4">
        <Status study={study} />
        {study.unverified && <PlaceholderNote />}
      </div>

      <h3 className="mt-5 text-2xl font-semibold tracking-[-0.02em] text-ink">{study.name}</h3>
      <p className="mt-2 max-w-2xl text-pretty leading-relaxed text-ink-muted">{study.tagline}</p>

      {study.role && <p className="mt-4 text-sm text-ink-muted/80">{study.role}</p>}

      <div className="mt-7 space-y-6">
        {study.intro.map((s) => (
          <Section key={s.heading} section={s} />
        ))}
      </div>

      {hasDetail && (
        <>
          <div
            id={panelId}
            hidden={!open}
            className="mt-7 space-y-7 border-t border-violet/15 pt-7"
          >
            {study.detail.map((s) => (
              <Section key={s.heading} section={s} />
            ))}
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-5">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls={panelId}
              className="inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-violet-soft"
            >
              {open ? 'Hide case study' : 'Read the case study'}
              <ChevronDownIcon
                className={`h-4 w-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
              />
            </button>

            {study.repoUrl && (
              <a
                href={study.repoUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
              >
                <GithubIcon className="h-4 w-4" />
                View code
              </a>
            )}
          </div>
        </>
      )}
    </article>
  )
}

export function CaseStudies() {
  const { ref, shown } = useReveal<HTMLDivElement>()

  return (
    <section
      id="case-studies"
      aria-labelledby="case-studies-heading"
      className="relative px-6 py-24 sm:py-32"
    >
      {/* A soft violet pool so the section reads as its own chapter without a hard edge.
          Decorative, so it is hidden and cannot take a click. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px]"
        style={{
          background:
            'radial-gradient(60% 100% at 50% 0%, color-mix(in oklab, var(--color-violet) 14%, transparent) 0%, transparent 70%)',
        }}
      />

      <div className="mx-auto max-w-5xl">
        <div
          ref={ref}
          className={`max-w-2xl transition-all duration-700 ease-out ${
            shown ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-soft">
            Behind the build
          </p>
          <h2
            id="case-studies-heading"
            className="mt-5 text-balance font-semibold tracking-[-0.025em] text-ink"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', lineHeight: 1.1 }}
          >
            More than code. Products built with intent.
          </h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-ink-muted">
            Every product starts with a problem worth solving. Explore the thinking,
            engineering decisions, and real-world execution behind my work.
          </p>
        </div>

        <div className="mt-16 sm:mt-20">
          <Flagship />
        </div>

        <div className="mt-8 grid gap-6 sm:mt-10">
          {caseStudies.map((study, i) => (
            <StudyPanel key={study.id} study={study} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
