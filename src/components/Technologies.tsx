import React from 'react'
import TechBadge from './TechBadge'
import Js from './icons/Js'
import ReactIcon from './icons/React'
import Python from './icons/Python'
import Figma from './icons/Figma'

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
  { name: 'Figma', icon: <img className="relative w-[33.65px] h-[33.65px]" alt="Figma" src={figmaIcon} />, position: 'top-[114px] left-[43px]' },
  { name: 'My Education', icon: <img className="relative w-[33.65px] h-[33.65px]" alt="Education" src={educationIcon} />, position: 'top-[114px] left-[130px]' },
  { name: 'AWS', icon: <img className="relative w-[33.65px] h-[33.65px]" alt="AWS" src={awsIcon} />, position: 'top-[114px] left-[219px]' },
  { name: 'React', icon: <img className="relative w-[33.65px] h-[33.65px]" alt="React" src={reactIcon} />, position: 'top-[202px] left-0' },
  { name: 'React', icon: <img className="relative w-[33.65px] h-[33.65px]" alt="React" src={reactIcon} />, position: 'top-[201px] left-[87px]' },
  { name: 'Vite JS', icon: <img className="relative w-[33.65px] h-[33.65px]" alt="Vite" src={vitejsIcon} />, position: 'top-[201px] left-[179px]' },
  { name: 'Tailwinds CSS', icon: <img className="relative w-[33.65px] h-[33.65px]" alt="Tailwind" src={tailwindIcon} />, position: 'top-[201px] left-[265px]' },
  { name: 'C#', icon: <img className="relative w-[33.65px] h-[33.65px]" alt="C#" src={csharpIcon} />, position: 'top-[289px] left-11' },
  { name: 'ASP.NET Core', icon: <img className="relative w-[33.65px] h-[33.65px]" alt=".NET" src={netcoreIcon} />, position: 'top-[289px] left-[131px]' },
  { name: 'BootStrap', icon: <img className="relative w-[33.65px] h-[33.65px]" alt="Bootstrap" src={bootstrapIcon} />, position: 'top-[289px] left-[217px]' },
  { name: 'CSS 3', icon: <img className="relative w-[33.65px] h-[33.65px]" alt="CSS" src={cssIcon} />, position: 'top-[375px] left-[3px]' },
  { name: 'HTML 5', icon: <img className="relative w-[33.65px] h-[33.65px]" alt="HTML" src={htmlIcon} />, position: 'top-[375px] left-[89px]' },
  { name: 'Java Script', icon: <img className="relative w-[33.65px] h-[33.65px]" alt="JavaScript" src={jsIcon} />, position: 'top-[375px] left-44' },
  { name: 'Type Script', icon: <img className="relative w-[33.65px] h-[33.65px]" alt="TypeScript" src={tsIcon} />, position: 'top-[375px] left-[262px]' },
  { name: 'Kotlin', icon: <img className="relative w-[33.65px] h-[33.65px]" alt="Kotlin" src={kotlinIcon} />, position: 'top-[462px] left-[47px]' },
  { name: 'Jetpack Compose', icon: <img className="relative w-[33.65px] h-[33.65px]" alt="Jetpack" src={jetpackIcon} />, position: 'top-[462px] left-[134px]' },
  { name: 'Android', icon: <img className="relative w-[33.65px] h-[33.65px]" alt="Android" src={androidIcon} />, position: 'top-[462px] left-[221px]' },
  { name: 'Linux', icon: <img className="relative w-[33.65px] h-[33.65px]" alt="Linux" src={linuxIcon} />, position: 'top-[549px] left-1' },
  { name: 'Arch Linux', icon: <img className="relative w-[33.65px] h-[33.65px]" alt="Arch" src={archIcon} />, position: 'top-[549px] left-[91px]' },
  { name: 'Python', icon: <img className="relative w-[33.65px] h-[33.65px]" alt="Python" src={pythonIcon} />, position: 'top-[549px] left-[178px]' },
  { name: 'Django', icon: <img className="relative w-[33.65px] h-[33.65px]" alt="Django" src={djangoIcon} />, position: 'top-[549px] left-[265px]' },
  { name: 'Git and Github', icon: <img className="relative w-[33.65px] h-[33.65px]" alt="GitHub" src={githubIcon} />, position: 'top-[636px] left-[47px]' },
  { name: 'SQL / Databases', icon: <img className="relative w-[33.65px] h-[33.65px]" alt="SQL" src={sqlIcon} />, position: 'top-[636px] left-[133px]' },
  { name: 'Linux', icon: <img className="relative w-[33.65px] h-[33.65px]" alt="Linux" src={linuxIcon} />, position: 'top-[636px] left-[219px]' },
]

export function Technologies(): React.JSX.Element {
  return (
    <div className="relative w-[351px] h-[723px]">
      {technologies.map((tech, index) => (
        <TechBadge
          key={index}
          icon={tech.icon}
          name={tech.name}
          className={`${tech.position} absolute`}
        />
      ))}

      <div className="flex flex-wrap w-[344px] items-center gap-[7px_5px] absolute top-0 left-[calc(50%_-_176px)]">
        {categories.map((category, index) => (
          <div key={index} className={`inline-flex items-center justify-center gap-[4.49px] px-[5.62px] py-[4.49px] relative flex-[0_0_auto] ${category.active ? 'bg-blue-medium-1 border-blue-medium-2' : 'bg-cream-neutral border-blue-medium-1'} rounded-[31.64px] overflow-hidden border-[1.31px] border-solid shadow-[0px_1.7px_1.7px_#00000040]`}>
            <div className={`relative flex items-center justify-center w-fit ${category.active ? 'mt-[-1.17px]' : 'mt-[-1.31px]'} font-medium text-text-1 text-[11.2px] tracking-[0.45px] leading-[normal] whitespace-nowrap`}>
              {category.name}
            </div>
            {category.icon && <img className="relative w-[17.76px] h-[13.28px]" alt="Vector" src={category.icon} />}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Technologies