import type { Preview } from '../data/projects'

/**
 * The three kinds of project preview.
 *
 * Only `image` shows a screenshot, and the only screenshots in this project are of the real
 * applications running. A project without a usable screenshot gets a preview that says so,
 * rather than a stand-in that a reviewer might take for the product.
 */

/** A restrained browser chrome. Enough to read as "this is a screen", no more. */
function BrowserFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border border-violet/15 bg-elevated shadow-[0_24px_70px_-30px_rgba(0,0,0,0.9)]">
      <div
        aria-hidden="true"
        className="flex items-center gap-1.5 border-b border-violet/10 bg-surface px-4 py-2.5"
      >
        <span className="h-2.5 w-2.5 rounded-full bg-ink-muted/25" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink-muted/25" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink-muted/25" />
      </div>
      {children}
    </div>
  )
}

export function ProjectPreview({ preview, eager = false }: { preview: Preview; eager?: boolean }) {
  if (preview.kind === 'image') {
    return (
      <BrowserFrame>
        {/* group-hover comes from the showcase wrapper: a small, slow zoom, nothing theatrical. */}
        <img
          src={preview.src}
          alt={preview.alt}
          /* The first project is above the fold on a laptop, so it loads eagerly; the rest
             wait until they are near the viewport. */
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.03]"
        />
      </BrowserFrame>
    )
  }

  if (preview.kind === 'placeholder') {
    return (
      <BrowserFrame>
        <div className="flex aspect-[16/10] w-full flex-col items-center justify-center gap-3 bg-elevated px-6 text-center">
          <svg
            aria-hidden="true"
            className="h-8 w-8 text-ink-muted/40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
          >
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <path d="m3 15 5-5 4 4 3-3 6 6" />
            <circle cx="9" cy="9" r="1.25" />
          </svg>
          <p className="text-sm text-ink-muted/70">{preview.note}</p>
        </div>
      </BrowserFrame>
    )
  }

  // Coming soon: abstract geometry only. There is no product to photograph, and inventing a
  // screenshot of one would be the single most misleading thing this page could do.
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-violet/20 bg-elevated">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            'radial-gradient(circle, color-mix(in oklab, var(--color-violet) 30%, transparent) 0%, transparent 62%)',
        }}
      />
      <svg
        aria-hidden="true"
        viewBox="0 0 200 125"
        className="absolute inset-0 h-full w-full text-violet-soft/35"
      >
        {/* A small node graph — the most honest possible picture of "something intelligent,
            not yet built". Deliberately abstract, deliberately not a UI. */}
        <g stroke="currentColor" strokeWidth="0.4" fill="none">
          <path d="M100 62 L60 38 M100 62 L60 86 M100 62 L142 48 M100 62 L142 78 M60 38 L60 86 M142 48 L142 78" />
        </g>
        <g fill="currentColor">
          <circle cx="100" cy="62" r="3.2" />
          <circle cx="60" cy="38" r="1.9" />
          <circle cx="60" cy="86" r="1.9" />
          <circle cx="142" cy="48" r="1.9" />
          <circle cx="142" cy="78" r="1.9" />
        </g>
      </svg>
    </div>
  )
}
