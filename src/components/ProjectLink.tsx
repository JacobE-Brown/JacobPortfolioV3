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
      className="flex items-center gap-1.5 bg-white/60 border border-blue-medium-2/50 rounded-lg px-2 py-1
                 cursor-pointer hover:bg-white/90 hover:border-blue-medium-2 hover:shadow-sm transition-all"
    >
      <img src={icon} alt="" className="w-4 h-4 object-contain shrink-0" />
      <span className="font-sans text-text-1 text-xs leading-none">{label}</span>
      <span className="font-sans text-blue-medium-2 text-[9px] leading-none opacity-70 ml-0.5">↗</span>
    </a>
  )
}
