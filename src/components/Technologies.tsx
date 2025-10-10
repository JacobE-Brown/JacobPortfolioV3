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
  // Row 1: 1 item (top center)
  { name: 'C#', icon: <img className="relative w-[33.65px] h-[33.65px]" alt="C#" src={csharpIcon} />, q: 0, r: 0, s: 0 },
  
  // Row 2: 3 items (offset row)
  { name: 'Vite JS', icon: <img className="relative w-[33.65px] h-[33.65px]" alt="Vite" src={vitejsIcon} />, q: -1, r: 1, s: 0 },
  { name: 'Tailwinds CSS', icon: <img className="relative w-[33.65px] h-[33.65px]" alt="Tailwind" src={tailwindIcon} />, q: 0, r: 1, s: -1 },
  { name: 'AWS', icon: <img className="relative w-[33.65px] h-[33.65px]" alt="AWS" src={awsIcon} />, q: 1, r: 0, s: -1 },
  
  // Row 3: 4 items (aligned row)
  { name: 'React', icon: <img className="relative w-[33.65px] h-[33.65px]" alt="React" src={reactIcon} />, q: -2, r: 1, s: 1 },
  { name: 'Figma', icon: <img className="relative w-[33.65px] h-[33.65px]" alt="Figma" src={figmaIcon} />, q: -1, r: 0, s: 1 },
  { name: 'My Education', icon: <img className="relative w-[33.65px] h-[33.65px]" alt="Education" src={educationIcon} />, q: 0, r: -1, s: 1 },
  { name: 'Type Script', icon: <img className="relative w-[33.65px] h-[33.65px]" alt="TypeScript" src={tsIcon} />, q: 1, r: -1, s: 0 },
  
  // Row 4: 3 items (offset row)
  { name: 'ASP.NET Core', icon: <img className="relative w-[33.65px] h-[33.65px]" alt=".NET" src={netcoreIcon} />, q: -1, r: 2, s: -1 },
  { name: 'BootStrap', icon: <img className="relative w-[33.65px] h-[33.65px]" alt="Bootstrap" src={bootstrapIcon} />, q: 0, r: 2, s: -2 },
  { name: 'CSS 3', icon: <img className="relative w-[33.65px] h-[33.65px]" alt="CSS" src={cssIcon} />, q: 1, r: 1, s: -2 },
  
  // Row 5: 4 items (aligned row)
  { name: 'HTML 5', icon: <img className="relative w-[33.65px] h-[33.65px]" alt="HTML" src={htmlIcon} />, q: -2, r: 2, s: 0 },
  { name: 'Java Script', icon: <img className="relative w-[33.65px] h-[33.65px]" alt="JavaScript" src={jsIcon} />, q: -1, r: 3, s: -2 },
  { name: 'Kotlin', icon: <img className="relative w-[33.65px] h-[33.65px]" alt="Kotlin" src={kotlinIcon} />, q: 0, r: 3, s: -3 },
  { name: 'Python', icon: <img className="relative w-[33.65px] h-[33.65px]" alt="Python" src={pythonIcon} />, q: 1, r: 2, s: -3 },
  
  // Row 6: 3 items (offset row)
  { name: 'Jetpack Compose', icon: <img className="relative w-[33.65px] h-[33.65px]" alt="Jetpack" src={jetpackIcon} />, q: -1, r: 4, s: -3 },
  { name: 'Android', icon: <img className="relative w-[33.65px] h-[33.65px]" alt="Android" src={androidIcon} />, q: 0, r: 4, s: -4 },
  { name: 'Linux', icon: <img className="relative w-[33.65px] h-[33.65px]" alt="Linux" src={linuxIcon} />, q: 1, r: 3, s: -4 },
  
  // Row 7: 4 items (aligned row)
  { name: 'Arch Linux', icon: <img className="relative w-[33.65px] h-[33.65px]" alt="Arch" src={archIcon} />, q: -2, r: 3, s: -1 },
  { name: 'Django', icon: <img className="relative w-[33.65px] h-[33.65px]" alt="Django" src={djangoIcon} />, q: -1, r: 5, s: -4 },
  { name: 'Git and Github', icon: <img className="relative w-[33.65px] h-[33.65px]" alt="GitHub" src={githubIcon} />, q: 0, r: 5, s: -5 },
  { name: 'SQL / Databases', icon: <img className="relative w-[33.65px] h-[33.65px]" alt="SQL" src={sqlIcon} />, q: 1, r: 4, s: -5 },
]

export function Technologies(): React.JSX.Element {
  return (
    <div className="flex flex-col items-center gap-4 p-6 pb-16 min-h-fit">
      {/* Category filters */}
      <div className="flex flex-wrap items-center gap-[7px_5px] justify-center">
        {categories.map((category, index) => (
          <div key={index} className={`category-filter inline-flex items-center justify-center gap-[4.49px] px-[5.62px] py-[4.49px] relative flex-[0_0_auto] ${category.active ? 'bg-blue-medium-1 border-blue-medium-2' : 'bg-cream-neutral border-blue-medium-1'} rounded-[31.64px] overflow-hidden border-[1.31px] border-solid shadow-[0px_1.7px_1.7px_#00000040]`}>
            <div className={`relative flex items-center justify-center w-fit ${category.active ? 'mt-[-1.17px]' : 'mt-[-1.31px]'} font-medium text-text-1 text-[11.2px] tracking-[0.45px] leading-[normal] whitespace-nowrap`}>
              {category.name}
            </div>
            {category.icon && <img className="relative w-[17.76px] h-[13.28px]" alt="Vector" src={category.icon} />}
          </div>
        ))}
      </div>

      {/* React HexGrid */}
      <ReactHexGrid technologies={technologies} />
    </div>
  )
}

export default Technologies