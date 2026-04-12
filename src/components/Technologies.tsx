import React from 'react'
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

const technologies = [
  // Diamond layout — Row 0 (top, 4 tiles)
  { id: 'sql', label: 'SQL / Databases', icon: <img className="relative w-full h-full object-contain" alt="SQL" src={sqlIcon} />, q: -1, r: -2 },
  { id: 'figma', label: 'Figma', icon: <img className="relative w-full h-full object-contain" alt="Figma" src={figmaIcon} />, q: 0, r: -2 },
  { id: 'education', label: 'My Education', icon: <img className="relative w-full h-full object-contain" alt="Education" src={educationIcon} />, q: 1, r: -2 },
  { id: 'aws', label: 'AWS', icon: <img className="relative w-full h-full object-contain" alt="AWS" src={awsIcon} />, q: 2, r: -2 },

  // Row 1 (5 tiles)
  { id: 'python', label: 'Python', icon: <img className="relative w-full h-full object-contain" alt="Python" src={pythonIcon} />, q: -2, r: -1 },
  { id: 'vue', label: 'Vue', icon: <img className="relative w-full h-full object-contain" alt="Vue" src={vueIcon} />, q: -1, r: -1 },
  { id: 'react', label: 'React', icon: <img className="relative w-full h-full object-contain" alt="React" src={reactIcon} />, q: 0, r: -1 },
  { id: 'vite', label: 'Vite JS', icon: <img className="relative w-full h-full object-contain" alt="Vite" src={vitejsIcon} />, q: 1, r: -1 },
  { id: 'tailwind', label: 'Tailwinds CSS', icon: <img className="relative w-full h-full object-contain" alt="Tailwind" src={tailwindIcon} />, q: 2, r: -1 },

  // Row 2 (center, 6 tiles — widest)
  { id: 'linux', label: 'Linux', icon: <img className="relative w-full h-full object-contain" alt="Linux" src={linuxIcon} />, q: -3, r: 0 },
  { id: 'github', label: 'Github', icon: <img className="relative w-full h-full object-contain" alt="GitHub" src={githubIcon} />, q: -2, r: 0 },
  { id: 'csharp', label: 'C#', icon: <img className="relative w-full h-full object-contain" alt="C#" src={csharpIcon} />, q: -1, r: 0 },
  { id: 'netcore', label: 'ASP.NET Core', icon: <img className="relative w-full h-full object-contain" alt=".NET" src={netcoreIcon} />, q: 0, r: 0 },
  { id: 'bootstrap', label: 'BootStrap', icon: <img className="relative w-full h-full object-contain" alt="Bootstrap" src={bootstrapIcon} />, q: 1, r: 0 },
  { id: 'arch', label: 'Arch Linux', icon: <img className="relative w-full h-full object-contain" alt="Arch" src={archIcon} />, q: 2, r: 0 },

  // Row 3 (5 tiles)
  { id: 'django', label: 'Django', icon: <img className="relative w-full h-full object-contain" alt="Django" src={djangoIcon} />, q: -3, r: 1 },
  { id: 'css', label: 'CSS 3', icon: <img className="relative w-full h-full object-contain" alt="CSS" src={cssIcon} />, q: -2, r: 1 },
  { id: 'html', label: 'HTML 5', icon: <img className="relative w-full h-full object-contain" alt="HTML" src={htmlIcon} />, q: -1, r: 1 },
  { id: 'javascript', label: 'Java Script', icon: <img className="relative w-full h-full object-contain" alt="JavaScript" src={jsIcon} />, q: 0, r: 1 },
  { id: 'typescript', label: 'Type Script', icon: <img className="relative w-full h-full object-contain" alt="TypeScript" src={tsIcon} />, q: 1, r: 1 },

  // Row 4 (bottom, 4 tiles)
  { id: 'git', label: 'Git', icon: <img className="relative w-full h-full object-contain" alt="Git" src={githubIcon} />, q: -3, r: 2 },
  { id: 'kotlin', label: 'Kotlin', icon: <img className="relative w-full h-full object-contain" alt="Kotlin" src={kotlinIcon} />, q: -2, r: 2 },
  { id: 'jetpack', label: 'Jetpack Compose', icon: <img className="relative w-full h-full object-contain" alt="Jetpack" src={jetpackIcon} />, q: -1, r: 2 },
  { id: 'android', label: 'Android', icon: <img className="relative w-full h-full object-contain" alt="Android" src={androidIcon} />, q: 0, r: 2 },
]

export function Technologies(): React.JSX.Element {
  return (
    <section className="bg-blue-neutral flex flex-col items-center justify-center overflow-hidden px-4 py-12 md:py-20">
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
              onSelect={(id) => console.log('Selected:', id)}
              onReturn={() => console.log('Returned to grid')}
            />
          </div>
        </div>

        {/* Right: Education description */}
        <div className="flex flex-col items-center gap-6 flex-1 max-w-xl px-4 lg:pt-8">
          {/* Large education hex badge */}
          <div className="w-48 h-52">
            <TechBadge
              icon={<img className="relative w-full h-full object-contain" alt="Education" src={educationIcon} />}
              name="My Education"
              hexSize={{ x: 100, y: 100 }}
            />
          </div>

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
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
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
        </div>
      </div>
    </section>
  )
}

export default Technologies
