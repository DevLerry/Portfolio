import { useEffect, useState } from 'react'
import { navLinks } from '../data/contact'
import { ArrowRightIcon } from './icons'

/* -----------------------------------------------------------------------------------------
   The top bar.

   Two behaviours, both driven by IntersectionObserver rather than a scroll listener — the
   browser reports when something crosses a boundary instead of us measuring on every frame,
   so nothing runs while the page sits still:

   1. It is invisible over the hero and gains a glass background once you scroll past it, so
      the hero reads as full-bleed rather than having a bar bolted to the top of it.
   2. The link for the section you are currently reading is marked, so the bar tells you
      where you are instead of only where you could go.
----------------------------------------------------------------------------------------- */

/** True once the page has scrolled past the sentinel sitting at the very top. */
function useScrolled() {
  // Initialised rather than corrected after mount: where there is no IntersectionObserver
  // the solid bar is the safe default, and setting that synchronously inside the effect
  // would start a second render for a value we already know at construction.
  const [scrolled, setScrolled] = useState(() => typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    const sentinel = document.createElement('div')
    sentinel.style.cssText = 'position:absolute;top:0;height:1px;width:1px;pointer-events:none'
    document.body.prepend(sentinel)

    if (typeof IntersectionObserver === 'undefined') return () => sentinel.remove()

    const io = new IntersectionObserver(([e]) => setScrolled(!e?.isIntersecting))
    io.observe(sentinel)
    return () => {
      io.disconnect()
      sentinel.remove()
    }
  }, [])

  return scrolled
}

/** The id of the section currently filling most of the screen. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const seen = new Map<string, number>()

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) seen.set(e.target.id, e.intersectionRatio)
        // Whichever section shows the most wins. Several can be on screen at once, so
        // "the first one intersecting" would flicker between them as you scroll.
        let best: string | null = null
        let bestRatio = 0
        for (const [id, ratio] of seen) {
          if (ratio > bestRatio) {
            best = id
            bestRatio = ratio
          }
        }
        setActive(bestRatio > 0.08 ? best : null)
      },
      // A spread of thresholds: one value only fires at that exact crossing, which is too
      // coarse for sections that are taller than the viewport.
      { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] },
    )

    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    }
    return () => io.disconnect()
  }, [ids])

  return active
}

const SECTION_IDS = navLinks.map((l) => l.href.slice(1))

export function NavBar() {
  const scrolled = useScrolled()
  const active = useActiveSection(SECTION_IDS)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'border-b border-violet/15 bg-canvas/70 backdrop-blur-xl'
          : 'border-b border-transparent'
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-6"
      >
        {/* Brand doubles as "back to top" — expected behaviour, and it costs nothing. */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0 })
          }}
          className="shrink-0 text-sm font-semibold tracking-[-0.01em] text-ink transition-colors hover:text-violet-soft"
        >
          Murtala Imran
        </a>

        {/* Section links. Hidden on phones, where four of them plus the button would crowd
            a 390px bar — the footer carries the same navigation for that case. */}
        <ul className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => {
            const isActive = active === link.href.slice(1)
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  // aria-current tells a screen reader what the violet underline tells eyes.
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative py-2 text-sm transition-colors ${
                    isActive ? 'text-ink' : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={`absolute -bottom-0.5 left-0 h-px bg-violet-soft transition-all duration-300 ${
                      isActive ? 'w-full opacity-100' : 'w-0 opacity-0'
                    }`}
                  />
                </a>
              </li>
            )
          })}
        </ul>

        <a
          href="#contact"
          className="group inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg bg-gradient-to-r from-violet-deep to-violet-mid px-4 py-2 text-sm font-medium text-ink shadow-[0_6px_20px_-8px_var(--color-violet)] transition duration-200 hover:-translate-y-0.5"
        >
          Hire me
          <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </a>
      </nav>
    </header>
  )
}
