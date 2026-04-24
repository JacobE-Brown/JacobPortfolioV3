import { useState, useEffect } from 'react'
import TechBadge from '../TechBadge'
import { SubTechChip } from './SubTechChip'
import { EducationContent } from './EducationContent'
import type { TechItem } from './types'
import educationIcon from '@/assets/images/misc/education.svg'

export function DetailPanel({ tech }: { tech: TechItem | null }) {
  const [displayTech, setDisplayTech] = useState<TechItem | null>(tech)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    if (tech?.id === displayTech?.id) return
    setAnimating(true)
    const timeout = setTimeout(() => {
      setDisplayTech(tech)
      setAnimating(false)
    }, 200)
    return () => clearTimeout(timeout)
  }, [tech, displayTech?.id])

  const showDefault = !displayTech || displayTech.id === 'education'

  return (
    <div className="flex flex-col items-center gap-6 flex-1 max-w-xl px-4 lg:pt-8">
      <div className={`flex flex-col items-center gap-6 w-full transition-all duration-200 ease-out
        ${animating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
        {/* Large hex badge */}
        <div className="w-48 h-52 cursor-default transition-transform duration-200 ease-out hover:scale-105">
          <TechBadge
            icon={
              <img
                className="relative w-full h-full object-contain rounded-md"
                alt={displayTech?.label ?? 'My Education'}
                src={displayTech?.iconSrc ?? educationIcon}
                loading="lazy"
              />
            }
            name={displayTech?.label ?? 'My Education'}
            hexSize={{ x: 100, y: 100 }}
          />
        </div>

        {showDefault ? (
          <EducationContent />
        ) : (
          <div className="flex flex-col gap-4 w-full">
            <p className="font-sans text-text-1 text-base md:text-lg leading-relaxed">
              {displayTech!.description}
            </p>
            {displayTech!.subTech && displayTech!.subTech.length > 0 && (
              <div className="flex flex-col gap-2">
                <h4 className="font-sans font-semibold text-text-1 text-xs uppercase tracking-widest opacity-50">
                  Related
                </h4>
                <div className="flex flex-wrap gap-2">
                  {displayTech!.subTech.map((sub) => (
                    <SubTechChip key={sub.label} sub={sub} />
                  ))}
                </div>
              </div>
            )}
            <div className="flex flex-wrap gap-2 mt-1">
              {displayTech!.categories.map((cat) => (
                <span key={cat} className="bg-blue-medium-1/20 text-text-1 text-sm font-sans px-3 py-1 rounded-full">
                  {cat}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
