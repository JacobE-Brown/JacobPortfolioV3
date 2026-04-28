import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TechBadge from './TechBadge'

import reactIcon from '@/assets/images/tech/react.svg'
import pythonIcon from '@/assets/images/tech/python.svg'
import azureCloudIcon from '@/assets/images/tech/Azure/Azure-A.svg'
import prometheusIcon from '@/assets/images/tech/Prometheus.svg'
import figmaIcon from '@/assets/images/tech/figma.svg'

const workItems = [
  {
    icon: azureCloudIcon,
    label: 'Cloud & DevOps',
    category: 'Cloud & DevOps',
    description: 'Deploying and managing infrastructure with CI/CD pipelines and cloud services.',
  },
  {
    icon: prometheusIcon,
    label: 'Observability',
    category: 'Monitoring & Observability',
    description: 'Monitoring clusters and applications with metrics, dashboards, and alerting.',
  },
  {
    icon: pythonIcon,
    label: 'Backend',
    category: 'Back-End Development',
    description: 'Designing scalable APIs, services, and data pipelines that power applications.',
  },
  {
    icon: reactIcon,
    label: 'Frontend',
    category: 'Front-End Development',
    description: 'Building responsive, interactive UIs with modern frameworks and design systems.',
  },
  {
    icon: figmaIcon,
    label: 'Misc',
    category: 'Miscellaneous',
    description: 'Design, AI tooling, version control, and everything else that ties it all together.',
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

  const handleClick = (category: string) => {
    const target = document.getElementById('skill-filters') || document.getElementById('skills')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
    // Dispatch after a short delay so the scroll lands first
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('activate-skill-filter', { detail: category }))
    }, 400)
  }

  return (
    <section className="bg-blue-neutral flex flex-col items-center gap-6 sm:gap-8 px-6 sm:px-8 md:px-16 py-10">
      <h2 className="font-heading font-medium text-text-1 text-3xl sm:text-4xl md:text-5xl lg:text-7xl mb-8 sm:mb-10 md:mb-14">
        <span className="border-b-4 border-blue-medium-1 pb-2">What I Do</span>
      </h2>
      <span className="sr-only">
        Jacob Brown's professional capabilities span Cloud and DevOps engineering including Azure AKS, AWS EC2 S3 Lambda, Docker containerization, Kubernetes orchestration, Helm chart management, and CI/CD pipeline automation with Azure DevOps and GitHub Actions. Monitoring and observability expertise with Prometheus, Grafana, Loki, Alloy, Retina, and eBPF-based networking with Cilium. Backend development proficiency in C#, .NET Core, Python, Django, Flask, SQL databases including PostgreSQL MySQL Redis and Cosmos DB. Frontend development skills with React, TypeScript, JavaScript, Tailwind CSS, Angular, Vue, and Figma design. Linux systems administration across Arch Linux, Ubuntu, and Debian distributions.
      </span>

      <div
        ref={gridRef}
        className="flex flex-wrap justify-center gap-6 sm:gap-10 md:gap-15 w-full max-w-6xl"
      >
        {workItems.map((item, i) => (
          <div
            key={item.label}
            ref={el => { itemRefs.current[i] = el }}
            className="flex flex-col items-center gap-2 w-[calc(50%-0.75rem)] sm:w-[calc(50%-1.25rem)] lg:w-[calc(33.333%-2.5rem)] max-w-72 cursor-pointer"
            onMouseEnter={() => handleHover(i, true)}
            onMouseLeave={() => handleHover(i, false)}
            onClick={() => handleClick(item.category)}
          >
            <TechBadge
              icon={<img src={item.icon} alt={item.label} className="w-full h-full" loading="lazy" />}
              name={item.label}
              hexSize={{ x: 75, y: 75 }}
            />
            <p className="font-sans text-xs sm:text-sm md:text-base lg:text-lg text-text-1 text-center leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
