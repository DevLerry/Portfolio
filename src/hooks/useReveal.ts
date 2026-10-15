import { useEffect, useRef, useState } from 'react'

/**
 * Reveal an element the first time it scrolls into view.
 *
 * IntersectionObserver rather than a scroll listener: the browser tells us when the element
 * crosses the threshold instead of us asking on every scroll frame, so there is no work
 * being done while the page sits still.
 *
 * It unobserves immediately after firing. A reveal that replays every time you scroll past
 * is a fidget, not a flourish.
 *
 * Returns `true` straight away when the visitor has asked for reduced motion, or when the
 * browser has no IntersectionObserver — in both cases the content must simply be there.
 * Content that depends on an animation to become visible is a bug waiting to happen.
 */
export function useReveal<T extends HTMLElement>(rootMargin = '-80px') {
  const ref = useRef<T>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const node = ref.current
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    if (!node || reduced || typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShown(true)
          observer.unobserve(node) // once is enough
        }
      },
      { rootMargin },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [rootMargin])

  return { ref, shown }
}
