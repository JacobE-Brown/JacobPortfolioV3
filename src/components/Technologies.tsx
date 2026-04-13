import React, { useState, useEffect } from 'react'
import HexGrid from './HexGrid'
import TechBadge from './TechBadge'

// Category icons
import vector3 from '@/assets/images/TechLogos/vector-3.svg'
import vector4 from '@/assets/images/TechLogos/vector-4.svg'
import vector5 from '@/assets/images/TechLogos/vector-5.svg'

const categories = [
  { name: 'Front-End Development', active: true, icon: vector3 },
  { name: 'Back-End Development', active: false, icon: null },
  { name: 'Cloud & DevOps', active: false, icon: null },
  { name: 'Mobile Development', active: true, icon: vector4 },
  { name: 'Design & UX', active: true, icon: vector5 },
  { name: 'Education', active: true, icon: vector5 },
  { name: 'Miscellaneous', active: false, icon: null },
]

// Tech icon imports
import figmaIcon from '@/assets/images/TechLogos/figma.svg'
import educationIcon from '@/assets/images/TechLogos/education.svg'
import awsIcon from '@/assets/images/TechLogos/aws.svg'
import reactIcon from '@/assets/images/TechLogos/react.svg'
import vitejsIcon from '@/assets/images/TechLogos/vitejs.svg'
import tailwindIcon from '@/assets/images/TechLogos/vector-2.svg'
import csharpIcon from '@/assets/images/TechLogos/c.svg'
import netcoreIcon from '@/assets/images/TechLogos/net-core-logo-1.svg'
import bootstrapIcon from '@/assets/images/TechLogos/bootstrap-5.svg'
import cssIcon from '@/assets/images/TechLogos/css-3.svg'
import htmlIcon from '@/assets/images/TechLogos/html-5.svg'
import jsIcon from '@/assets/images/TechLogos/js.svg'
import tsIcon from '@/assets/images/TechLogos/typescript.svg'
import kotlinIcon from '@/assets/images/TechLogos/kotlin.svg'
import jetpackIcon from '@/assets/images/TechLogos/jetpack.svg'
import androidIcon from '@/assets/images/TechLogos/vector.svg'
import linuxIcon from '@/assets/images/TechLogos/tux-1.svg'
import archIcon from '@/assets/images/TechLogos/arch-linux.svg'
import pythonIcon from '@/assets/images/TechLogos/python.svg'
import djangoIcon from '@/assets/images/TechLogos/django.svg'
import githubIcon from '@/assets/images/TechLogos/github-1-1.svg'
import sqlIcon from '@/assets/images/TechLogos/sql.svg'
import vueIcon from '@/assets/images/TechLogos/react.svg'

interface TechItem {
  id: string
  label: string
  iconSrc: string
  icon: React.ReactNode
  q: number
  r: number
  description: string
}

function makeTech(id: string, label: string, iconSrc: string, alt: string, q: number, r: number, description?: string): TechItem {
  return {
    id,
    label,
    iconSrc,
    icon: <img className="relative w-full h-full object-contain" alt={alt} src={iconSrc} />,
    q,
    r,
    description: description ?? `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.`,
  }
}

const technologies: TechItem[] = [
  // Row 0 (4 tiles)
  makeTech('sql', 'SQL / Databases', sqlIcon, 'SQL', -1, -2),
  makeTech('figma', 'Figma', figmaIcon, 'Figma', 0, -2),
  makeTech('education', 'My Education', educationIcon, 'Education', 1, -2),
  makeTech('aws', 'AWS', awsIcon, 'AWS', 2, -2),
  // Row 1 (5 tiles)
  makeTech('python', 'Python', pythonIcon, 'Python', -2, -1),
  makeTech('vue', 'Vue', vueIcon, 'Vue', -1, -1),
  makeTech('react', 'React', reactIcon, 'React', 0, -1),
  makeTech('vite', 'Vite JS', vitejsIcon, 'Vite', 1, -1),
  makeTech('tailwind', 'Tailwinds CSS', tailwindIcon, 'Tailwind', 2, -1),
  // Row 2 (6 tiles)
  makeTech('linux', 'Linux', linuxIcon, 'Linux', -3, 0),
  makeTech('github', 'Github', githubIcon, 'GitHub', -2, 0),
  makeTech('csharp', 'C#', csharpIcon, 'C#', -1, 0),
  makeTech('netcore', 'ASP.NET Core', netcoreIcon, '.NET', 0, 0),
  makeTech('bootstrap', 'BootStrap', bootstrapIcon, 'Bootstrap', 1, 0),
  makeTech('arch', 'Arch Linux', archIcon, 'Arch', 2, 0),
  // Row 3 (5 tiles)
  makeTech('django', 'Django', djangoIcon, 'Django', -3, 1),
  makeTech('css', 'CSS 3', cssIcon, 'CSS', -2, 1),
  makeTech('html', 'HTML 5', htmlIcon, 'HTML', -1, 1),
  makeTech('javascript', 'Java Script', jsIcon, 'JavaScript', 0, 1),
  makeTech('typescript', 'Type Script', tsIcon, 'TypeScript', 1, 1),
  // Row 4 (4 tiles)
  makeTech('git', 'Git', githubIcon, 'Git', -3, 2),
  makeTech('kotlin', 'Kotlin', kotlinIcon, 'Kotlin', -2, 2),
  makeTech('jetpack', 'Jetpack Compose', jetpackIcon, 'Jetpack', -1, 2),
  makeTech('android', 'Android', androidIcon, 'Android', 0, 2),
]

