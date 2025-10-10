import React from 'react'
import ReactHexGrid from './ReactHexGrid'

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

const technologies = [
  // Row 1: 2 items (top row)
  { name: 'My Education', icon: <img className="relative w-[33.65px] h-[33.65px]" alt="Education" src={educationIcon} />, q: -1, r: -3, s: 4 },
  { name: 'Type Script', icon: <img className="relative w-[33.65px] h-[33.65px]" alt="TypeScript" src={tsIcon} />, q: 0, r: -3, s: 3 },
  
  // Row 2: 3 items (offset row)
  { name: 'Figma', icon: <img className="relative w-[33.65px] h-[33.65px]" alt="Figma" src={figmaIcon} />, q: -2, r: -2, s: 4 },
  { name: 'C#', icon: <img className="relative w-[33.65px] h-[33.65px]" alt="C#" src={csharpIcon} />, q: -1, r: -2, s: 3 },
  { name: 'AWS', icon: <img className="relative w-[33.65px] h-[33.65px]" alt="AWS" src={awsIcon} />, q: 0, r: -2, s: 2 },
  
  // Row 3: 4 items (aligned row)
  { name: 'React', icon: <img className="relative w-[33.65px] h-[33.65px]" alt="React" src={reactIcon} />, q: -3, r: -1, s: 4 },
  { name: 'Vite JS', icon: <img className="relative w-[33.65px] h-[33.65px]" alt="Vite" src={vitejsIcon} />, q: -2, r: -1, s: 3 },
  { name: 'Tailwinds CSS', icon: <img className="relative w-[33.65px] h-[33.65px]" alt="Tailwind" src={tailwindIcon} />, q: -1, r: -1, s: 2 },
  { name: 'CSS 3', icon: <img className="relative w-[33.65px] h-[33.65px]" alt="CSS" src={cssIcon} />, q: 0, r: -1, s: 1 },
  
  // Row 4: 5 items (offset row)
  { name: 'HTML 5', icon: <img className="relative w-[33.65px] h-[33.65px]" alt="HTML" src={htmlIcon} />, q: -3, r: 0, s: 3 },
  { name: 'ASP.NET Core', icon: <img className="relative w-[33.65px] h-[33.65px]" alt=".NET" src={netcoreIcon} />, q: -2, r: 0, s: 2 },
  { name: 'BootStrap', icon: <img className="relative w-[33.65px] h-[33.65px]" alt="Bootstrap" src={bootstrapIcon} />, q: -1, r: 0, s: 1 },
  { name: 'Python', icon: <img className="relative w-[33.65px] h-[33.65px]" alt="Python" src={pythonIcon} />, q: 0, r: 0, s: 0 },
  { name: 'Kotlin', icon: <img className="relative w-[33.65px] h-[33.65px]" alt="Kotlin" src={kotlinIcon} />, q: 1, r: -1, s: 0 },
  
  // Row 5: 4 items (aligned row)
  { name: 'Arch Linux', icon: <img className="relative w-[33.65px] h-[33.65px]" alt="Arch" src={archIcon} />, q: -3, r: 1, s: 2 },
  { name: 'Java Script', icon: <img className="relative w-[33.65px] h-[33.65px]" alt="JavaScript" src={jsIcon} />, q: -2, r: 1, s: 1 },
  { name: 'Linux', icon: <img className="relative w-[33.65px] h-[33.65px]" alt="Linux" src={linuxIcon} />, q: -1, r: 1, s: 0 },
  { name: 'SQL / Databases', icon: <img className="relative w-[33.65px] h-[33.65px]" alt="SQL" src={sqlIcon} />, q: 0, r: 1, s: -1 },
  
  // Row 6: 3 items (offset row)
  { name: 'Jetpack Compose', icon: <img className="relative w-[33.65px] h-[33.65px]" alt="Jetpack" src={jetpackIcon} />, q: -2, r: 2, s: 0 },
  { name: 'Android', icon: <img className="relative w-[33.65px] h-[33.65px]" alt="Android" src={androidIcon} />, q: -1, r: 2, s: -1 },
  { name: 'Django', icon: <img className="relative w-[33.65px] h-[33.65px]" alt="Django" src={djangoIcon} />, q: 0, r: 2, s: -2 },
  
  // Row 7: 1 item (bottom row)
  { name: 'Git and Github', icon: <img className="relative w-[33.65px] h-[33.65px]" alt="GitHub" src={githubIcon} />, q: -1, r: 3, s: -2 },
]

export function Technologies(): React.JSX.Element {
  return (
    <div className="flex flex-col items-center gap-4 p-6 pb-16 min-h-fit">
      {/* Category filters */}
      <div className="w-1/2">
        <div className="flex flex-wrap items-center justify-start gap-3">
          {categories.map((category, index) => (
            <div key={index} className={`category-filter flex items-center justify-center gap-2 px-4 py-2 ${category.active ? 'bg-blue-medium-1 border-blue-medium-2' : 'bg-cream-neutral border-blue-medium-1'} rounded-full border-2 shadow-sm hover:shadow-md transition-shadow`}>
              <span className="font-medium text-text-1 text-sm whitespace-nowrap">
                {category.name}
              </span>
              {category.icon && <img className="w-4 h-3" alt="Vector" src={category.icon} />}
            </div>
          ))}
        </div>
      </div>

      {/* React HexGrid */}
      <ReactHexGrid technologies={technologies} />
    </div>
  )
}

export default Technologies