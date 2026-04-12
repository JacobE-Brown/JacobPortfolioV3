const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function NavBar() {
  return (
    <nav className="bg-blue-neutral sticky top-0 z-20 border-b border-blue-medium-1/20">
      <div className="flex items-center justify-center gap-6 md:gap-10 px-6 py-4">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="font-sans font-medium text-text-1 text-sm md:text-base tracking-wide
                       hover:text-blue-medium-2 transition-colors"
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  )
}
