import { useState, useEffect, useRef } from 'react'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About Me', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function NavBar() {
  const [activeLink, setActiveLink] = useState('#home')
  const [isStuck, setIsStuck] = useState(false)
  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sectionIds = navLinks.map(l => l.href.slice(1))

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveLink(`#${entry.target.id}`)
          }
        }
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )

    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (el) sectionObserver.observe(el)
    }

    // Sentinel sits right above nav — when it scrolls out of view, nav is stuck
    const sentinel = sentinelRef.current
    let stuckObserver: IntersectionObserver | undefined
    if (sentinel) {
      stuckObserver = new IntersectionObserver(
        ([entry]) => setIsStuck(!entry.isIntersecting),
        { threshold: 0 }
      )
      stuckObserver.observe(sentinel)
    }

    return () => {
      sectionObserver.disconnect()
      stuckObserver?.disconnect()
    }
  }, [])

  return (
    <>
      <div ref={sentinelRef} className="h-0 w-full" aria-hidden="true" />
      <nav className={`bg-text-1 sticky top-0 z-20 transition-all duration-300
                       max-w-screen-2xl mx-auto
                       ${isStuck
                         ? 'rounded-none shadow-md'
                         : 'rounded-t-3xl shadow-[0_-2px_4px_rgba(0,0,0,0.04),0_-4px_12px_rgba(0,0,0,0.08),0_-8px_24px_rgba(0,0,0,0.12)] sm:mx-4 md:mx-6 lg:mx-8 xl:mx-auto'
                       }`}>
        <div className="flex items-center justify-end gap-7 md:gap-11 px-8 md:px-12 lg:px-18 py-5">
          {navLinks.map((link) => {
            const isActive = activeLink === link.href
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  setActiveLink(link.href)
                  document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })
                }}
                className={`relative font-serif text-lg md:text-2xl lg:text-4xl tracking-wide
                  transition-all duration-300 ease-out
                  hover:scale-105
                  after:absolute after:bottom-0 after:left-0 after:h-0.5
                  after:bg-blue-medium-2 after:transition-all after:duration-300
                  ${isActive
                    ? 'text-blue-medium-2 font-bold after:w-full'
                    : 'text-tan-neutral font-normal hover:text-blue-medium-1 after:w-0 hover:after:w-full hover:after:bg-blue-medium-1'
                  }`}
              >
                {link.label}
              </a>
            )
          })}
        </div>
      </nav>
    </>
  )
}
