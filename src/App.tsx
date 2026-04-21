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
import samsBeesHomepage from "./assets/images/Projects/Sam's Bees/SamsBeesHomepage.png"
import samsBeesProducts from "./assets/images/Projects/Sam's Bees/SamsBeesProductPage.png"
import githubIcon from './assets/images/TechLogos/github-1-1.svg'
import ContactMe from './components/ContactMe'

const projects = [
  {
    title: 'DevOps Engineer',
    projectName: 'Netacent',
    primaryImage: netacentLogo,
    secondaryImages: [azureAIcon, kubernetesIcon],
    secondaryImagePaddings: ['p-5', 'p-2'],
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
    links: [
      { href: 'https://github.com/JacobE-Brown/SamsBees/tree/master', label: 'View on GitHub', icon: githubIcon },
    ],
    description: [
      "Sam's Bees is a full e-commerce storefront built for a local beekeeper, designed to showcase and sell handcrafted honey, beeswax, and candle products. Built with React, Tailwind CSS, and Vite, the site features a product catalog with cart functionality and a clean, warm aesthetic that reflects the brand's natural, artisan identity.",
      'Deployed as a static site to AWS S3, the project demonstrates end-to-end frontend delivery — from component design to cloud hosting — and served as the foundation for developing production habits around responsive layout, component reuse, and performance-conscious asset handling.',
    ],
  },
  {
    title: 'Project Description',
    projectName: 'Hello World',
    description: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris.',
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
