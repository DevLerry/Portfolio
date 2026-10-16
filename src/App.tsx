import { useEffect } from 'react'
import { About } from './components/About'
import { CaseStudies } from './components/CaseStudies'
import { Contact } from './components/Contact'
import { Hero } from './components/Hero'
import { NavBar } from './components/NavBar'
import { Projects } from './components/Projects'

/**
 * Make a shared deep link land where it says it will.
 *
 * Opening /#case-viora directly did nothing: the browser looks for that element the moment
 * the HTML arrives, and React has not rendered it yet, so there is nothing to scroll to and
 * the attempt is silently abandoned. Clicking the same link from inside the page always
 * worked, which is exactly why it would have been easy to miss.
 *
 * Two frames, not one: the first lets React paint, the second lets the layout settle before
 * we measure where the target actually is.
 */
function useHashLanding() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (!id) return

    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ block: 'start', behavior: 'auto' })
      })
    })
    return () => cancelAnimationFrame(frame)
  }, [])
}

export default function App() {
  useHashLanding()

  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <Projects />
        <CaseStudies />
        <About />
        <Contact />
      </main>
    </>
  )
}
