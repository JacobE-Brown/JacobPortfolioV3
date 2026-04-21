interface ProjectLinkProps {
  href: string
  label: string
  /** Icon src — any img-compatible URL or imported asset */
  icon: string
}

export default function ProjectLink({ href, label, icon }: ProjectLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 self-start
                 font-sans text-sm md:text-base text-text-2 hover:text-text-1
                 transition-colors duration-200"
    >
      <img src={icon} alt="" className="w-5 h-5 opacity-60" />
      {label}
    </a>
  )
}