// Default detail content (education)
const defaultDetail = {
  id: 'education',
  label: 'My Education',
  iconSrc: educationIcon,
  description: '',
}

// --- Desktop detail panel ---
function DetailPanel({ tech }: { tech: TechItem | null }) {
  const active = tech ?? defaultDetail
  const isDefault = !tech

  return (
    <div className="flex flex-col items-center gap-6 flex-1 max-w-xl px-4 lg:pt-8">
      {/* Large hex badge */}
      <div className="w-48 h-52">
        <TechBadge
          icon={<img className="relative w-full h-full object-contain" alt={active.label} src={active.iconSrc} />}
          name={active.label}
          hexSize={{ x: 100, y: 100 }}
        />
      </div>

      {isDefault ? (
        <>
          {/* Resume link */}
          <div className="flex items-center gap-2">
            <span className="font-serif text-text-1 text-xl md:text-2xl" style={{ fontFamily: "'Lora', serif" }}>
              See My Resume:
            </span>
            <a
              href="#resume"
              className="text-blue-medium-2 text-xl md:text-2xl underline hover:opacity-80 transition-opacity"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              My Resume
            </a>
          </div>

          {/* Education entries */}
          <div className="flex flex-col gap-6 w-full">
            <div>
              <h3 className="font-sans font-extrabold text-text-1 text-lg md:text-xl mb-2">
                Magdalen College
              </h3>
              <p className="font-sans text-text-1 text-base md:text-lg leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
            <div>
              <h3 className="font-sans font-extrabold text-text-1 text-lg md:text-xl mb-2">
                College of Western Idaho
              </h3>
              <p className="font-sans text-text-1 text-base md:text-lg leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent
                libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum
                imperdiet. Duis sagittis ipsum. Praesent mauris.
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-4 w-full">
          <p className="font-sans text-text-1 text-base md:text-lg leading-relaxed">
            {active.description}
          </p>
        </div>
      )}
    </div>
  )
}

// --- Mobile modal overlay ---
function MobileModal({ tech, onClose }: { tech: TechItem; onClose: () => void }) {
  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center backdrop-blur-md bg-white/70 p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="flex flex-col items-center gap-6 w-full max-w-sm pt-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Large hex badge */}
        <div className="w-56 h-60">
          <TechBadge
            icon={<img className="relative w-full h-full object-contain" alt={tech.label} src={tech.iconSrc} />}
            name={tech.label}
            hexSize={{ x: 120, y: 120 }}
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-4 w-full">
          <h3 className="font-sans font-extrabold text-text-1 text-xl">
            {tech.label}
          </h3>
          <p className="font-sans text-text-1 text-base leading-relaxed">
            {tech.description}
          </p>
        </div>

        {/* Back button */}
        <button
          onClick={onClose}
          className="self-start bg-gray-300 px-5 py-2 text-text-1 font-sans text-lg
                     hover:bg-gray-400 transition-colors mt-4"
        >
          Back
        </button>
      </div>
    </div>
  )
}

export function Technologies(): React.JSX.Element {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const selectedTech = selectedId
    ? technologies.find((t) => t.id === selectedId) ?? null
    : null

  const handleSelect = (id: string) => {
    // Toggle: clicking the same hex again deselects
    setSelectedId((prev) => (prev === id ? null : id))
  }

  const handleReturn = () => {
    setSelectedId(null)
  }

  return (
    <section id="skills" className="bg-blue-neutral flex flex-col items-center justify-center overflow-hidden px-4 py-12 md:py-20">
      {/* Section title */}
      <h2 className="font-sans font-extrabold text-text-1 text-4xl md:text-5xl lg:text-6xl mb-8">
        My Skills
      </h2>

      {/* Two-column layout */}
      <div className="flex flex-col lg:flex-row items-start justify-center gap-8 w-full max-w-7xl">
        {/* Left: Filters + Hex Grid */}
        <div className="flex flex-col items-center gap-4 flex-1">
          {/* Category filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl px-4">
            {categories.map((category, index) => (
              <div
                key={index}
                className={`flex items-center justify-center gap-1.5 px-3 py-1.5
                  ${category.active
                    ? 'bg-blue-medium-1 border-blue-medium-2'
                    : 'bg-cream-neutral border-blue-medium-1'
                  }
                  rounded-full border-2 shadow-sm hover:shadow-md transition-shadow
                  cursor-pointer`}
              >
                <span className="font-sans font-medium text-text-1 text-sm tracking-wide whitespace-nowrap">
                  {category.name}
                </span>
                {category.icon && <img className="w-5 h-4" alt="" src={category.icon} />}
              </div>
            ))}
          </div>

          {/* Hex Grid */}
          <div className="flex justify-center">
            <HexGrid
              hexes={technologies}
              size={75}
              onSelect={handleSelect}
              onReturn={handleReturn}
            />
          </div>
        </div>

        {/* Right: Detail panel (desktop only) */}
        <div className="hidden lg:flex">
          <DetailPanel tech={selectedTech} />
        </div>
      </div>

      {/* Mobile modal */}
      {isMobile && selectedTech && (
        <MobileModal tech={selectedTech} onClose={handleReturn} />
      )}
    </section>
  )
}

export default Technologies
