import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import githubIcon from '@/assets/images/tech/github-1-1.svg'
import linkedinIcon from '@/assets/images/misc/linkedin(1).svg'
import substackIcon from '@/assets/images/misc/substack.svg'
import figmaIcon from '@/assets/images/tech/figma.svg'

gsap.registerPlugin(ScrollTrigger)

function smoothScroll(e: React.MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();
  const href = e.currentTarget.getAttribute("href");
  if (href) document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
}

const socials = [
  { name: "GitHub",   href: "https://github.com/JacobEBrown",      icon: githubIcon },
  { name: "LinkedIn", href: "https://linkedin.com/in/JacobEBrown",  icon: linkedinIcon },
  { name: "Substack", href: "https://substack.com/@JacobEBrown",    icon: substackIcon },
  { name: "Figma",    href: "#",                                     icon: figmaIcon },
];

export default function ContactMe() {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const emailRef = useRef<HTMLDivElement>(null)
  const emailLinkRef = useRef<HTMLAnchorElement>(null)
  const emailLineRef = useRef<HTMLDivElement>(null)
  const socialsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const els = [headingRef.current, emailRef.current, socialsRef.current].filter(Boolean) as HTMLElement[]
    if (!els.length) return

    gsap.set(els, { opacity: 0, y: 30 })
    if (emailLineRef.current) gsap.set(emailLineRef.current, { opacity: 0 })

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 80%',
          once: true,
        },
      })

      // Heading slides up
      tl.to(headingRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })

      // Card slides up
      tl.to(emailRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')

      // Email text types in via clip-path
      if (emailLinkRef.current) {
        gsap.set(emailLinkRef.current, { clipPath: 'inset(0 100% 0 0)' })
        tl.to(emailLinkRef.current, {
          clipPath: 'inset(0 0% 0 0)',
          duration: 0.8,
          ease: 'power2.inOut',
        }, '-=0.3')
      }

      // Socials fade up
      tl.to(socialsRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2')

      // Underline hover animation
      const linkEl = emailLinkRef.current?.parentElement
      const lineEl = emailLineRef.current
      if (linkEl && lineEl) {
        linkEl.addEventListener('mouseenter', () => {
          gsap.to(lineEl, { opacity: 1, duration: 0.3, ease: 'power2.out' })
        })
        linkEl.addEventListener('mouseleave', () => {
          gsap.to(lineEl, { opacity: 0, duration: 0.3, ease: 'power2.in' })
        })
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <section id="contact" className="bg-blue-neutral flex flex-col items-center justify-end" style={{ minHeight: 'calc(100svh - var(--nav-h, 5rem))' }}>
      <div className="flex-1 flex flex-col items-center justify-center gap-6 sm:gap-8 md:gap-12 lg:gap-16 px-6 sm:px-8">
        <h2
          ref={headingRef}
          className="font-heading font-medium text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-text-1"
        >
          <span className="border-b-4 border-blue-medium-1 pb-2">Contact Me</span>
        </h2>

        {/* Card: email + socials grouped together */}
        <div
          ref={emailRef}
          className="flex flex-col items-center gap-6 sm:gap-8
                     bg-white/40 border border-blue-medium-1/20 rounded-3xl
                     px-8 sm:px-12 md:px-16 py-8 sm:py-10 md:py-12
                     shadow-sm"
        >
          <div className="flex flex-col items-center gap-2">
            <a
              ref={emailLinkRef}
              href="mailto:Jacob@jacobebrown.dev"
              className="font-sans text-text-2 text-xl sm:text-2xl md:text-3xl lg:text-4xl
                         hover:text-text-1
                         transition-colors duration-300 ease-out"
            >
              Jacob@jacobebrown.dev
            </a>
            <div
              ref={emailLineRef}
              className="h-0.5 w-full bg-blue-medium-1 rounded-full"
            />
          </div>

          <div
            ref={socialsRef}
            className="flex flex-wrap justify-center gap-3"
          >
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white/60 border border-blue-medium-2/50 rounded-full px-4 py-2
                           cursor-pointer hover:bg-white/90 hover:border-blue-medium-2 hover:shadow-md hover:scale-105
                           active:scale-95 transition-all duration-300 ease-out"
              >
                <img src={s.icon} alt="" className="w-5 h-5 sm:w-6 sm:h-6 object-contain rounded shrink-0" />
                <span className="font-sans font-semibold text-text-2 text-sm sm:text-base leading-none">{s.name}</span>
                <span className="font-sans text-blue-medium-2 text-xs leading-none opacity-90 ml-0.5">↗</span>
              </a>
            ))}
          </div>
        </div>
      </div>
      <footer className="bg-text-1 w-full px-8 md:px-16 py-6 shadow-[0_-4px_12px_rgba(0,0,0,0.15)]">
        <div className="max-w-screen-2xl mx-auto flex flex-col items-center gap-4">
          {/* Scroll to top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Scroll to top"
            className="group relative overflow-hidden border-2 border-blue-neutral/30 rounded-full p-2 cursor-pointer
                       text-blue-neutral/50 hover:text-blue-medium-1 hover:border-blue-medium-1
                       hover:scale-110 origin-center will-change-transform
                       transition-all duration-300 ease-out"
          >
            <span className="absolute inset-0 rounded-full bg-blue-medium-1/15 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="relative w-5 h-5">
              <path d="M18 15l-6-6-6 6" />
            </svg>
          </button>

          {/* Quote */}
          <p className="font-heading italic text-blue-neutral/70 text-sm sm:text-base text-center">
            "The mind is not a vessel to be filled, but a fire to be kindled."
            <span className="not-italic ml-2">— Plutarch, <cite>On Listening to Lectures</cite></span>
          </p>

          {/* Nav */}
          <nav className="hidden sm:flex items-center gap-6">
            {[
              { label: "Home", href: "#home" },
              { label: "About", href: "#about" },
              { label: "Skills", href: "#skills" },
              { label: "Projects", href: "#projects" },
              { label: "Contact", href: "#contact" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={smoothScroll}
                className="font-sans text-blue-neutral/50 text-sm sm:text-base hover:text-blue-medium-1 transition-colors"
              >
                {label}
              </a>
            ))}
            <span className="text-blue-neutral/20">|</span>
            <a
              href="/documents/Jacob Brown Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans font-semibold text-blue-medium-1 text-sm sm:text-base hover:text-blue-medium-2 transition-colors"
            >
              Resume
            </a>
          </nav>

          {/* Copyright */}
          <span className="font-sans text-blue-neutral/50 text-xs sm:text-sm">
            &copy; {new Date().getFullYear()} Jacob Brown
          </span>
        </div>
      </footer>
    </section>
  );
}
