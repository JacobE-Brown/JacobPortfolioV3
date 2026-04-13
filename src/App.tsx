import './index.css'
import HeroSection from './components/HeroSection'
import NavBar from './components/NavBar'
import AboutMe from './components/AboutMe'
import WhatIDo from './components/WhatIDo'
import Technologies from './components/Technologies'
import ProjectCard from './components/ProjectCard'
import ContactMe from './components/ContactMe'

const projects = [
  {
    title: 'Project Description',
    projectName: 'Hello World',
    description: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris.',
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
      <HeroSection />

      {/* Content pillar — Fluent-style floating card */}
      <main className="relative z-10 overflow-x-clip bg-blue-neutral rounded-t-3xl -mt-6
                       max-w-screen-2xl mx-auto
                       px-0 sm:mx-4 md:mx-6 lg:mx-8 xl:mx-auto
                       shadow-[0_-2px_4px_rgba(0,0,0,0.04),0_-4px_12px_rgba(0,0,0,0.08),0_-8px_24px_rgba(0,0,0,0.12)]">
        <NavBar />

        <AboutMe />

        <WhatIDo />

        <Technologies />

        <div id="projects">
          {projects.map((project, i) => (
            <ProjectCard
              key={i}
              title={project.title}
              projectName={project.projectName}
              description={project.description}
              reversed={i % 2 !== 0}
            />
          ))}
        </div>

        <ContactMe />
      </main>
    </div>
  )
}

export default App
