import { useEffect, useState } from 'react'
import { CV_URL, EMAIL, mailtoHref, navLinks, profiles } from '../data/contact'
import { useReveal } from '../hooks/useReveal'
import { ArrowUpIcon, CheckIcon, CopyIcon, DownloadIcon, GithubIcon, MailIcon } from './icons'
import { SectionWeave } from './SectionWeave'

/* -----------------------------------------------------------------------------------------
   The closing chapter: contact, then the footer.

   No contact form. Nothing in this project can deliver a message — there is no backend and
   no form service configured — and a form that silently drops what someone typed is the
   worst thing on a portfolio. A mailto link that actually opens their mail client is more
   useful and cannot lie.
----------------------------------------------------------------------------------------- */

/**
 * Evaluated once when the module loads, not on every render.
 *
 * React treats `new Date()` inside a component body as impure — the same render could
 * produce a different result — and the linter is right to flag it. Hoisting it here keeps
 * the year dynamic per page load while the component stays pure.
 */
const YEAR = new Date().getFullYear()

/** Copy the address, and say honestly whether it worked. */
function CopyEmail() {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle')

  // Reset the message so it does not sit there forever.
  useEffect(() => {
    if (state === 'idle') return
    const t = setTimeout(() => setState('idle'), 2600)
    return () => clearTimeout(t)
  }, [state])

  async function copy() {
    try {
      // Absent over plain HTTP and in some locked-down browsers, so never assume it exists.
      if (!navigator.clipboard) throw new Error('clipboard unavailable')
      await navigator.clipboard.writeText(EMAIL)
      setState('copied')
    } catch {
      // Tell the truth: the address is on screen, so they can still select it by hand.
      setState('failed')
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <a
        href={mailtoHref}
        className="inline-flex items-center py-1.5 font-mono text-sm text-ink underline decoration-violet/40 underline-offset-4 transition-colors hover:decoration-violet"
      >
        {EMAIL}
      </a>

      <button
        type="button"
        onClick={copy}
        className="inline-flex items-center gap-1.5 rounded-lg border border-violet/25 bg-surface/50 px-3 py-2 text-xs text-ink-muted transition-colors hover:border-violet/50 hover:text-ink"
      >
        {state === 'copied' ? <CheckIcon className="h-3.5 w-3.5" /> : <CopyIcon className="h-3.5 w-3.5" />}
        {state === 'copied' ? 'Copied' : 'Copy'}
      </button>

      {/* aria-live so the outcome is announced, not just shown. */}
      <span role="status" aria-live="polite" className="text-xs text-ink-muted">
        {state === 'copied' && 'Email address copied to clipboard'}
        {state === 'failed' && 'Could not copy — select the address above instead'}
      </span>
    </div>
  )
}

function ProfileLinks({ compact = false }: { compact?: boolean }) {
  if (profiles.length === 0) return null

  return (
    <ul className={`flex flex-wrap items-center ${compact ? 'gap-2' : 'gap-3'}`}>
      {profiles.map((p) => (
        <li key={p.name}>
          <a
            href={p.href}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={p.label}
            className={`inline-flex items-center gap-2 rounded-lg border border-violet/20 bg-surface/50 text-ink-muted transition-colors hover:border-violet/45 hover:text-ink ${
              compact ? 'px-3 py-2 text-xs' : 'px-4 py-2.5 text-sm'
            }`}
          >
            <GithubIcon className={compact ? 'h-3.5 w-3.5' : 'h-4 w-4'} />
            {p.name}
          </a>
        </li>
      ))}
    </ul>
  )
}

function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0 })}
      className="inline-flex items-center gap-2 py-2 text-sm text-ink-muted transition-colors hover:text-ink"
    >
      Back to top
      <ArrowUpIcon className="h-4 w-4" />
    </button>
  )
}

export function Contact() {
  const { ref, shown } = useReveal<HTMLDivElement>()

  return (
    <>
      <section
        id="contact"
        aria-labelledby="contact-heading"
        // overflow-hidden clips the oversized glow locally. html{overflow-x:hidden} already
        // catches it globally, but relying on a page-wide safety net to contain a layer this
        // section owns is how a leak survives until someone removes the net.
        className="relative isolate overflow-hidden scroll-mt-24 px-6 pt-24 pb-20 sm:pt-32 sm:pb-24"
      >
        <SectionWeave />

        {/* The lighting lifts here, so the page closes on something rather than trailing off. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[900px] w-[1100px] max-w-[130vw] -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              'radial-gradient(circle, color-mix(in oklab, var(--color-violet) 26%, transparent) 0%, color-mix(in oklab, var(--color-violet) 9%, transparent) 42%, transparent 70%)',
          }}
        />

        <div
          ref={ref}
          className={`mx-auto max-w-3xl text-center transition-all duration-700 ease-out ${
            shown ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-soft">
            Let&rsquo;s connect
          </p>

          <h2
            id="contact-heading"
            className="mt-5 text-balance font-semibold tracking-[-0.03em] text-ink"
            style={{ fontSize: 'clamp(2.2rem, 6vw, 4rem)', lineHeight: 1.08 }}
          >
            Have something meaningful in mind?{' '}
            <span className="inline-block bg-gradient-to-r from-violet to-violet-soft bg-clip-text pb-1 -mb-1 text-transparent">
              Let&rsquo;s build it.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-ink-muted">
            Whether you&rsquo;re looking for a developer, exploring a collaboration, or have an
            interesting problem to solve, I&rsquo;d love to hear from you.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={mailtoHref}
              className="group/cta inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-gradient-to-r from-violet-deep to-violet-mid px-7 py-3.5 font-medium text-ink shadow-[0_8px_30px_-8px_var(--color-violet)] transition duration-200 hover:-translate-y-0.5 sm:w-auto"
            >
              <MailIcon className="h-4 w-4" />
              Get in Touch
            </a>

            {/* Renders only once CV_URL is set in src/data/contact.ts. Until then there is
                no button at all, rather than one that 404s. */}
            {CV_URL && (
              <a
                href={CV_URL}
                download
                className="inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-violet/30 bg-surface/40 px-7 py-3.5 font-medium text-ink-muted transition duration-200 hover:-translate-y-0.5 hover:border-violet/60 hover:text-ink sm:w-auto"
              >
                <DownloadIcon className="h-4 w-4" />
                View My CV
              </a>
            )}
          </div>

          <div className="mt-10 flex flex-col items-center gap-5">
            <CopyEmail />
            <ProfileLinks />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ footer */}
      <footer className="relative border-t border-violet/12 px-6 py-10">
        <div className="mx-auto flex max-w-5xl flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold tracking-[-0.01em] text-ink">Murtala Imran Dauda</p>
            <p className="mt-1 text-sm text-ink-muted">Built with curiosity. Driven by purpose.</p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    // py-2 lifts these from 19px to above the 24px WCAG asks for on touch.
                    className="inline-flex items-center py-2 text-sm text-ink-muted transition-colors hover:text-ink"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mx-auto mt-8 flex max-w-5xl flex-col gap-4 border-t border-violet/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          {/* Generated, not typed — so it is still right next January. */}
          <p className="text-xs text-ink-muted/70">
            &copy; {YEAR} Murtala Imran Dauda. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <ProfileLinks compact />
            <BackToTop />
          </div>
        </div>
      </footer>
    </>
  )
}
