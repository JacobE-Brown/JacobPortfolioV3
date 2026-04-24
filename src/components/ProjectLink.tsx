interface ProjectLinkProps {
  href: string
  label: string
  icon: string
}

export default function ProjectLink({ href, label, icon }: ProjectLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-2.5 bg-white/70 border-2 border-blue-medium-2/40 rounded-full
                 px-5 py-2.5 cursor-pointer
                 hover:bg-white hover:border-blue-medium-2 hover:shadow-lg hover:scale-105
                 active:scale-95
                 transition-all duration-300 ease-out"
    >
      <img src={icon} alt="" className="w-5 h-5 sm:w-6 sm:h-6 object-contain rounded shrink-0
                                        group-hover:scale-110 transition-transform duration-300" loading="lazy" />
      <span className="font-sans font-medium text-text-1 text-sm sm:text-base leading-none">{label}</span>
    </a>
  )
}
