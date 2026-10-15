import { Hero } from './components/Hero'

export default function App() {
  return (
    <main>
      <Hero />
      {/* The Projects section lands here next — the primary CTA already points at it. */}
      <section id="projects" className="sr-only" aria-label="Projects, coming next">
        Projects section to follow.
      </section>
    </main>
  )
}
