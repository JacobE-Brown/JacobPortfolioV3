import type { SubTechItem } from './types'

export function SubTechChip({ sub }: { sub: SubTechItem }) {
  const icon = sub.iconSrc ? (
    <img src={sub.iconSrc} alt={sub.label} loading="lazy" className="w-5 h-5 sm:w-6 sm:h-6 object-contain rounded shrink-0" />
  ) : (
    <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded bg-blue-medium-1/20 text-text-1 shrink-0 select-none text-[9px] font-bold leading-none">
      {sub.label.slice(0, 2).toUpperCase()}
    </div>
  )

  if (sub.href) {
    return (
      <a
        href={sub.href}
        target="_blank"
        rel="noopener noreferrer"
        title="View certificate"
        className="flex items-center gap-2 bg-white/60 border border-blue-medium-2/50 rounded-full px-3 py-1.5
          cursor-pointer hover:bg-white/90 hover:border-blue-medium-2 hover:shadow-sm transition-all"
      >
        {icon}
        <span className="font-sans text-text-1 text-sm leading-none">{sub.label}</span>
        <span className="font-sans text-blue-medium-2 text-xs leading-none opacity-90 ml-0.5">↗</span>
      </a>
    )
  }

  return (
    <div className="flex items-center gap-2 bg-white/60 border border-blue-medium-1/30 rounded-full px-3 py-1.5 hover:bg-white/80 transition-colors">
      {icon}
      <span className="font-sans text-text-1 text-sm leading-none">{sub.label}</span>
    </div>
  )
}
