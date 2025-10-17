import React from 'react'
import HexGrid from './HexGrid'

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
  // Row 1: 3 items (top row) - Figma, My Education, AWS
  { id: 'figma', label: 'Figma', icon: <img className="relative w-full h-full object-contain" alt="Figma" src={figmaIcon} />, q: -1, r: -2 },
  { id: 'education', label: 'My Education', icon: <img className="relative w-full h-full object-contain" alt="Education" src={educationIcon} />, q: 0, r: -2 },
  { id: 'aws', label: 'AWS', icon: <img className="relative w-full h-full object-contain" alt="AWS" src={awsIcon} />, q: 1, r: -2 },
  
  // Row 2: 4 items (offset row) - Vue, React, Vite JS, Tailwinds CSS
  { id: 'vue', label: 'Vue', icon: <img className="relative w-full h-full object-contain" alt="Vue" src={reactIcon} />, q: -2, r: -1 },
  { id: 'react', label: 'React', icon: <img className="relative w-full h-full object-contain" alt="React" src={reactIcon} />, q: -1, r: -1 },
  { id: 'vite', label: 'Vite JS', icon: <img className="relative w-full h-full object-contain" alt="Vite" src={vitejsIcon} />, q: 0, r: -1 },
  { id: 'tailwind', label: 'Tailwinds CSS', icon: <img className="relative w-full h-full object-contain" alt="Tailwind" src={tailwindIcon} />, q: 1, r: -1 },
  
  // Row 3: 5 items (aligned row) - C#, ASP.NET Core, BootStrap, CSS 3, HTML 5
  { id: 'csharp', label: 'C#', icon: <img className="relative w-full h-full object-contain" alt="C#" src={csharpIcon} />, q: -2, r: 0 },
  { id: 'netcore', label: 'ASP.NET Core', icon: <img className="relative w-full h-full object-contain" alt=".NET" src={netcoreIcon} />, q: -1, r: 0 },
  { id: 'bootstrap', label: 'BootStrap', icon: <img className="relative w-full h-full object-contain" alt="Bootstrap" src={bootstrapIcon} />, q: 0, r: 0 },
  { id: 'css', label: 'CSS 3', icon: <img className="relative w-full h-full object-contain" alt="CSS" src={cssIcon} />, q: 1, r: 0 },
  { id: 'html', label: 'HTML 5', icon: <img className="relative w-full h-full object-contain" alt="HTML" src={htmlIcon} />, q: 2, r: 0 },
  
  // Row 4: 4 items (offset row) - Java Script, Type Script, Kotlin, Jetpack Compose
  { id: 'javascript', label: 'Java Script', icon: <img className="relative w-full h-full object-contain" alt="JavaScript" src={jsIcon} />, q: -1, r: 1 },
  { id: 'typescript', label: 'Type Script', icon: <img className="relative w-full h-full object-contain" alt="TypeScript" src={tsIcon} />, q: 0, r: 1 },
  { id: 'kotlin', label: 'Kotlin', icon: <img className="relative w-full h-full object-contain" alt="Kotlin" src={kotlinIcon} />, q: 1, r: 1 },
  { id: 'jetpack', label: 'Jetpack Compose', icon: <img className="relative w-full h-full object-contain" alt="Jetpack" src={jetpackIcon} />, q: 2, r: 1 },
  
  // Row 5: 5 items (aligned row) - Python, Android, Linux, Arch Linux, SQL / Databases
  { id: 'python', label: 'Python', icon: <img className="relative w-full h-full object-contain" alt="Python" src={pythonIcon} />, q: -2, r: 2 },
  { id: 'android', label: 'Android', icon: <img className="relative w-full h-full object-contain" alt="Android" src={androidIcon} />, q: -1, r: 2 },
  { id: 'linux', label: 'Linux', icon: <img className="relative w-full h-full object-contain" alt="Linux" src={linuxIcon} />, q: 0, r: 2 },
  { id: 'arch', label: 'Arch Linux', icon: <img className="relative w-full h-full object-contain" alt="Arch" src={archIcon} />, q: 1, r: 2 },
  { id: 'sql', label: 'SQL / Databases', icon: <img className="relative w-full h-full object-contain" alt="SQL" src={sqlIcon} />, q: 2, r: 2 },
  
  // Row 6: 2 items (offset row) - Django, Git and Github
  { id: 'django', label: 'Django', icon: <img className="relative w-full h-full object-contain" alt="Django" src={djangoIcon} />, q: -1, r: 3 },
  { id: 'github', label: 'Git and Github', icon: <img className="relative w-full h-full object-contain" alt="GitHub" src={githubIcon} />, q: 0, r: 3 },
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

      {/* Custom HexGrid */}
      <div className="w-full max-w-6xl mx-auto">
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] md:aspect-[16/9] lg:aspect-[21/9] border-2 border-blue-medium-2 rounded-lg overflow-hidden">
          <HexGrid 
            hexes={technologies} 
            size={45}
            onSelect={(id) => {
              console.log('Selected technology:', id);
              // You can add more sophisticated selection logic here
            }}
            onReturn={() => {
              console.log('Returned to grid view');
              // You can add more sophisticated return logic here
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Technologies