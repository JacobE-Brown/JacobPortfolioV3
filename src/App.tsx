import './index.css'
import ParticleBackground from './components/ParticleBackground'
import HeroSection from './components/HeroSection'
import NavBar from './components/NavBar'
import AboutMe from './components/AboutMe'
import WhatIDo from './components/WhatIDo'
import Technologies from './components/Technologies'
import ProjectCard from './components/ProjectCard'
import netacentLogo from './assets/images/Projects/netacent/Netacent-Primary-Logo.webp'
import kubernetesIcon from './assets/images/TechLogos/kubernetes.svg'
import azureAIcon from './assets/images/TechLogos/Azure-A.svg'
import azureDevOpsIcon from './assets/images/TechLogos/Azure-DevOps.svg'
import dockerIcon from './assets/images/TechLogos/docker.svg'
import helmIcon from './assets/images/TechLogos/Helm.svg'
import prometheusIcon from './assets/images/TechLogos/Prometheus.svg'
import grafanaIcon from './assets/images/TechLogos/Grafana.svg'
import netCoreIcon from './assets/images/TechLogos/net-core-logo-1.svg'
import reactIcon from './assets/images/TechLogos/react.svg'
import tailwindIcon from './assets/images/TechLogos/tailwinds.svg'
import viteIcon from './assets/images/TechLogos/vitejs.svg'
import s3Icon from './assets/images/TechLogos/Simple Storage Service.svg'
import typescriptIcon from './assets/images/TechLogos/typescript.svg'
import samsBeesHomepage from "./assets/images/Projects/Sam's Bees/SamsBeesHomepage.png"
import githubIcon from './assets/images/TechLogos/github-1-1.svg'
import portfolioHero from "./assets/images/Projects/Recursive Portfolio/Portfolio pic.png"
import figmaIcon from './assets/images/TechLogos/figma.svg'
import amplifyIcon from './assets/images/TechLogos/Amplify.svg'
import ContactMe from './components/ContactMe'

const projects = [
  {
    title: 'DevOps Engineer',
    projectName: 'Netacent',
    primaryImage: netacentLogo,
    secondaryImages: [azureAIcon, kubernetesIcon],
    secondaryImagePaddings: ['p-5', 'p-2'],
    technologies: [
      { icon: azureDevOpsIcon, label: 'Azure DevOps' },
      { icon: azureAIcon,      label: 'Azure' },
      { icon: kubernetesIcon,  label: 'Kubernetes' },
      { icon: dockerIcon,      label: 'Docker' },
      { icon: helmIcon,        label: 'Helm' },
      { icon: prometheusIcon,  label: 'Prometheus' },
      { icon: grafanaIcon,     label: 'Grafana' },
      { icon: netCoreIcon,     label: '.NET Core' },
    ],
    description: [
      'As a DevOps Engineer at Netacent, responsibilities include the full CI/CD lifecycle across Azure DevOps — designing, maintaining, and optimizing pipelines that build, test, and deploy containerized C# applications to Kubernetes. End-to-end management of AKS clusters spans deployments, scaling, and ongoing operations to ensure production stability.',
      'A key architectural contribution has been the design and implementation of a Prometheus and Grafana observability stack across AKS clusters, providing the team with real-time visibility into cluster health, resource utilization, and application performance — shifting operations from reactive response to proactive monitoring.',
    ],
  },
  {
    title: 'Frontend Developer',
    projectName: "Sam's Bees",
    primaryImage: samsBeesHomepage,
    galleryVariant: 'browser' as const,
    projectUrl: 'http://samsbees.s3-website-us-east-1.amazonaws.com',
    technologies: [
      { icon: reactIcon,    label: 'React' },
      { icon: tailwindIcon, label: 'Tailwind CSS' },
      { icon: viteIcon,     label: 'Vite' },
      { icon: s3Icon,       label: 'AWS S3' },
    ],
    links: [
      { href: 'https://github.com/JacobE-Brown/SamsBees/tree/master', label: 'View on GitHub', icon: githubIcon },
    ],
    description: [
      "Sam's Bees is a full e-commerce storefront built for a local beekeeper, designed to showcase and sell handcrafted honey, beeswax, and candle products. Built with React, Tailwind CSS, and Vite, the site features a product catalog with cart functionality and a clean, warm aesthetic that reflects the brand's natural, artisan identity.",
      'Deployed as a static site to AWS S3, the project demonstrates end-to-end frontend delivery — from component design to cloud hosting — and served as the foundation for developing production habits around responsive layout, component reuse, and performance-conscious asset handling.',
    ],
  },
  {
    title: 'Full-Stack Developer',
    projectName: 'This Portfolio',
    primaryImage: portfolioHero,
    primaryImageClassName: 'w-full h-full object-contain bg-cream-neutral',
    secondaryImages: [figmaIcon, amplifyIcon] as [string, string],
    secondaryImagePaddings: ['p-4', 'p-5'] as [string, string],
    technologies: [
      { icon: figmaIcon,      label: 'Figma' },
      { icon: reactIcon,      label: 'React' },
      { icon: typescriptIcon, label: 'TypeScript' },
      { icon: tailwindIcon,   label: 'Tailwind CSS' },
      { icon: viteIcon,       label: 'Vite' },
      { icon: amplifyIcon,    label: 'AWS Amplify' },
    ],
    links: [
      { href: 'https://github.com/JacobE-Brown/PortfolioV3', label: 'View on GitHub', icon: githubIcon },
    ],
    description: [
      'Designed end-to-end in Figma and built with React, TypeScript, and Vite — this site is the project. The hex grid technology section uses axial coordinate math for layout and GSAP for starburst hover animations. A custom Tailwind v4 design token system drives the full color and typography palette.',
      'Deployed on AWS Amplify with a custom domain and email routing through Route 53 and SES. The full pipeline — from Figma frame to live URL — demonstrates both frontend craft and cloud infrastructure delivery.',
    ],
  },
]

function App() {
  return (
    <div className="min-h-screen bg-parchment text-text-1">
      <ParticleBackground />
      <HeroSection />
      <NavBar />

      {/* Content pillar */}
      <main className="relative z-10 overflow-x-clip bg-blue-neutral
                       max-w-screen-2xl mx-auto shadow-2xl
                       px-0 sm:mx-4 md:mx-6 lg:mx-8 xl:mx-auto">

        <AboutMe />

        <WhatIDo />

        <Technologies />

        <div id="projects">
          <h2 className="font-heading font-medium text-text-1 text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-center mb-8 sm:mb-10 md:mb-14 pt-10 sm:pt-12 md:pt-20">
            <span className="border-b-4 border-blue-medium-1 pb-2">Experience & Projects</span>
          </h2>
          {projects.map((project, i) => (
            <ProjectCard
              key={i}
              title={project.title}
              projectName={project.projectName}
              description={project.description}
              reversed={i % 2 !== 0}
              primaryImage={project.primaryImage}
              secondaryImages={project.secondaryImages as [string?, string?]}
              secondaryImagePaddings={project.secondaryImagePaddings as [string?, string?]}
              primaryImageClassName={project.primaryImageClassName}
              galleryVariant={project.galleryVariant}
              projectUrl={project.projectUrl}
              technologies={project.technologies}
              links={project.links}
            />
          ))}
        </div>

        <ContactMe />
      </main>
    </div>
  )
}

export default App
