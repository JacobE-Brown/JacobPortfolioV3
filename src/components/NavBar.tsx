import { useState, useEffect, useRef, useCallback } from 'react'
import ResumeSvg from '@/assets/images/misc/Resume.svg'

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
  const [pastHero, setPastHero] = useState(false)
  const [scrollingUp, setScrollingUp] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLElement>(null)

  // Track --nav-h: full height on lg+, 0 on mobile/tablet (nav is hidden)
  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    const mql = window.matchMedia('(min-width: 1024px)')

    const update = () => {
      if (mql.matches) {
        document.documentElement.style.setProperty('--nav-h', `${nav.offsetHeight}px`)
      } else {
        document.documentElement.style.setProperty('--nav-h', '0px')
      }
    }

    const ro = new ResizeObserver(update)
    ro.observe(nav)
    mql.addEventListener('change', update)
    update()

    return () => {
      ro.disconnect()
      mql.removeEventListener('change', update)
    }
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

  // Track scroll direction + whether user has scrolled past hero
  useEffect(() => {
    let lastY = window.scrollY
    let ticking = false
    const threshold = 100 // pixels scrolled before FAB appears
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const y = window.scrollY
        setPastHero(y > threshold)
        if (Math.abs(y - lastY) > 8) {
          setScrollingUp(y < lastY || y <= 0)
          lastY = y
        }
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when drawer is open
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
      {/* Sentinel + desktop nav — hidden below lg */}
      <div ref={sentinelRef} className="hidden lg:block h-0 w-full" aria-hidden="true" />
      <nav ref={navRef} className={`hidden lg:block bg-text-1 sticky top-0 z-20 transition-all duration-300
                       max-w-screen-2xl mx-auto
                       lg:mx-8 xl:mx-auto
                       ${isStuck
                         ? 'rounded-none shadow-md'
                         : 'rounded-t-3xl shadow-[0_-2px_4px_rgba(0,0,0,0.04),0_-4px_12px_rgba(0,0,0,0.08),0_-8px_24px_rgba(0,0,0,0.12)]'
                       }`}>
        <div className="flex items-center justify-end px-12 xl:px-18 py-5">
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
                className={`relative font-serif text-2xl xl:text-4xl tracking-wide
                  ml-11 xl:ml-14 first:ml-0
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
          <span className="ml-11 xl:ml-14 w-px h-6 xl:h-8 bg-tan-neutral/20" aria-hidden="true" />
          <a
            href="/documents/Jacob Brown Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="font-serif text-xl xl:text-2xl tracking-wide
                       ml-11 xl:ml-14 flex items-center gap-2 xl:gap-3
                       text-tan-neutral font-normal
                       border border-tan-neutral/30 rounded-full px-5 xl:px-6 py-1.5 xl:py-2
                       hover:border-blue-medium-1 hover:text-blue-medium-1 hover:bg-blue-medium-1/10
                       transition-all duration-300 ease-out hover:scale-105"
          >
            <img src={ResumeSvg} alt="" className="h-5 xl:h-6 w-auto" aria-hidden="true" />
            Resume
          </a>
        </div>
      </nav>

      {/* Mobile/tablet: subtle hint arrow when FAB is hidden */}
      <div
        aria-hidden="true"
        onClick={() => setMenuOpen(true)}
        className={`fixed bottom-0 right-8 z-39 lg:hidden
                   flex items-end justify-center cursor-pointer
                   transition-all duration-500 ease-out
                   ${menuOpen || (pastHero && scrollingUp)
                     ? 'opacity-0 pointer-events-none translate-y-full'
                     : 'opacity-100 translate-y-0'}`}
      >
        <svg width="28" height="16" viewBox="0 0 28 16" fill="none" className="text-text-1/25">
          <path d="M4 14L14 4L24 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Mobile/tablet floating hamburger button — bottom-right thumb zone */}
      <button
        id="nav-fab"
        onClick={() => setMenuOpen(true)}
        aria-label="Open menu"
        className={`fixed bottom-12 right-8 z-40 lg:hidden
                   w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center
                   bg-text-1 text-tan-neutral rounded-2xl
                   ring-2 ring-tan-neutral/50
                   shadow-[0_2px_8px_rgba(0,42,88,0.2),0_8px_24px_rgba(0,42,88,0.25)]
                   hover:shadow-[0_4px_12px_rgba(0,42,88,0.3),0_12px_32px_rgba(0,42,88,0.35)]
                   hover:ring-tan-neutral/70
                   active:scale-90 active:shadow-none
                   transition-all duration-300 ease-out cursor-pointer
                   ${pastHero && scrollingUp ? 'animate-fab-pulse' : ''}
                   ${menuOpen ? 'opacity-0 pointer-events-none scale-90'
                     : (!pastHero || !scrollingUp) ? 'opacity-0 pointer-events-none translate-y-4'
                     : 'opacity-100 scale-100'}`}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-6 h-6">
          <path d="M4 7h16M4 12h10M4 17h14" />
        </svg>
      </button>

      {/* Mobile/tablet slide-in drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300
                    ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300
                      ${menuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setMenuOpen(false)}
        />

        {/* Drawer panel */}
        <div
          className={`absolute top-0 right-0 h-full w-72 bg-text-1 shadow-2xl
                      flex flex-col transition-transform duration-300 ease-out
                      ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          {/* Header — branding + close */}
          <div className="flex items-center justify-between px-6 pt-6 landscape:pt-3 pb-3">
            <span className="font-serif text-xl text-tan-neutral tracking-wide">
              Jacob Brown
            </span>
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="text-tan-neutral/60 p-2 rounded-lg
                         hover:text-tan-neutral hover:bg-white/10
                         transition-colors duration-200 cursor-pointer"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-6 h-6">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Divider */}
          <div className="mx-6 h-px bg-gradient-to-r from-blue-medium-2/40 via-blue-medium-1/20 to-transparent" />

          {/* Nav links — staggered entrance, scrollable in landscape */}
          <div className="flex flex-col gap-1 px-4 pt-6 landscape:pt-3 overflow-y-auto min-h-0 flex-1">
            {navLinks.map((link, i) => {
              const isActive = activeLink === link.href
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(link.href)
                  }}
                  style={{
                    transitionDelay: menuOpen ? `${i * 60}ms` : '0ms',
                  }}
                  className={`font-serif text-2xl landscape:text-xl tracking-wide py-4 landscape:py-2.5 px-5 rounded-lg
                    transition-all duration-300 ease-out shrink-0
                    ${menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}
                    ${isActive
                      ? 'text-blue-medium-2 font-bold bg-white/8 border-l-3 border-blue-medium-2'
                      : 'text-tan-neutral font-normal border-l-3 border-transparent hover:text-blue-medium-1 hover:bg-white/5 hover:border-blue-medium-1/40'
                    }`}
                >
                  {link.label}
                </a>
              )
            })}
          </div>

          {/* Footer — resume + contact */}
          <div className="shrink-0 px-6 pb-6 landscape:pb-3">
            <div className="h-px bg-gradient-to-r from-blue-medium-2/40 via-blue-medium-1/20 to-transparent mb-4 landscape:mb-2" />

            <a
              href="/documents/Jacob Brown Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="font-serif text-lg text-tan-neutral hover:text-blue-medium-1
                         transition-colors duration-200 mb-3 flex items-center gap-2"
            >
              <img src={ResumeSvg} alt="" className="h-5 w-auto" aria-hidden="true" />
              Resume
            </a>

            <a
              href="mailto:Jacob@jacobebrown.dev"
              className="block text-sm text-tan-neutral/60 hover:text-blue-medium-1
                         transition-colors duration-200"
            >
              Jacob@jacobebrown.dev
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
