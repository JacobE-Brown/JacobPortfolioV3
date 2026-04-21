import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TechBadge from './TechBadge'

import reactIcon from '@/assets/images/TechLogos/react.svg'
import pythonIcon from '@/assets/images/TechLogos/python.svg'
import awsIcon from '@/assets/images/TechLogos/AWS/aws.svg'
import figmaIcon from '@/assets/images/TechLogos/figma.svg'
import sqlIcon from '@/assets/images/TechLogos/sql.svg'

const workItems = [
  {
    icon: reactIcon,
    label: 'Frontend Dev',
    description: 'Building responsive, interactive UIs with modern frameworks and design systems.',
  },
  {
    icon: pythonIcon,
    label: 'Backend Dev',
    description: 'Designing scalable APIs, services, and data pipelines that power applications.',
  },
  {
    icon: awsIcon,
    label: 'Cloud & DevOps',
    description: 'Deploying and managing infrastructure with CI/CD pipelines and cloud services.',
  },
  {
    icon: figmaIcon,
    label: 'UI/UX Design',
    description: 'Translating Figma designs into pixel-perfect, accessible user experiences.',
  },
  {
    icon: sqlIcon,
    label: 'Databases',
    description: 'Modeling, querying, and optimizing relational and NoSQL data stores.',
  },
]

gsap.registerPlugin(ScrollTrigger)

export default function WhatIDo() {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const els = itemRefs.current.filter(Boolean) as HTMLDivElement[]
    if (!els.length) return

    gsap.set(els, { opacity: 0, y: 40 })

    const ctx = gsap.context(() => {
      gsap.to(els, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
          once: true,
        },
      })
    })

    return () => ctx.revert()
  }, [])

  const handleHover = (index: number, entering: boolean) => {
    const els = itemRefs.current.filter(Boolean) as HTMLDivElement[]
    gsap.to(els[index], { scale: entering ? 1.08 : 1, duration: 0.25, ease: 'power2.out' })
  }

  return (
    <section className="bg-blue-neutral flex flex-col items-center gap-6 sm:gap-8 px-6 sm:px-8 md:px-16 py-10">
      <h2 className="font-heading font-medium text-text-1 text-3xl sm:text-4xl md:text-5xl lg:text-7xl mb-8 sm:mb-10 md:mb-14">
        <span className="border-b-4 border-blue-medium-1 pb-2">What I Do</span>
      </h2>

      <div
        ref={gridRef}
        className="grid grid-cols-2 lg:grid-cols-5 items-start justify-items-center gap-6 sm:gap-10 md:gap-15 w-full max-w-6xl"
      >
        {workItems.map((item, i) => (
          <div
            key={item.label}
            ref={el => { itemRefs.current[i] = el }}
            className={`flex flex-col items-center gap-2 w-full max-w-44 sm:max-w-52 md:max-w-64 lg:max-w-72 cursor-pointer
                        ${i === workItems.length - 1 && workItems.length % 2 !== 0 ? 'col-span-2 lg:col-span-1' : ''}`}
            onMouseEnter={() => handleHover(i, true)}
            onMouseLeave={() => handleHover(i, false)}
          >
            <TechBadge
              icon={<img src={item.icon} alt={item.label} className="w-full h-full" />}
              name={item.label}
              hexSize={{ x: 75, y: 75 }}
            />
            <p className="font-sans text-xs md:text-xl lg:text-xl text-text-1 text-center leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
