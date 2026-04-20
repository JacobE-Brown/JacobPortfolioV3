import React, { useState, useEffect, useMemo } from 'react'
import HexGrid from './HexGrid'
import TechBadge from './TechBadge'

// Category icons
import vector3 from '@/assets/images/TechLogos/vector-3.svg'
import vector4 from '@/assets/images/TechLogos/vector-4.svg'
import vector5 from '@/assets/images/TechLogos/vector-5.svg'

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

// --- Types ---

type CategoryName =
  | 'Front-End Development'
  | 'Back-End Development'
  | 'Cloud & DevOps'
  | 'Mobile Development'
  | 'Design & UX'
  | 'Education'
  | 'Miscellaneous'

interface CategoryDef {
  name: CategoryName
  icon: string | null
}

interface TechItem {
  id: string
  label: string
  iconSrc: string
  icon: React.ReactNode
  q: number
  r: number
  description: string
  categories: CategoryName[]
}

// --- Categories ---

const categoryDefs: CategoryDef[] = [
  { name: 'Front-End Development', icon: vector3 },
  { name: 'Back-End Development', icon: null },
  { name: 'Cloud & DevOps', icon: null },
  { name: 'Mobile Development', icon: vector4 },
  { name: 'Design & UX', icon: vector5 },
  { name: 'Education', icon: vector5 },
  { name: 'Miscellaneous', icon: null },
]

// --- Tech data ---

function makeTech(
  id: string,
  label: string,
  iconSrc: string,
  alt: string,
  q: number,
  r: number,
  cats: CategoryName[],
  description: string,
): TechItem {
  return {
    id,
    label,
    iconSrc,
    icon: <img className="relative w-full h-full object-contain" alt={alt} src={iconSrc} />,
    q,
    r,
    categories: cats,
    description,
  }
}

const technologies: TechItem[] = [
  // Row 0
  makeTech('sql', 'SQL / Databases', sqlIcon, 'SQL', -1, -2,
    ['Back-End Development'],
    'Experienced with relational databases including PostgreSQL, MySQL, and SQLite. Comfortable writing complex queries, designing schemas, and working with ORMs.'),
  makeTech('figma', 'Figma', figmaIcon, 'Figma', 0, -2,
    ['Design & UX'],
    'Proficient in Figma for UI/UX design, prototyping, and design system creation. Use it daily for wireframing and high-fidelity mockups.'),
  makeTech('education', 'My Education', educationIcon, 'Education', 1, -2,
    ['Education'],
    'Formal education in computer science with a focus on software engineering, data structures, and algorithms.'),
  makeTech('aws', 'AWS', awsIcon, 'AWS', 2, -2,
    ['Cloud & DevOps'],
    'Experience with AWS services including EC2, S3, Lambda, RDS, and CloudFront. Comfortable deploying and managing cloud infrastructure.'),

  // Row 1
  makeTech('python', 'Python', pythonIcon, 'Python', -2, -1,
    ['Back-End Development'],
    'Strong Python skills for backend development, scripting, and automation. Experience with Django, Flask, and data processing libraries.'),
  makeTech('vue', 'Vue', vueIcon, 'Vue', -1, -1,
    ['Front-End Development'],
    'Familiar with Vue.js for building reactive single-page applications. Experience with Vue Router and Vuex state management.'),
  makeTech('react', 'React', reactIcon, 'React', 0, -1,
    ['Front-End Development'],
    'Primary frontend framework. Deep experience with hooks, context, component patterns, and the React ecosystem including Next.js.'),
  makeTech('vite', 'Vite JS', vitejsIcon, 'Vite', 1, -1,
    ['Front-End Development'],
    'Preferred build tool for modern web projects. Fast HMR, ESM-native bundling, and excellent plugin ecosystem.'),
  makeTech('tailwind', 'Tailwinds CSS', tailwindIcon, 'Tailwind', 2, -1,
    ['Front-End Development'],
    'Go-to CSS framework for utility-first styling. Proficient with Tailwind v4, custom themes, and responsive design patterns.'),

  // Row 2
  makeTech('linux', 'Linux', linuxIcon, 'Linux', -3, 0,
    ['Cloud & DevOps', 'Miscellaneous'],
    'Daily driver OS. Comfortable with system administration, shell scripting, package management, and server configuration.'),
  makeTech('github', 'Github', githubIcon, 'GitHub', -2, 0,
    ['Miscellaneous'],
    'Version control with Git and GitHub for collaboration, code review, CI/CD pipelines, and project management.'),
  makeTech('csharp', 'C#', csharpIcon, 'C#', -1, 0,
    ['Back-End Development'],
    'Proficient in C# for backend development with ASP.NET Core. Experience with Entity Framework, LINQ, and .NET ecosystem.'),
  makeTech('netcore', 'ASP.NET Core', netcoreIcon, '.NET', 0, 0,
    ['Back-End Development'],
    'Backend framework for building REST APIs and web applications. Experience with middleware, dependency injection, and Entity Framework Core.'),
  makeTech('bootstrap', 'BootStrap', bootstrapIcon, 'Bootstrap', 1, 0,
    ['Front-End Development'],
    'Experienced with Bootstrap for rapid UI development. Familiar with the grid system, components, and customization via Sass variables.'),
  makeTech('arch', 'Arch Linux', archIcon, 'Arch', 2, 0,
    ['Cloud & DevOps', 'Miscellaneous'],
    'Running Arch Linux as primary development environment. Deep understanding of system configuration, AUR, and rolling release management.'),

  // Row 3
  makeTech('django', 'Django', djangoIcon, 'Django', -3, 1,
    ['Back-End Development'],
    'Full-stack Python framework experience. Built projects with Django REST Framework, template system, ORM, and admin interface.'),
  makeTech('css', 'CSS 3', cssIcon, 'CSS', -2, 1,
    ['Front-End Development'],
    'Strong CSS fundamentals including Flexbox, Grid, animations, custom properties, and modern layout techniques.'),
  makeTech('html', 'HTML 5', htmlIcon, 'HTML', -1, 1,
    ['Front-End Development'],
    'Semantic HTML5 markup with focus on accessibility, SEO best practices, and modern web standards.'),
  makeTech('javascript', 'Java Script', jsIcon, 'JavaScript', 0, 1,
    ['Front-End Development', 'Back-End Development'],
    'Core language for web development. Proficient with ES6+, async patterns, DOM manipulation, and Node.js runtime.'),
  makeTech('typescript', 'Type Script', tsIcon, 'TypeScript', 1, 1,
    ['Front-End Development', 'Back-End Development'],
    'Preferred over plain JavaScript. Strong typing, interfaces, generics, and type-safe API design across full-stack projects.'),

  // Row 4
  makeTech('git', 'Git', githubIcon, 'Git', -3, 2,
    ['Miscellaneous'],
    'Proficient with Git version control including branching strategies, rebasing, cherry-picking, and resolving complex merge conflicts.'),
  makeTech('kotlin', 'Kotlin', kotlinIcon, 'Kotlin', -2, 2,
    ['Mobile Development'],
    'Primary language for Android development. Experience with coroutines, Kotlin DSLs, and modern Kotlin idioms.'),
  makeTech('jetpack', 'Jetpack Compose', jetpackIcon, 'Jetpack', -1, 2,
    ['Mobile Development'],
    'Modern Android UI toolkit. Building declarative UIs with composables, state management, navigation, and Material Design 3.'),
  makeTech('android', 'Android', androidIcon, 'Android', 0, 2,
    ['Mobile Development'],
    'Native Android development with Kotlin and Jetpack libraries. Experience with MVVM architecture, Room, Retrofit, and Play Store deployment.'),
]

