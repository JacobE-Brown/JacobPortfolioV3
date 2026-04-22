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
      className="flex items-center gap-2 bg-white/60 border border-blue-medium-2/50 rounded-full px-3 py-1.5
                 cursor-pointer hover:bg-white/90 hover:border-blue-medium-2 hover:shadow-sm transition-all"
    >
      <img src={icon} alt="" className="w-5 h-5 sm:w-6 sm:h-6 object-contain rounded shrink-0" />
      <span className="font-sans text-text-2 text-sm leading-none">{label}</span>
      <span className="font-sans text-blue-medium-2 text-xs leading-none opacity-90 ml-0.5">↗</span>
    </a>
  )
}
