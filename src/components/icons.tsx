/**
 * Two small icons, hand-written.
 *
 * An icon library would add a dependency and a bundle for the sake of two glyphs. These
 * inherit `currentColor` and size from the button, so they always match their label.
 *
 * `aria-hidden` on both: the button already says what it does, and a screen reader
 * announcing "arrow" after "Explore My Projects" is noise.
 */

type IconProps = { className?: string }

export function ArrowRightIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 10h11M10.5 5.5 15 10l-4.5 4.5" />
    </svg>
  )
}

export function DownloadIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 3v9M6.5 8.5 10 12l3.5-3.5M4 15.5h12" />
    </svg>
  )
}