// --- Desktop detail panel ---

function DetailPanel({ tech }: { tech: TechItem | null }) {
  const isDefault = !tech

  return (
    <div className="flex flex-col items-center gap-6 flex-1 max-w-xl px-4 lg:pt-8">
      {/* Large hex badge */}
      <div className="w-48 h-52">
        <TechBadge
          icon={
            <img
              className="relative w-full h-full object-contain"
              alt={tech?.label ?? 'My Education'}
              src={tech?.iconSrc ?? educationIcon}
            />
          }
          name={tech?.label ?? 'My Education'}
          hexSize={{ x: 100, y: 100 }}
        />
      </div>

      {isDefault ? (
        <>
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
          <div className="flex flex-col gap-6 w-full">
            <div>
              <h3 className="font-sans font-extrabold text-text-1 text-lg md:text-xl mb-2">Magdalen College</h3>
              <p className="font-sans text-text-1 text-base md:text-lg leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
            <div>
              <h3 className="font-sans font-extrabold text-text-1 text-lg md:text-xl mb-2">College of Western Idaho</h3>
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
            {tech!.description}
          </p>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {tech!.categories.map((cat) => (
              <span key={cat} className="bg-blue-medium-1/20 text-text-1 text-xs font-sans px-2 py-0.5 rounded-full">
                {cat}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// --- Mobile modal ---

function MobileModal({ tech, onClose }: { tech: TechItem; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center backdrop-blur-md bg-white/70 p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div className="flex flex-col items-center gap-6 w-full max-w-sm pt-8" onClick={(e) => e.stopPropagation()}>
        <div className="w-56 h-60">
          <TechBadge
            icon={<img className="relative w-full h-full object-contain" alt={tech.label} src={tech.iconSrc} />}
            name={tech.label}
            hexSize={{ x: 120, y: 120 }}
          />
        </div>
        <div className="flex flex-col gap-4 w-full">
          <h3 className="font-sans font-extrabold text-text-1 text-xl">{tech.label}</h3>
          <p className="font-sans text-text-1 text-base leading-relaxed">{tech.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {tech.categories.map((cat) => (
              <span key={cat} className="bg-blue-medium-1/20 text-text-1 text-xs font-sans px-2 py-0.5 rounded-full">
                {cat}
              </span>
            ))}
          </div>
        </div>
        <button
          onClick={onClose}
          className="self-start bg-gray-300 px-5 py-2 text-text-1 font-sans text-lg hover:bg-gray-400 transition-colors mt-4"
        >
          Back
        </button>
      </div>
    </div>
  )
}

// --- Mobile hex layout (3-4-3-4-3-4-3 pattern) ---

const mobileGridPositions: { q: number; r: number }[] = [
  // Row r=-3 (3 hexes) — q shifted +1 to compensate axial skew
  { q: 0, r: -3 }, { q: 1, r: -3 }, { q: 2, r: -3 },
  // Row r=-2 (4 hexes) — q shifted +1
  { q: -1, r: -2 }, { q: 0, r: -2 }, { q: 1, r: -2 }, { q: 2, r: -2 },
  // Row r=-1 (3 hexes) — no shift needed (reference row)
  { q: -1, r: -1 }, { q: 0, r: -1 }, { q: 1, r: -1 },
  // Row r=0 (4 hexes) — no shift needed
  { q: -2, r: 0 }, { q: -1, r: 0 }, { q: 0, r: 0 }, { q: 1, r: 0 },
  // Row r=1 (3 hexes) — q shifted -1
  { q: -2, r: 1 }, { q: -1, r: 1 }, { q: 0, r: 1 },
  // Row r=2 (4 hexes) — q shifted -1
  { q: -3, r: 2 }, { q: -2, r: 2 }, { q: -1, r: 2 }, { q: 0, r: 2 },
  // Row r=3 (3 hexes) — q shifted -2
  { q: -3, r: 3 }, { q: -2, r: 3 }, { q: -1, r: 3 },
]

// --- Main component ---

export function Technologies(): React.JSX.Element {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [activeFilters, setActiveFilters] = useState<Set<CategoryName>>(new Set())
  const [isMobile, setIsMobile] = useState(false)
  const [isCompactGrid, setIsCompactGrid] = useState(false)

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 1024)
      setIsCompactGrid(window.innerWidth < 768)
    }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Remap hex coordinates to compact 3-4 layout on small screens
  const displayHexes = useMemo(() => {
    if (!isCompactGrid) return technologies
    return technologies.map((tech, i) => ({
      ...tech,
      q: mobileGridPositions[i].q,
      r: mobileGridPositions[i].r,
    }))
  }, [isCompactGrid])

  // Compute which hex IDs should be faded
  const fadedIds = useMemo(() => {
    if (activeFilters.size === 0) return new Set<string>()
    const faded = new Set<string>()
    for (const tech of displayHexes) {
      const matchesAny = tech.categories.some((cat) => activeFilters.has(cat))
      if (!matchesAny) faded.add(tech.id)
    }
    return faded
  }, [activeFilters, displayHexes])

  const selectedTech = selectedId ? displayHexes.find((t) => t.id === selectedId) ?? null : null

  const handleSelect = (id: string) => {
    setSelectedId((prev) => (prev === id ? null : id))
  }

  const handleReturn = () => setSelectedId(null)

  const toggleFilter = (name: CategoryName) => {
    setActiveFilters((prev) => {
      const next = new Set(prev)
      if (next.has(name)) {
        next.delete(name)
      } else {
        next.add(name)
      }
      return next
    })
    // Clear selection when filters change
    setSelectedId(null)
  }

  return (
    <section id="skills" className="bg-blue-neutral flex flex-col items-center justify-center overflow-hidden px-4 py-10 sm:py-12 md:py-20">
      <h2 className="font-heading font-medium text-text-1 text-3xl sm:text-4xl md:text-5xl lg:text-7xl mb-6 sm:mb-10 md:mb-14">
        <span className="border-b-4 border-blue-medium-1 pb-2">My Skills</span>
      </h2>

      <div className="flex flex-col lg:flex-row items-start justify-center gap-8 w-full max-w-7xl">
        {/* Left: Filters + Hex Grid */}
        <div className="flex flex-col items-center gap-4 flex-1">
          {/* Category pill filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl px-4">
            {categoryDefs.map((cat) => {
              const isActive = activeFilters.has(cat.name)
              return (
                <button
                  key={cat.name}
                  onClick={() => toggleFilter(cat.name)}
                  className={`flex items-center justify-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5
                    ${isActive
                      ? 'bg-blue-medium-1 border-blue-medium-2'
                      : 'bg-cream-neutral border-blue-medium-1'
                    }
                    rounded-full border-1.5 sm:border-2 shadow-sm hover:shadow-md transition-all
                    cursor-pointer`}
                >
                  <span className="font-sans font-medium text-text-1 text-xs sm:text-sm tracking-wide whitespace-nowrap">
                    {cat.name}
                  </span>
                  {isActive && cat.icon && <img className="w-5 h-4" alt="" src={cat.icon} />}
                </button>
              )
            })}
          </div>

          {/* Hex Grid */}
          <div className="flex justify-center">
            <HexGrid
              hexes={displayHexes}
              size={75}
              fadedIds={fadedIds}
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
