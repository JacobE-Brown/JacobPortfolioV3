import { useState, useEffect, useRef, useCallback } from 'react'
import TechBadge from '../TechBadge'
import { SubTechChip } from './SubTechChip'
import { EducationContent } from './EducationContent'
import type { TechItem, CategoryName } from './types'

export function MobileModal({ tech, onClose, activeFilters, onToggleFilter }: {
  tech: TechItem
  onClose: () => void
  activeFilters: Set<CategoryName>
  onToggleFilter: (name: CategoryName) => void
}) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const closingRef = useRef(false)
  const [isPortrait, setIsPortrait] = useState(() => window.matchMedia('(orientation: portrait)').matches)

  const animateClose = useCallback(() => {
    if (closingRef.current) return
    closingRef.current = true
    setVisible(false)
    setTimeout(onClose, 300)
  }, [onClose])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const fab = document.getElementById('nav-fab')
    if (fab) fab.style.display = 'none'
    requestAnimationFrame(() => setVisible(true))
    return () => {
      document.body.style.overflow = ''
      if (fab) fab.style.display = ''
    }
  }, [])

  useEffect(() => {
    const mql = window.matchMedia('(orientation: portrait)')
    const handler = (e: MediaQueryListEvent) => setIsPortrait(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    const el = overlayRef.current
    el?.focus()
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') animateClose()
      if (e.key === 'Tab') {
        const focusable = el?.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])'
        )
        if (!focusable?.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [animateClose])

  const modalContent = tech.id === 'education' ? (
    <EducationContent compact />
  ) : (
    <>
      <p className="font-sans text-text-1 text-base leading-relaxed">{tech.description}</p>
      {tech.subTech && tech.subTech.length > 0 && (
        <div className="flex flex-col gap-2">
          <h4 className="font-sans font-semibold text-text-1 text-xs uppercase tracking-widest opacity-50">
            Related
          </h4>
          <div className="flex flex-wrap gap-2">
            {tech.subTech.map((sub) => (
              <SubTechChip key={sub.label} sub={sub} />
            ))}
          </div>
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        {tech.categories.map((cat) => {
          const isActive = activeFilters.has(cat)
          return (
            <button
              key={cat}
              onClick={() => { onToggleFilter(cat); animateClose() }}
              className={`text-sm font-sans px-3 py-1.5 rounded-full border cursor-pointer
                transition-all duration-150 active:scale-95
                ${isActive
                  ? 'bg-blue-medium-1 border-blue-medium-2 text-text-1 font-semibold ring-2 ring-blue-medium-2/30'
                  : 'bg-blue-medium-1/20 border-blue-medium-1/40 text-text-1 hover:bg-blue-medium-1/40 hover:border-blue-medium-1/70'
                }`}
            >
              {cat}
            </button>
          )
        })}
      </div>
    </>
  )

  const closeButton = (
    <button
      onClick={animateClose}
      className="bg-transparent border-2 border-text-1 rounded-full
        px-8 py-3 shadow-md
        font-sans font-semibold text-text-1 text-base tracking-wider
        hover:bg-text-1 hover:text-cream-neutral hover:shadow-xl hover:scale-105
        active:scale-95
        transition-all duration-300 ease-out cursor-pointer"
    >
      Close
    </button>
  )

  return (
    <div
      ref={overlayRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label={tech.label}
      className={`fixed inset-0 z-50 flex flex-col
        backdrop-blur-md bg-white/70 overflow-hidden
        outline-none transition-opacity duration-300
        ${isPortrait ? 'justify-end' : 'items-center p-6'}
        ${visible ? 'opacity-100' : 'opacity-0'}`}
      style={isPortrait ? undefined : { paddingTop: 'calc(var(--nav-h, 80px) + 1.5rem)' }}
      onClick={animateClose}
    >
      {isPortrait ? (
        /* Portrait: bottom sheet */
        <div
          className={`flex flex-col w-full h-full
            bg-blue-neutral/60
            transition-transform duration-300 ease-out
            ${visible ? 'translate-y-0' : 'translate-y-full'}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header: icon + title */}
          <div className="flex items-center gap-4 px-6 pt-4 pb-4 shrink-0">
            <img
              className="w-10 h-10 object-contain rounded-md shrink-0"
              alt={tech.label}
              src={tech.iconSrc}
            />
            <h3 className="font-sans font-extrabold text-text-1 text-xl">
              {tech.id === 'education' ? 'My Education' : tech.label}
            </h3>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 min-h-0 overflow-y-auto px-6 flex flex-col gap-4">
            {modalContent}
          </div>

          {/* Close -- pinned at bottom */}
          <div className="shrink-0 flex justify-center px-6 py-5">
            {closeButton}
          </div>
        </div>
      ) : (
        /* Landscape: two-column grid */
        <div
          className={`grid grid-cols-[2fr_1fr] items-center gap-10
            w-full flex-1 min-h-0 px-6 sm:px-12 md:px-20
            transition-all duration-300 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Text -- left column */}
          <div className="flex flex-col gap-4 w-full min-w-0 min-h-0 max-h-full overflow-y-auto py-2">
            {tech.id !== 'education' && (
              <h3 className="font-sans font-extrabold text-text-1 text-xl">{tech.label}</h3>
            )}
            {modalContent}
          </div>

          {/* Hex badge + close -- right column */}
          <div className="flex flex-col items-center justify-center gap-10">
            <div className="flex items-center justify-center
                            cursor-default transition-transform duration-200 ease-out hover:scale-105">
              <TechBadge
                icon={<img className="relative w-full h-full object-contain rounded-md" alt={tech.label} src={tech.iconSrc} loading="lazy" />}
                name={tech.label}
                hexSize={{ x: 120, y: 120 }}
              />
            </div>
            {closeButton}
          </div>
        </div>
      )}
    </div>
  )
}
