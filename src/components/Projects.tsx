import { projects, type Project } from '../data/projects'
import { useReveal } from '../hooks/useReveal'
import { ArrowRightIcon, ExternalLinkIcon, GithubIcon } from './icons'
import { ProjectPreview } from './ProjectPreview'

/* -----------------------------------------------------------------------------------------
   Featured work.

   An editorial run rather than a grid of identical cards: the first project gets the full
   width, the next two alternate sides, and the upcoming one is a smaller card that reads
   clearly as a teaser. The rhythm is what stops four projects looking like a list.
----------------------------------------------------------------------------------------- */

const STATUS_STYLES = {
  live: 'border-online/30 bg-online/10 text-online',
  'in-development': 'border-violet/30 bg-violet/10 text-violet-soft',
  'coming-soon': 'border-violet/30 bg-violet/10 text-violet-soft',
} as const

function StatusBadge({ project }: { project: Project }) {
  const label =
    project.status === 'coming-soon' ? 'Coming soon' : (project.statusNote ?? project.status)

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${STATUS_STYLES[project.status]}`}
    >
      {project.status === 'live' && (
        <span className="motion-safe:animate-pulse-dot h-1.5 w-1.5 rounded-full bg-online" />
      )}
      {label}
    </span>
  )
}

/** Links render only when a real destination exists — never a placeholder href. */
function ProjectLinks({ project }: { project: Project }) {
  if (!project.liveUrl && !project.repoUrl && !project.extraUrl) return null

  return (
    <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="group/link inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-violet-soft"
        >
          Live preview
          <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-1" />
        </a>
      )}
      {project.repoUrl && (
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="group/link inline-flex items-center gap-2 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
        >
          <GithubIcon className="h-4 w-4" />
          View code
        </a>
      )}
      {project.extraUrl && (
        <a
          href={project.extraUrl.href}
          target="_blank"
          rel="noreferrer noopener"
          className="group/link inline-flex items-center gap-2 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
        >
          <ExternalLinkIcon className="h-4 w-4" />
          {project.extraUrl.label}
        </a>
      )}
    </div>
  )
}

function ProjectMeta({ project, large = false }: { project: Project; large?: boolean }) {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="font-mono text-sm text-violet-soft/70">{project.number}</span>
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">
          {project.category}
        </span>
        <StatusBadge project={project} />
      </div>

      <h3
        className="mt-4 font-semibold tracking-[-0.02em] text-ink"
        style={{ fontSize: large ? 'clamp(1.9rem, 3.6vw, 2.6rem)' : 'clamp(1.6rem, 2.6vw, 2rem)' }}
      >
        {project.name}
      </h3>

      <p className="mt-4 max-w-xl text-pretty leading-relaxed text-ink-muted">
        {project.description}
      </p>

      {/* An honest flag rather than a silent placeholder, so a draft never ships unnoticed. */}
      {project.unverified && (
        <p className="mt-3 inline-flex items-center gap-2 rounded-lg border border-violet/20 bg-surface/70 px-3 py-2 text-xs text-ink-muted">
          <span aria-hidden="true">✎</span>
          Placeholder copy — to be replaced with the real project details
        </p>
      )}

      {project.tech.length > 0 && (
        <ul className="mt-6 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <li
              key={t}
              className="rounded-md border border-violet/15 bg-surface/70 px-2.5 py-1 text-xs text-ink-muted"
            >
              {t}
            </li>
          ))}
        </ul>
      )}

      <ProjectLinks project={project} />
    </div>
  )
}

function Showcase({ project, index }: { project: Project; index: number }) {
  const { ref, shown } = useReveal<HTMLElement>()

  // One transition, driven by a class. No animation library, no scroll listener.
  const reveal = `transition-all duration-700 ease-out ${
    shown ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
  }`

  if (project.layout === 'compact') {
    return (
      <article ref={ref} className={`group ${reveal}`} style={{ transitionDelay: '60ms' }}>
        <div className="mx-auto max-w-2xl rounded-2xl border border-violet/15 bg-surface/50 p-6 transition-colors duration-300 hover:border-violet/35 sm:p-8">
          <ProjectPreview preview={project.preview} />
          <div className="mt-7">
            <ProjectMeta project={project} />
          </div>
        </div>
      </article>
    )
  }

  if (project.layout === 'feature') {
    return (
      <article ref={ref} className={`group ${reveal}`}>
        <ProjectPreview preview={project.preview} eager={index === 0} />
        <div className="mt-9 lg:max-w-3xl">
          <ProjectMeta project={project} large />
        </div>
      </article>
    )
  }

  // Alternating two-column. `lg:order-*` flips the sides on wide screens only — on mobile
  // the preview always comes first, so the reading order stays identical for everyone.
  const previewFirst = project.layout === 'left'

  return (
    <article ref={ref} className={`group grid items-center gap-10 lg:grid-cols-2 lg:gap-14 ${reveal}`}>
      <div className={previewFirst ? 'lg:order-1' : 'lg:order-2'}>
        <ProjectPreview preview={project.preview} />
      </div>
      <div className={previewFirst ? 'lg:order-2' : 'lg:order-1'}>
        <ProjectMeta project={project} />
      </div>
    </article>
  )
}

export function Projects() {
  const { ref, shown } = useReveal<HTMLDivElement>()

  return (
    <section id="projects" className="relative px-6 py-24 sm:py-32" aria-labelledby="work-heading">
      <div className="mx-auto max-w-5xl">
        {/* --- Section header --- */}
        <div
          ref={ref}
          className={`max-w-2xl transition-all duration-700 ease-out ${
            shown ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-soft">
            Selected work
          </p>
          <h2
            id="work-heading"
            className="mt-5 text-balance font-semibold tracking-[-0.025em] text-ink"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', lineHeight: 1.1 }}
          >
            Products built with purpose.
          </h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-ink-muted">
            From financial technology to intelligent digital experiences, I build products that
            combine thoughtful design with practical engineering.
          </p>
        </div>

        {/* --- The projects --- */}
        <div className="mt-20 space-y-24 sm:mt-24 sm:space-y-32">
          {projects.map((project, i) => (
            <Showcase key={project.number} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
