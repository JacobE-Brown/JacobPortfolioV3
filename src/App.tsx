import './index.css'
import ParticleBackground from './components/ParticleBackground'
import HeroSection from './components/HeroSection'
import NavBar from './components/NavBar'
import AboutMe from './components/AboutMe'
import WhatIDo from './components/WhatIDo'
import Technologies from './components/Technologies'
import ProjectCard from './components/ProjectCard'
import netacentLogo from './assets/images/Projects/netacent/Netacent-Primary-Logo.webp'
import kubernetesIcon from './assets/images/tech/kubernetes.svg'
import azureAIcon from './assets/images/tech/Azure/Azure-A.svg'
import azureDevOpsIcon from './assets/images/tech/AzureDevOps/Azure-DevOps.svg'
import dockerIcon from './assets/images/tech/docker.svg'
import helmIcon from './assets/images/tech/Helm.svg'
import prometheusIcon from './assets/images/tech/Prometheus.svg'
import grafanaIcon from './assets/images/tech/Grafana.svg'
import netCoreIcon from './assets/images/tech/net-core-logo-1.svg'
import reactIcon from './assets/images/tech/react.svg'
import tailwindIcon from './assets/images/tech/tailwinds.svg'
import viteIcon from './assets/images/tech/vitejs.svg'
import s3Icon from './assets/images/tech/AWS/Simple Storage Service.svg'
import typescriptIcon from './assets/images/tech/typescript.svg'
import samsBeesHomepage from "./assets/images/Projects/Sam's Bees/SamsBeesHomepage.webp"
import githubIcon from './assets/images/tech/github-1-1.svg'
import portfolioHero from "./assets/images/Projects/Recursive Portfolio/Portfolio pic.png"
import figmaIcon from './assets/images/tech/figma.svg'
import amplifyIcon from './assets/images/tech/AWS/Amplify.svg'
import ContactMe from './components/ContactMe'
import externalLinkIcon from './assets/images/misc/external-link.svg'

const projects = [
  {
    title: 'DevOps Engineer',
    projectName: 'Netacent',
    primaryImage: netacentLogo,
    projectUrl: 'https://netacent.com',
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
    links: [
      { href: 'https://netacent.com', label: 'Visit Site', icon: externalLinkIcon },
    ],
    description: [
      'Netacent is a Data Station platform that uses cloud computing to handle unemployment insurance claims for the state. The platform is built on Azure cloud infrastructure with microservices running in Kubernetes, deployed through Azure DevOps CI/CD pipelines. Key technologies include ASP.NET Core, Docker, Helm, and monitoring with Prometheus and Grafana.',
      'As a Developer-Operator, I run tests, update and deploy software across environments, monitor cluster health and application performance, troubleshoot issues, and contribute to both infrastructure and application code. My role spans the full DevOps lifecycle — from code review and build pipelines to production deployments and incident response.',
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
      { href: 'http://samsbees.s3-website-us-east-1.amazonaws.com', label: 'Visit Site', icon: externalLinkIcon },
      { href: 'https://github.com/JacobE-Brown/SamsBees/tree/master', label: 'View on GitHub', icon: githubIcon },
    ],
    description: [
      "Sam's Bees is an online storefront built for a fictional local beekeeper. It is a school project for frontend design, nominally to showcase and sell handcrafted honey, beeswax, and candle products. Built with React, Tailwind CSS, and Vite, the site has a product catalog and functional cart.",
      'The focus of this project was to craft a visually polished website with CSS — paying close attention to color palette, spacing, typography, and visual hierarchy to create a warm, cohesive brand feel. Deployed as a static site to AWS S3, the project demonstrates frontend delivery from component design to cloud hosting.',
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
      { href: 'https://jacobebrown.dev', label: 'Visit Site', icon: externalLinkIcon },
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
      <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-text-1 focus:text-cream-neutral focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg focus:font-sans focus:text-sm">
        Skip to content
      </a>
      <ParticleBackground />
      <HeroSection />
      <NavBar />

      {/* Content pillar */}
      <main className="relative z-10 overflow-x-clip bg-blue-neutral
                       max-w-screen-2xl mx-auto shadow-2xl rounded-t-3xl
                       px-0 sm:mx-4 md:mx-6 lg:mx-8 xl:mx-auto">

        {/* Mobile/tablet nav accent — mirrors the desktop navbar's rounded navy top */}
        <div className="lg:hidden bg-text-1 rounded-t-3xl h-3
                        shadow-[0_-2px_4px_rgba(0,0,0,0.04),0_-4px_12px_rgba(0,0,0,0.08),0_-8px_24px_rgba(0,0,0,0.12)]" />

        <AboutMe />

        <WhatIDo />

        <Technologies />

        <div id="projects">
          <h2 className="font-heading font-medium text-text-1 text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-center mb-8 sm:mb-10 md:mb-14 pt-10 sm:pt-12 md:pt-20 px-6 sm:px-8 md:px-16">
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
