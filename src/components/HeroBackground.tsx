/**
 * The hero's atmosphere: four stacked decorative layers, and nothing else.
 *
 * Every layer here is pure decoration, so the whole thing is:
 *   - `aria-hidden` — a screen reader hears the headline, not a description of gradients
 *   - `pointer-events-none` — clicks, taps and text selection pass straight through to the
 *     content above. Without this the grid would sit over the buttons and swallow taps.
 *   - negatively z-indexed — behind the content, above the page background
 *
 * Nothing in this file re-renders. The movement is CSS only: a React state update sixty
 * times a second to animate a background would burn battery for no visual gain.
 */
export function HeroBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* 1. The lattice, drifting. `motion-safe:` is Tailwind's prefers-reduced-motion
             guard — if the visitor asked their system for less movement, the grid is
             simply still. The design is unchanged; only the motion goes. */}
      <div className="hero-grid motion-safe:animate-drift" />

      {/* 2. Violet glow behind the headline, breathing very slowly. */}
      <div className="hero-glow motion-safe:animate-breathe" />

      {/* 3. A wash of the secondary purple. */}
      <div className="hero-wash" />

      {/* 4. Vignette last, so it darkens everything beneath it. */}
      <div className="hero-vignette" />

      {/* A single quiet crosshair — the one deliberate "technical canvas" detail. Placed
          off-centre so it reads as an instrument marking rather than decoration. */}
      <svg
        className="absolute top-[22%] right-[12%] hidden text-violet-soft/25 lg:block"
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
      >
        <path d="M14 2v24M2 14h24" stroke="currentColor" strokeWidth="0.75" />
        <circle cx="14" cy="14" r="3.25" stroke="currentColor" strokeWidth="0.75" />
      </svg>
    </div>
  )
}
