import {
  about,
  education,
  evidence,
  experience,
  principles,
  recognition,
  SKILL_LABELS,
  skillGroups,
  type Skill,
} from '../data/profile'
import { useReveal } from '../hooks/useReveal'
import { ArrowRightIcon } from './icons'
import { SectionWeave } from './SectionWeave'

/* -----------------------------------------------------------------------------------------
   About · Skills · Approach · Evidence.

   One section in four movements, in the order a reader needs them: who he is, what he can
   do, how he works, and the proof. The evidence block at the end is the point of the whole
   thing — a skills list nobody can check is just a list.
----------------------------------------------------------------------------------------- */

/** A small wrapper so each block reveals on its own as the reader arrives. */
function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const { ref, shown } = useReveal<HTMLDivElement>()
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        shown ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  )
}

function SkillChip({ skill }: { skill: Skill }) {
  const learning = skill.level === 'learning'

  return (
    <li
      className={`group/chip relative rounded-lg border px-3 py-1.5 text-sm transition-colors duration-200 ${
        learning
          ? 'border-dashed border-ink-muted/30 bg-transparent text-ink-muted'
          : 'border-violet/20 bg-surface/60 text-ink hover:border-violet/45'
      }`}
    >
      {skill.name}
      {/* Where it was used, shown inline rather than hidden in a tooltip — a tooltip is
          invisible on a phone, and this is the part that makes the claim checkable. */}
      {skill.where && (
        <span className="ml-2 text-xs text-ink-muted/70">{skill.where}</span>
      )}
      {learning && <span className="ml-2 text-xs text-ink-muted/70">Learning</span>}
    </li>
  )
}

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative isolate px-6 py-24 sm:py-32"
    >
      {/* The same drifting weave as the hero. The project sections are deliberately left
          plain so the screenshots in them are the only texture competing for attention. */}
      <SectionWeave />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[460px]"
        style={{
          background:
            'radial-gradient(55% 100% at 50% 0%, color-mix(in oklab, var(--color-violet) 12%, transparent) 0%, transparent 70%)',
        }}
      />

      <div className="mx-auto max-w-5xl">
        {/* ------------------------------------------------- 1. About */}
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-soft">
              {about.eyebrow}
            </p>
            <h2
              id="about-heading"
              className="mt-5 text-balance font-semibold tracking-[-0.025em] text-ink"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', lineHeight: 1.1 }}
            >
              {about.heading}
            </h2>
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="mt-5 text-pretty leading-relaxed text-ink-muted">
                {p}
              </p>
            ))}
          </Reveal>

          <Reveal delay={90}>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-soft">
              Where I focus
            </h3>
            <ul className="mt-5 space-y-4">
              {about.focus.map((f) => (
                <li
                  key={f.title}
                  className="rounded-xl border border-violet/15 bg-surface/40 p-4 transition-colors duration-200 hover:border-violet/35"
                >
                  <p className="font-medium text-ink">{f.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-muted">{f.note}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* ------------------------------------------------- 2. Skills */}
        <Reveal className="mt-24 sm:mt-28">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h3 className="text-2xl font-semibold tracking-[-0.02em] text-ink sm:text-3xl">
              Technical skills
            </h3>
            {/* A key, because the two chip styles mean something. */}
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-ink-muted">
              <li className="flex items-center gap-2">
                <span className="h-3 w-5 rounded border border-violet/40 bg-surface/60" />
                {SKILL_LABELS.used}
              </li>
              <li className="flex items-center gap-2">
                <span className="h-3 w-5 rounded border border-dashed border-ink-muted/40" />
                {SKILL_LABELS.learning}
              </li>
            </ul>
          </div>

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-muted">
            Everything marked &ldquo;used in projects&rdquo; appears in the dependencies or the
            documentation of something I built. No percentages or ratings — they imply a
            precision that does not exist.
          </p>

          <div className="mt-10 grid gap-x-10 gap-y-9 sm:grid-cols-2">
            {skillGroups.map((group) => (
              <div key={group.title}>
                <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">
                  {group.title}
                </h4>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.skills.map((s) => (
                    <SkillChip key={s.name} skill={s} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>

        {/* ------------------------------------------------- 3. Approach */}
        <Reveal className="mt-24 sm:mt-28">
          <h3 className="text-2xl font-semibold tracking-[-0.02em] text-ink sm:text-3xl">
            How I work
          </h3>
          <ol className="mt-10 grid gap-6 sm:grid-cols-2">
            {principles.map((p, i) => (
              <li
                key={p.title}
                className="rounded-2xl border border-violet/15 bg-surface/30 p-6 transition-colors duration-200 hover:border-violet/35"
              >
                <span className="font-mono text-sm text-violet-soft/70">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h4 className="mt-3 text-lg font-semibold text-ink">{p.title}</h4>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-ink-muted">{p.body}</p>
              </li>
            ))}
          </ol>
        </Reveal>

        {/* ------------------------------------------------- 4. Experience & education */}
        <Reveal className="mt-24 sm:mt-28">
          <h3 className="text-2xl font-semibold tracking-[-0.02em] text-ink sm:text-3xl">
            Experience &amp; education
          </h3>

          <div className="mt-10 grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
            {/* A timeline: one rule down the left, a marker per role. */}
            <ol className="relative space-y-9 border-l border-violet/20 pl-7">
              {experience.map((role) => (
                <li key={role.org} className="relative">
                  {/* The marker sits ON the rule: half its width back from the padding. */}
                  <span
                    aria-hidden="true"
                    className={`absolute -left-[33px] top-1.5 h-2.5 w-2.5 rounded-full ${
                      role.current ? 'bg-online' : 'bg-violet/50'
                    }`}
                  />
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h4 className="font-semibold text-ink">{role.title}</h4>
                    <span className="text-xs text-ink-muted">{role.period}</span>
                  </div>
                  <p className="mt-0.5 text-sm text-violet-soft">{role.org}</p>
                  <ul className="mt-3 space-y-2">
                    {role.points.map((pt) => (
                      <li key={pt} className="flex gap-3 text-sm leading-relaxed text-ink-muted">
                        <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-violet/40" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>

            <div className="space-y-9">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">
                  Education
                </h4>
                <ul className="mt-4 space-y-4">
                  {education.map((e) => (
                    <li
                      key={e.qualification}
                      className="rounded-xl border border-violet/15 bg-surface/40 p-4"
                    >
                      <p className="font-medium text-ink">{e.qualification}</p>
                      <p className="mt-1 text-sm text-ink-muted">{e.org}</p>
                      <p className="mt-1 text-xs text-ink-muted/70">
                        {e.period}
                        {e.note ? ` · ${e.note}` : ''}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">
                  Recognition
                </h4>
                <ul className="mt-4 space-y-3">
                  {recognition.map((r) => (
                    <li key={r} className="flex gap-3 text-sm leading-relaxed text-ink-muted">
                      <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-violet/40" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ------------------------------------------------- 5. Evidence */}
        <Reveal className="mt-24 sm:mt-28">
          <h3 className="text-2xl font-semibold tracking-[-0.02em] text-ink sm:text-3xl">
            Where these were used
          </h3>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-muted">
            The skills above come from these two projects. Both are open to read.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {evidence.map((e) => (
              // An in-page anchor to the case study rather than a duplicate project card.
              <a
                key={e.name}
                href={e.href}
                className="group/ev rounded-2xl border border-violet/15 bg-surface/30 p-6 transition-colors duration-200 hover:border-violet/40"
              >
                <div className="flex items-center justify-between gap-4">
                  <h4 className="text-lg font-semibold text-ink">{e.name}</h4>
                  <span className="rounded-full border border-violet/25 px-2.5 py-0.5 text-xs text-ink-muted">
                    {e.status}
                  </span>
                </div>
                <p className="mt-1 text-sm text-ink-muted">{e.role}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {e.stack.map((t) => (
                    <li key={t} className="rounded border border-violet/15 px-2 py-0.5 text-xs text-ink-muted">
                      {t}
                    </li>
                  ))}
                </ul>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-ink">
                  Read the case study
                  <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover/ev:translate-x-1" />
                </span>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
