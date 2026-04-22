function smoothScroll(e: React.MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();
  const href = e.currentTarget.getAttribute("href");
  if (href) document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
}

const socials = [
  {
    name: "GitHub",
    href: "https://github.com/JacobEBrown",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/JacobEBrown",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125ZM6.864 20.452H3.81V9h3.054v11.452Z" />
      </svg>
    ),
  },
  {
    name: "Substack",
    href: "https://substack.com/@JacobEBrown",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M22.539 8.242H1.46V5.406h21.08v2.836ZM1.46 10.812V24l9.56-5.26L20.539 24V10.812H1.46ZM22.54 0H1.46v2.836h21.08V0Z" />
      </svg>
    ),
  },
  {
    name: "Figma",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 12c0-2.209 1.791-4 4-4s4 1.791 4 4-1.791 4-4 4-4-1.791-4-4zM4 20c0-2.209 1.791-4 4-4h4v4c0 2.209-1.791 4-4 4s-4-1.791-4-4zm0-8c0-2.209 1.791-4 4-4h4v8H8c-2.209 0-4-1.791-4-4zm0-8c0-2.209 1.791-4 4-4h4v8H8C5.791 8 4 6.209 4 4zm8-4h4c2.209 0 4 1.791 4 4s-1.791 4-4 4h-4V0z"/>
      </svg>
    ),
  },
];

const pillClasses =
  "bg-transparent border-2 border-text-1 rounded-full px-6 py-2 shadow-md " +
  "font-sans font-semibold text-text-1 text-base md:text-lg tracking-wider " +
  "hover:bg-text-1 hover:text-cream-neutral hover:shadow-xl hover:scale-105 " +
  "active:scale-95 " +
  "transition-all duration-300 ease-out " +
  "inline-flex items-center gap-2";

export default function ContactMe() {
  return (
    <section id="contact" className="bg-blue-neutral flex flex-col items-center justify-end" style={{ minHeight: 'calc(100svh - var(--nav-h, 5rem))' }}>
      <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 sm:px-8">
        <h2 className="font-heading font-medium text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-text-1 mb-8 sm:mb-10 md:mb-14">
          <span className="border-b-4 border-blue-medium-1 pb-2">Contact Me</span>
        </h2>
        <a
          href="mailto:JacobEBrown@jacobebrown.dev"
          className="font-sans text-blue-medium-2 text-xl sm:text-3xl md:text-5xl lg:text-6xl hover:underline"
        >
          JacobEBrown@jacobebrown.dev
        </a>

        <div className="flex flex-wrap justify-center gap-4 mt-6 sm:mt-10">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className={pillClasses}
            >
              {s.icon}
              {s.name}
            </a>
          ))}
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
