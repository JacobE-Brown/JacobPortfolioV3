import TechBadge from './TechBadge'

import reactIcon from '@/assets/images/TechLogos/react.svg'
import pythonIcon from '@/assets/images/TechLogos/python.svg'
import awsIcon from '@/assets/images/TechLogos/aws.svg'
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

export default function WhatIDo() {
  return (
    <section className="bg-blue-neutral flex flex-col items-center gap-8 px-8 md:px-16 py-10">
      <h2 className="font-heading font-medium text-text-1 text-4xl md:text-5xl lg:text-[4rem]">
        What I do
      </h2>

      <div className="flex flex-wrap items-start justify-center gap-10 md:gap-15 w-full max-w-6xl">
        {workItems.map((item) => (
          <div
            key={item.label}
            className="flex flex-col items-center gap-2 w-40 md:w-52 lg:w-60"
          >
            <TechBadge
              icon={<img src={item.icon} alt={item.label} className="w-full h-full" />}
              name={item.label}
              hexSize={{ x: 55, y: 55 }}
            />
            <p className="font-sans text-xs md:text-sm text-text-1 text-center leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
