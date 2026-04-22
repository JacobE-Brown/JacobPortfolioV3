import { useState, useEffect, useRef, useCallback } from 'react'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function NavBar() {
  const [activeLink, setActiveLink] = useState('#home')
  const [isStuck, setIsStuck] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return
    const ro = new ResizeObserver(() => {
      document.documentElement.style.setProperty('--nav-h', `${nav.offsetHeight}px`)
    })
    ro.observe(nav)
    document.documentElement.style.setProperty('--nav-h', `${nav.offsetHeight}px`)
    return () => ro.disconnect()
  }, [])

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

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleNavClick = useCallback((href: string) => {
    setActiveLink(href)
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <>
      <div ref={sentinelRef} className="h-0 w-full" aria-hidden="true" />
      <nav ref={navRef} className={`bg-text-1 sticky top-0 z-20 transition-all duration-300
                       max-w-screen-2xl mx-auto
                       sm:mx-4 md:mx-6 lg:mx-8 xl:mx-auto
                       ${isStuck
                         ? 'rounded-none shadow-md'
                         : 'rounded-t-3xl shadow-[0_-2px_4px_rgba(0,0,0,0.04),0_-4px_12px_rgba(0,0,0,0.08),0_-8px_24px_rgba(0,0,0,0.12)]'
                       }`}>
        <div className="flex items-center justify-end px-6 md:px-12 lg:px-18 py-4 md:py-5">
          {/* Hamburger button — visible below md */}
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="md:hidden text-tan-neutral p-1 cursor-pointer"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-7 h-7">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Desktop links — hidden below md */}
          <div className="hidden md:flex items-center gap-11 lg:gap-14">
            {navLinks.map((link) => {
              const isActive = activeLink === link.href
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(link.href)
                  }}
                  className={`relative font-serif text-2xl lg:text-4xl tracking-wide
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
        </div>
      </nav>

      {/* Mobile slide-in drawer */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300
                    ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setMenuOpen(false)}
        />

        {/* Drawer panel */}
        <div
          className={`absolute top-0 right-0 h-full w-72 bg-text-1 shadow-2xl
                      flex flex-col transition-transform duration-300 ease-out
                      ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          {/* Close button */}
          <div className="flex justify-end px-6 py-5">
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="text-tan-neutral p-1 cursor-pointer"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-7 h-7">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Nav links */}
          <div className="flex flex-col gap-2 px-6">
            {navLinks.map((link) => {
              const isActive = activeLink === link.href
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(link.href)
                  }}
                  className={`font-serif text-2xl tracking-wide py-3 px-4 rounded-lg
                    transition-all duration-200
                    ${isActive
                      ? 'text-blue-medium-2 font-bold bg-white/5'
                      : 'text-tan-neutral font-normal hover:text-blue-medium-1 hover:bg-white/5'
                    }`}
                >
                  {link.label}
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
