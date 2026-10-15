/**
 * The hero's atmosphere: four decorative layers, in a deliberate order.
 *
 * ORDER MATTERS, and getting it wrong is what made the first version's grid invisible.
 * The glow and the wash used to sit ON TOP of the lattice and washed it out, so raising
 * the line opacity alone would never have fixed it. Now:
 *
 *    wash    — secondary purple, bottom
 *    glow    — violet radial, still beneath the grid
 *    GRID    — above both, so it stays crisp against them
 *    vignette— the only thing over the grid, and deliberately gentle
 *
 * The whole stack is:
 *   - `aria-hidden` — a screen reader hears the headline, not a description of gradients
 *   - `pointer-events-none` — clicks, taps and text selection pass straight through
 *   - `overflow-hidden` — clips the oversized grid so it cannot create a scrollbar
 *
 * Nothing here re-renders. The movement is CSS only: updating React state sixty times a
 * second to animate a background would cost battery and buy nothing.
 */
export function HeroBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* 1. Secondary purple wash. */}
      <div className="hero-wash" />

      {/* 2. Violet glow behind the headline, breathing very slowly. */}
      <div className="hero-glow motion-safe:animate-breathe" />

      {/* 3. The lattice — above the glow so it reads clearly, drifting diagonally.
             Its animation is in index.css rather than a `motion-safe:` utility because
             reduced motion must stop the MOVEMENT while keeping the grid visible; the
             global reduced-motion rule does exactly that. */}
      <div className="hero-grid" />

      {/* 4. Vignette, the only layer over the grid. Gentle by design. */}
      <div className="hero-vignette" />

      {/* A single quiet crosshair — the one deliberate "technical canvas" detail. */}
      <svg
        className="absolute top-[22%] right-[12%] hidden text-violet-soft/30 lg:block"
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
