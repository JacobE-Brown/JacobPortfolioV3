import { useState, useEffect, useMemo, useCallback } from 'react'
import HexGrid from './HexGrid'
import { DetailPanel } from './tech/DetailPanel'
import { MobileModal } from './tech/MobileModal'
import { technologies, categoryDefs, mobileGridPositions, landscapeMobileGridPositions } from './tech/data'
import type { CategoryName } from './tech/types'

export function Technologies() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [activeFilters, setActiveFilters] = useState<Set<CategoryName>>(new Set())
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 1280)
  const [isCompactGrid, setIsCompactGrid] = useState(false)
  const [isLandscapeCompact, setIsLandscapeCompact] = useState(false)

  // Listen for filter activation from WhatIDo section
  useEffect(() => {
    const handler = (e: Event) => {
      const category = (e as CustomEvent).detail as CategoryName
      setActiveFilters(new Set([category]))
      setSelectedId(null)
    }
    window.addEventListener('activate-skill-filter', handler)
    return () => window.removeEventListener('activate-skill-filter', handler)
  }, [])

  useEffect(() => {
    const orientationMql = window.matchMedia('(orientation: landscape)')

    const check = () => {
      const width = window.innerWidth
      const isLandscape = orientationMql.matches

      setIsMobile(width < 1280)

      if (isLandscape && width < 1024) {
        setIsCompactGrid(false)
        setIsLandscapeCompact(true)
      } else if (!isLandscape && width < 768) {
        setIsCompactGrid(true)
        setIsLandscapeCompact(false)
      } else {
        setIsCompactGrid(false)
        setIsLandscapeCompact(false)
      }
    }

    check()
    window.addEventListener('resize', check)
    orientationMql.addEventListener('change', check)
    return () => {
      window.removeEventListener('resize', check)
      orientationMql.removeEventListener('change', check)
    }
  }, [])

  const displayHexes = useMemo(() => {
    if (isLandscapeCompact) {
      return technologies.map((tech, i) => ({
        ...tech,
        q: landscapeMobileGridPositions[i].q,
        r: landscapeMobileGridPositions[i].r,
      }))
    }
    if (isCompactGrid) {
      return technologies.map((tech, i) => ({
        ...tech,
        q: mobileGridPositions[i].q,
        r: mobileGridPositions[i].r,
      }))
    }
    return technologies
  }, [isCompactGrid, isLandscapeCompact])

  const fadedIds = useMemo(() => {
    if (activeFilters.size === 0) return new Set<string>()
    const faded = new Set<string>()
    for (const tech of displayHexes) {
      const matchesAny = tech.categories.some((cat) => activeFilters.has(cat))
      if (!matchesAny) faded.add(tech.id)
    }
    return faded
  }, [activeFilters, displayHexes])

  const categoryCounts = useMemo(() => {
    const counts = {} as Record<CategoryName, number>
    for (const cat of categoryDefs) counts[cat.name] = 0
    for (const tech of technologies) {
      for (const cat of tech.categories) counts[cat]++
    }
    return counts
  }, [])

  const selectedTech = selectedId ? displayHexes.find((t) => t.id === selectedId) ?? null : null

  const handleSelect = (id: string) => {
    setSelectedId((prev) => (prev === id ? null : id))
  }

  const handleReturn = () => setSelectedId(null)

  const toggleFilter = useCallback((name: CategoryName) => {
    setActiveFilters((prev) => {
      const next = new Set(prev)
      if (next.has(name)) {
        next.delete(name)
      } else {
        next.add(name)
      }
      return next
    })
    setSelectedId(null)
  }, [])

  return (
    <section id="skills" className="bg-blue-neutral flex flex-col items-center justify-center overflow-hidden px-4 py-10 sm:py-12 md:py-20">
      <h2 className="font-heading font-medium text-text-1 text-3xl sm:text-4xl md:text-5xl lg:text-7xl mb-8 sm:mb-10 md:mb-14">
        <span className="border-b-4 border-blue-medium-1 pb-2">My Skills</span>
      </h2>

      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 w-full max-w-7xl">
        {/* Left: Filters + Hex Grid */}
        <div className="flex flex-col items-center gap-4 flex-1">
          <div id="skill-filters" className="flex flex-col items-center gap-2 pt-4">
            <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl px-4">
              {categoryDefs.map((cat) => {
                const isActive = activeFilters.has(cat.name)
                return (
                  <button
                    key={cat.name}
                    onClick={(e) => { e.stopPropagation(); toggleFilter(cat.name) }}
                    aria-pressed={isActive}
                    className={`flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5
                      ${isActive
                        ? 'bg-blue-medium-1 border-blue-medium-2 shadow-md ring-2 ring-blue-medium-2/30'
                        : 'bg-cream-neutral border-blue-medium-1'
                      }
                      rounded-full border-1.5 sm:border-2 shadow-sm
                      hover:shadow-md hover:scale-105 hover:-translate-y-0.5
                      active:scale-95
                      transition-all duration-200 ease-out
                      cursor-pointer`}
                  >
                    {isActive && (
                      <span className="text-text-1 text-xs leading-none">✓</span>
                    )}
                    <span className={`font-sans text-xs sm:text-sm tracking-wide whitespace-nowrap
                      ${isActive ? 'font-semibold text-text-1' : 'font-medium text-text-1'}`}>
                      {cat.displayName}
                    </span>
                    <span className={`font-sans text-[10px] leading-none tabular-nums
                      ${isActive ? 'text-text-1/70' : 'text-text-1/40'}`}>
                      {categoryCounts[cat.name]}
                    </span>
                  </button>
                )
              })}
              {activeFilters.size > 0 && (
                <button
                  onClick={(e) => { e.stopPropagation(); setActiveFilters(new Set()); setSelectedId(null) }}
                  className="flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5
                    bg-transparent border-text-1/20 text-text-1/50
                    rounded-full border-1.5 sm:border-2
                    hover:border-text-1/50 hover:text-text-1/80 hover:scale-105
                    active:scale-95
                    transition-all duration-200 ease-out cursor-pointer"
                >
                  <span className="font-sans text-xs sm:text-sm">✕</span>
                  <span className="font-sans text-xs sm:text-sm whitespace-nowrap">
                    Clear{activeFilters.size > 1 ? ` (${activeFilters.size})` : ''}
                  </span>
                </button>
              )}
            </div>
            <p className="font-sans text-xs text-text-1/40 tracking-wide select-none">
              {activeFilters.size === 0
                ? 'Select multiple to combine · Click any tile to learn more'
                : 'Click any tile to learn more'}
            </p>
          </div>

          <div id="hex-grid-anchor" className="flex justify-center">
            <HexGrid
              hexes={displayHexes}
              size={75}
              fadedIds={fadedIds}
              onSelect={handleSelect}
              onReturn={handleReturn}
              initialSelectedId={isMobile ? undefined : "education"}
              animateSelection={!isMobile}
              externalSelectedId={selectedId}
            />
          </div>
        </div>

        {/* Right: Detail panel (wide desktop only) */}
        <div className="hidden xl:flex">
          <DetailPanel tech={selectedTech} />
        </div>
      </div>

      {/* Mobile modal */}
      {isMobile && selectedTech && (
        <MobileModal tech={selectedTech} onClose={handleReturn} activeFilters={activeFilters} onToggleFilter={toggleFilter} />
      )}
    </section>
  )
}

export default Technologies
