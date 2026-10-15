/**
 * The hero's diagonal weave, reusable on any other section.
 *
 * Same `.hero-grid` class, so it is literally the same texture drifting at the same speed —
 * not a lookalike that would quietly fall out of sync when the tokens change.
 *
 * Drop it as the first child of a `relative` section. It clips its own oversized layer, so
 * it cannot create a horizontal scrollbar, and like every decorative layer here it is
 * hidden from screen readers and takes no clicks.
 *
 * `fade` adds a soft wash top and bottom so the weave emerges and dissolves instead of
 * starting at a hard edge where the previous section ends.
 */
export function SectionWeave({ fade = true }: { fade?: boolean }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="hero-grid" />
      {fade && (
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, var(--color-canvas) 0%, transparent 18%, transparent 82%, var(--color-canvas) 100%)',
          }}
        />
      )}
    </div>
  )
}
