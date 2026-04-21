import React, { useState, useEffect, useMemo, useRef } from 'react'
import HexGrid from './HexGrid'
import TechBadge from './TechBadge'


// Tech icon imports
import figmaIcon from '@/assets/images/TechLogos/figma.svg'
import educationIcon from '@/assets/images/TechLogos/education.svg'
import awsIcon from '@/assets/images/TechLogos/aws.svg'
import amplifyIcon from '@/assets/images/TechLogos/Amplify.svg'
import reactIcon from '@/assets/images/TechLogos/react.svg'
import tailwindIcon from '@/assets/images/TechLogos/tailwinds.svg'
import csharpIcon from '@/assets/images/TechLogos/c.svg'
import netcoreIcon from '@/assets/images/TechLogos/net-core-logo-1.svg'
import jsIcon from '@/assets/images/TechLogos/js.svg'
import tsIcon from '@/assets/images/TechLogos/typescript.svg'
import linuxIcon from '@/assets/images/TechLogos/tux-1.svg'
import pythonIcon from '@/assets/images/TechLogos/python.svg'
import githubIcon from '@/assets/images/TechLogos/github-1-1.svg'
import sqlIcon from '@/assets/images/TechLogos/sql.svg'
import dockerIcon from '@/assets/images/TechLogos/docker.svg'
import kubernetesIcon from '@/assets/images/TechLogos/kubernetes.svg'
import helmIcon from '@/assets/images/TechLogos/helm.svg'
import azureDevOpsIcon from '@/assets/images/TechLogos/Azure-DevOps.svg'
import azureCloudIcon from '@/assets/images/TechLogos/Azure-A.svg'
import prometheusIcon from '@/assets/images/TechLogos/Prometheus.svg'
import grafanaIcon from '@/assets/images/TechLogos/Grafana.svg'
import lokiIcon from '@/assets/images/TechLogos/loki.svg'
// Sub-tech icons (partial — others use text placeholder until assets are added)
import s3Icon from '@/assets/images/TechLogos/Simple Storage Service.svg'
import djangoIcon from '@/assets/images/TechLogos/django.svg'
// Education panel icons
import graduatedIcon from '@/assets/images/TechLogos/graduated.svg'
import awardIcon from '@/assets/images/TechLogos/award.svg'
// Education documents — served from public/documents/ as static assets
const bachelorsDoc     = '/documents/Bachlers.pdf'
const cwiDoc           = '/documents/CWI.pdf'
const resumeDoc        = '/documents/Jacob Brown Resume.pdf'
const certCybersecurity  = '/documents/CyberSecurity.pdf'
const certDataAnalytics  = '/documents/Data Analytics.pdf'
const certDatabase       = '/documents/Database Certification.pdf'
const certFigmaDesign    = '/documents/Figma Design Essentials.pdf'
const certGitGithub      = '/documents/Git&GITHUB.pdf'
const certGoogleCloud    = '/documents/GoogleCloud.pdf'
const certManageSecurity = '/documents/Manage Security Risks.pdf'
const certNetworkSecurity= '/documents/Network Security_.pdf'
const certPython         = '/documents/Python Certification.pdf'
const certWireframes     = '/documents/Wireframes.pdf'

// --- Types ---

type CategoryName =
  | 'Front-End Development'
  | 'Back-End Development'
  | 'Cloud & DevOps'
  | 'Monitoring & Observability'
  | 'Miscellaneous'

interface CategoryDef {
  name: CategoryName
  icon: string | null
}

interface SubTechItem {
  label: string
  iconSrc: string | null  // null = no asset yet, renders text placeholder
  href?: string           // when set, chip renders as a clickable link (e.g. cert PDFs)
}

interface TechItem {
  id: string
  label: string
  iconSrc: string
  icon: React.ReactNode
  q: number
  r: number
  description: string
  categories: CategoryName[]
  subTech?: SubTechItem[]
}

// --- Categories ---

const categoryDefs: CategoryDef[] = [
  { name: 'Cloud & DevOps', icon: null },
  { name: 'Back-End Development', icon: null },
  { name: 'Front-End Development', icon: null },
  { name: 'Monitoring & Observability', icon: null },
  { name: 'Miscellaneous', icon: null },
]

// --- Tech data ---

function makeTech(
  id: string,
  label: string,
  iconSrc: string,
  alt: string,
  q: number,
  r: number,
  cats: CategoryName[],
  description: string,
  subTech?: SubTechItem[],
): TechItem {
  return {
    id,
    label,
    iconSrc,
    icon: <img className="relative w-full h-full object-contain" alt={alt} src={iconSrc} />,
    q,
    r,
    categories: cats,
    description,
    subTech,
  }
}

// Desktop layout: 4-5-4-5-4 diamond (22 tiles)
// All rows satisfy the centering invariant: q_left + q_right + r = -1
//
//   r=-2 (4):  education   figma       github      aws
//   r=-1 (5):  amplify     linux       python      sql         docker
//   r= 0 (4):  kubernetes  helm        azure_devops azure_cloud
//   r= 1 (5):  csharp      netcore     react       tailwind    javascript
//   r= 2 (4):  typescript  prometheus  grafana     loki
//
// Grouping rationale:
//   Top row: info tiles + AWS
//   Second row: AWS ecosystem + backend foundation + containers/OS
//   Middle: DevOps orchestration + Azure pair
//   Fourth: back-end languages + frontend stack
//   Bottom: monitoring/observability cluster
//
// Array order is mobile-driven (see mobileGridPositions below).
// Desktop q,r are set per-item and are independent of array index.

const technologies: TechItem[] = [
  // Indices 0-2 — info / context tiles (mobile r=-5)
  makeTech('education', 'My Education', educationIcon, 'Education', -1, -2,
    ['Miscellaneous'],
    'Graduated from the College of Western Idaho with an Associates in Full-Stack Web Development. I continue learning through online courses, self-study, and personal projects.'),
  makeTech('figma', 'Figma', figmaIcon, 'Figma', 0, -2,
    ['Front-End Development', 'Miscellaneous'],
    'One of my favorite tools. Use Figma for UI/UX design, prototyping, and design systems — including the design for this portfolio.',
    [
      { label: 'Figma Design Essentials', iconSrc: awardIcon, href: certFigmaDesign },
      { label: 'Wireframes',              iconSrc: awardIcon, href: certWireframes },
    ]),
  makeTech('github', 'GitHub', githubIcon, 'GitHub', 1, -2,
    ['Miscellaneous'],
    'Version control with Git and GitHub for collaboration, code review, and CI/CD. Proficient with branching strategies, rebasing, cherry-picking, and resolving complex merge conflicts.',
    [
      { label: 'GitHub Actions', iconSrc: null },
      { label: 'Git & GitHub',   iconSrc: awardIcon, href: certGitGithub },
    ]),

  // Indices 3-6 — cloud + backend foundation (mobile r=-4)
  makeTech('aws', 'AWS', awsIcon, 'AWS', 2, -2,
    ['Cloud & DevOps'],
    'One of my favorite technologies. Experience with EC2, S3, Lambda, RDS, CloudFront, and IAM. Comfortable deploying and managing cloud infrastructure using AWS services.',
    [
      { label: 'EC2',          iconSrc: null },
      { label: 'S3',           iconSrc: s3Icon },
      { label: 'Lambda',       iconSrc: null },
      { label: 'RDS',          iconSrc: null },
      { label: 'CloudFront',   iconSrc: null },
      { label: 'IAM',          iconSrc: null },
      { label: 'Google Cloud', iconSrc: awardIcon, href: certGoogleCloud },
    ]),
  makeTech('amplify', 'AWS Amplify', amplifyIcon, 'AWS Amplify', -2, -1,
    ['Cloud & DevOps'],
    'Hosting this portfolio on AWS Amplify. Experience using Amplify for CI/CD deployment pipelines, custom domains, and hosting static sites and full-stack web apps.'),
  makeTech('python', 'Python', pythonIcon, 'Python', 0, -1,
    ['Back-End Development'],
    'Strong Python skills with a focus on scripting, automation, and tooling. Experience building utilities and working with data processing libraries.',
    [
      { label: 'pip',                   iconSrc: null },
      { label: 'Django',                iconSrc: djangoIcon },
      { label: 'Python Certification',  iconSrc: awardIcon, href: certPython },
      { label: 'Data Analytics',        iconSrc: awardIcon, href: certDataAnalytics },
    ]),
  makeTech('sql', 'SQL / Databases', sqlIcon, 'SQL', 1, -1,
    ['Back-End Development'],
    'Experienced with relational databases including MySQL, SQLite, MSSQL, and PostgreSQL. Also familiar with caching solutions like Redis.',
    [
      { label: 'MySQL',                 iconSrc: null },
      { label: 'SQLite',                iconSrc: null },
      { label: 'MSSQL',                 iconSrc: null },
      { label: 'Redis',                 iconSrc: null },
      { label: 'PostgreSQL',            iconSrc: null },
      { label: 'Database Certification',iconSrc: awardIcon, href: certDatabase },
    ]),

  // Indices 7-9 — DevOps core (mobile r=-3)
  makeTech('docker', 'Docker', dockerIcon, 'Docker', 2, -1,
    ['Cloud & DevOps'],
    'Daily use for containerizing applications and managing local dev environments. Comfortable writing Dockerfiles, managing images, and working within container-based workflows.'),
  makeTech('linux', 'Linux', linuxIcon, 'Linux', -1, -1,
    ['Cloud & DevOps'],
    'Daily driver OS and primary server environment. Comfortable with system administration, shell scripting, package management, and managing Linux-based container hosts.',
    [
      { label: 'Cybersecurity',    iconSrc: awardIcon, href: certCybersecurity },
      { label: 'Network Security', iconSrc: awardIcon, href: certNetworkSecurity },
    ]),
  makeTech('kubernetes', 'Kubernetes', kubernetesIcon, 'Kubernetes', -2, 0,
    ['Cloud & DevOps'],
    'Hands-on experience deploying and managing workloads in Kubernetes clusters. Comfortable with pods, deployments, services, ingress, namespaces, and YAML resource management. Use k9s for cluster navigation and Cilium/Hubble for networking and observability.',
    [
      { label: 'kubectl',            iconSrc: null },
      { label: 'k9s',                iconSrc: null },
      { label: 'Ingress',            iconSrc: null },
      { label: 'Security Risk Mgmt', iconSrc: awardIcon, href: certManageSecurity },
    ]),

  // Indices 10-13 — orchestration + Azure pair (mobile r=-2)
  makeTech('helm', 'Helm', helmIcon, 'Helm', -1, 0,
    ['Cloud & DevOps'],
    'Use Helm to manage Kubernetes application deployments via charts. Experience writing and customizing Helm charts for repeatable, version-controlled cluster releases.'),
  makeTech('azure_devops', 'Azure DevOps', azureDevOpsIcon, 'Azure DevOps', 0, 0,
    ['Cloud & DevOps'],
    'Daily use at Netacent — managing pipelines, releases, repos, and work items. Experience authoring YAML pipelines and configuring multi-stage release definitions.',
    [
      { label: 'Pipelines', iconSrc: null },
      { label: 'Repos', iconSrc: null },
      { label: 'Boards', iconSrc: null },
    ]),
  makeTech('azure_cloud', 'Azure Cloud', azureCloudIcon, 'Azure Cloud', 1, 0,
    ['Cloud & DevOps'],
    'Experience with Azure cloud services for container-based workloads. Use AKS for Kubernetes orchestration, ACR as a container registry, and ACNS with Retina for network observability.',
    [
      { label: 'AKS', iconSrc: null },
      { label: 'ACR', iconSrc: null },
      { label: 'ACNS', iconSrc: null },
    ]),
  makeTech('csharp', 'C#', csharpIcon, 'C#', -3, 1,
    ['Back-End Development'],
    'Strongest backend language. Proficient in C# with ASP.NET Core, Entity Framework, LINQ, and .NET ecosystem tooling.',
    [
      { label: 'EF Core', iconSrc: null },
      { label: 'LINQ', iconSrc: null },
    ]),

  // Indices 14-16 — back-end + frontend (mobile r=-1)
  makeTech('netcore', 'ASP.NET Core', netcoreIcon, '.NET', -2, 1,
    ['Back-End Development'],
    'Backend framework for building REST APIs and web applications. Experience with middleware pipelines, dependency injection, and Entity Framework Core.'),
  makeTech('react', 'React', reactIcon, 'React', -1, 1,
    ['Front-End Development'],
    'Primary frontend framework. Deep experience with hooks, context, component patterns, and building production UIs — this portfolio is built with React.'),
  makeTech('tailwind', 'Tailwind CSS', tailwindIcon, 'Tailwind', 0, 1,
    ['Front-End Development'],
    'Go-to CSS framework for utility-first styling. Proficient with Tailwind v4, custom design tokens, and responsive design patterns — used throughout this portfolio.'),

  // Indices 17-20 — frontend + monitoring (mobile r=0)
  makeTech('javascript', 'JavaScript', jsIcon, 'JavaScript', 1, 1,
    ['Front-End Development', 'Back-End Development'],
    'Core language for web development. Proficient with ES6+, async/await patterns, DOM manipulation, and Node.js runtime.'),
  makeTech('typescript', 'TypeScript', tsIcon, 'TypeScript', -3, 2,
    ['Front-End Development', 'Back-End Development'],
    'Preferred over plain JavaScript. Strong typing, interfaces, generics, and type-safe design across full-stack projects — used exclusively in this portfolio.'),
  makeTech('prometheus', 'Prometheus', prometheusIcon, 'Prometheus', -2, 2,
    ['Monitoring & Observability'],
    'Experience setting up Prometheus for metrics collection in Kubernetes environments. Use Retina for network metrics and integrate with Grafana for visualization and alerting.',
    [
      { label: 'Retina', iconSrc: null },
      { label: 'Alloy', iconSrc: null },
      { label: 'ACNS', iconSrc: null },
    ]),
  makeTech('grafana', 'Grafana', grafanaIcon, 'Grafana', -1, 2,
    ['Monitoring & Observability'],
    'Build and maintain Grafana dashboards for cluster and application observability. Experience configuring data sources, panels, and alert rules across Prometheus and Loki.'),

  // Index 21 — monitoring tail (mobile r=1)
  makeTech('loki', 'Grafana Loki', lokiIcon, 'Loki', 0, 2,
    ['Monitoring & Observability'],
    'Use Loki for log aggregation in Kubernetes clusters, with Alloy as the telemetry collector. Experience configuring log pipelines and querying logs from Grafana dashboards.',
    [
      { label: 'Alloy', iconSrc: null },
    ]),
]

// --- Education document data ---

const educationDiplomas = [
  { label: 'B.A. Liberal Arts — Magdalen College', href: bachelorsDoc },
  { label: 'A.A.S. Full-Stack Web Dev — CWI',      href: cwiDoc },
  { label: 'Resume',                                href: resumeDoc },
]

const educationCerts: SubTechItem[] = [
  { label: 'Cybersecurity',        iconSrc: awardIcon, href: certCybersecurity },
  { label: 'Data Analytics',       iconSrc: awardIcon, href: certDataAnalytics },
  { label: 'Databases',            iconSrc: awardIcon, href: certDatabase },
  { label: 'Figma Design',         iconSrc: awardIcon, href: certFigmaDesign },
  { label: 'Git & GitHub',         iconSrc: awardIcon, href: certGitGithub },
  { label: 'Google Cloud',         iconSrc: awardIcon, href: certGoogleCloud },
  { label: 'Security Risk Mgmt',   iconSrc: awardIcon, href: certManageSecurity },
  { label: 'Network Security',     iconSrc: awardIcon, href: certNetworkSecurity },
  { label: 'Python',               iconSrc: awardIcon, href: certPython },
  { label: 'Wireframes',           iconSrc: awardIcon, href: certWireframes },
]

// --- Sub-tech chip ---

function SubTechChip({ sub }: { sub: SubTechItem }) {
  const icon = sub.iconSrc ? (
    <img src={sub.iconSrc} alt={sub.label} className="w-4 h-4 object-contain shrink-0" />
  ) : (
    <div className="w-4 h-4 flex items-center justify-center rounded bg-blue-medium-1/20 text-text-1 shrink-0 select-none"
      style={{ fontSize: '7px', fontWeight: 700, lineHeight: 1 }}>
      {sub.label.slice(0, 2).toUpperCase()}
    </div>
  )

  if (sub.href) {
    return (
      <a
        href={sub.href}
        target="_blank"
        rel="noopener noreferrer"
        title="View certificate"
        className="flex items-center gap-1.5 bg-white/60 border border-blue-medium-2/50 rounded-lg px-2 py-1
          cursor-pointer hover:bg-white/90 hover:border-blue-medium-2 hover:shadow-sm transition-all"
      >
        {icon}
        <span className="font-sans text-text-1 text-xs leading-none">{sub.label}</span>
        <span className="font-sans text-blue-medium-2 text-[9px] leading-none opacity-70 ml-0.5">↗</span>
      </a>
    )
  }

  return (
    <div className="flex items-center gap-1.5 bg-white/60 border border-blue-medium-1/30 rounded-lg px-2 py-1">
      {icon}
      <span className="font-sans text-text-1 text-xs leading-none">{sub.label}</span>
    </div>
  )
}

// --- Desktop detail panel ---

function DetailPanel({ tech }: { tech: TechItem | null }) {
  const [displayTech, setDisplayTech] = useState<TechItem | null>(tech)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    if (tech?.id === displayTech?.id) return
    setAnimating(true)
    const timeout = setTimeout(() => {
      setDisplayTech(tech)
      setAnimating(false)
    }, 200)
    return () => clearTimeout(timeout)
  }, [tech])

  const showDefault = !displayTech || displayTech.id === 'education'

  return (
    <div className="flex flex-col items-center gap-6 flex-1 max-w-xl px-4 lg:pt-8">
      <div className={`flex flex-col items-center gap-6 w-full transition-all duration-200 ease-out
        ${animating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
        {/* Large hex badge */}
        <div className="w-48 h-52 cursor-default transition-transform duration-200 ease-out hover:scale-105">
          <TechBadge
            icon={
              <img
                className="relative w-full h-full object-contain"
                alt={displayTech?.label ?? 'My Education'}
                src={displayTech?.iconSrc ?? educationIcon}
              />
            }
            name={displayTech?.label ?? 'My Education'}
            hexSize={{ x: 100, y: 100 }}
          />
        </div>

        {showDefault ? (
          <>
            {/* Diplomas & resume */}
            <div className="flex flex-col gap-2 w-full">
              <h4 className="font-sans font-semibold text-text-1 text-xs uppercase tracking-widest opacity-50">
                Diplomas & Resume
              </h4>
              <div className="flex flex-col gap-2">
                {educationDiplomas.map((doc) => (
                  <a
                    key={doc.label}
                    href={doc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 self-start font-sans text-sm md:text-base text-text-2 hover:text-text-1 transition-colors duration-200"
                  >
                    <img src={graduatedIcon} alt="" className="w-5 h-5 object-contain opacity-60 shrink-0" />
                    {doc.label}
                  </a>
                ))}
              </div>
            </div>

            {/* School descriptions */}
            <div className="flex flex-col gap-6 w-full">
              <div>
                <h3 className="font-sans font-extrabold text-text-1 text-lg md:text-xl mb-2">Magdalen College</h3>
                <p className="font-sans text-text-1 text-base md:text-lg leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
              <div>
                <h3 className="font-sans font-extrabold text-text-1 text-lg md:text-xl mb-2">College of Western Idaho</h3>
                <p className="font-sans text-text-1 text-base md:text-lg leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent
                  libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum
                  imperdiet. Duis sagittis ipsum. Praesent mauris.
                </p>
              </div>
            </div>

            {/* Certifications */}
            <div className="flex flex-col gap-2 w-full">
              <h4 className="font-sans font-semibold text-text-1 text-xs uppercase tracking-widest opacity-50">
                Certifications
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {educationCerts.map((cert) => (
                  <SubTechChip key={cert.label} sub={cert} />
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-4 w-full">
            <p className="font-sans text-text-1 text-base md:text-lg leading-relaxed">
              {displayTech!.description}
            </p>
            {displayTech!.subTech && displayTech!.subTech.length > 0 && (
              <div className="flex flex-col gap-2">
                <h4 className="font-sans font-semibold text-text-1 text-xs uppercase tracking-widest opacity-50">
                  Related
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {displayTech!.subTech.map((sub) => (
                    <SubTechChip key={sub.label} sub={sub} />
                  ))}
                </div>
              </div>
            )}
            <div className="flex flex-wrap gap-1.5 mt-1">
              {displayTech!.categories.map((cat) => (
                <span key={cat} className="bg-blue-medium-1/20 text-text-1 text-xs font-sans px-2 py-0.5 rounded-full">
                  {cat}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// --- Mobile modal ---

function MobileModal({ tech, onClose, activeFilters, onToggleFilter }: {
  tech: TechItem
  onClose: () => void
  activeFilters: Set<CategoryName>
  onToggleFilter: (name: CategoryName) => void
}) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    requestAnimationFrame(() => setVisible(true))
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const el = overlayRef.current
    el?.focus()
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab') {
        const focusable = el?.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])'
        )
        if (!focusable?.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <div
      ref={overlayRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label={tech.label}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-md bg-white/70 p-6 overflow-y-auto
        outline-none transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
      onClick={onClose}
    >
      <div
        className={`relative flex flex-col items-center gap-6 w-full max-w-sm
          transition-all duration-300 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute -top-2 -right-2 w-10 h-10 flex items-center justify-center
            rounded-full bg-blue-neutral text-text-1 text-xl font-bold
            border-2 border-blue-medium-2 hover:bg-blue-medium-1 transition-colors"
        >
          ✕
        </button>

        <div className="w-40 h-44 sm:w-56 sm:h-60 cursor-default transition-transform duration-200 ease-out hover:scale-105">
          <TechBadge
            icon={<img className="relative w-full h-full object-contain" alt={tech.label} src={tech.iconSrc} />}
            name={tech.label}
            hexSize={{ x: 120, y: 120 }}
          />
        </div>
        <div className="flex flex-col gap-4 w-full">
          {tech.id === 'education' ? (
            <>
              {/* Diplomas & resume */}
              <div className="flex flex-col gap-2 w-full">
                <h4 className="font-sans font-semibold text-text-1 text-xs uppercase tracking-widest opacity-50">
                  Diplomas & Resume
                </h4>
                <div className="flex flex-col gap-2">
                  {educationDiplomas.map((doc) => (
                    <a
                      key={doc.label}
                      href={doc.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 self-start font-sans text-sm text-text-2 hover:text-text-1 transition-colors duration-200"
                    >
                      <img src={graduatedIcon} alt="" className="w-5 h-5 object-contain opacity-60 shrink-0" />
                      {doc.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* School descriptions */}
              <div className="flex flex-col gap-6 w-full">
                <div>
                  <h3 className="font-sans font-extrabold text-text-1 text-lg mb-2">Magdalen College</h3>
                  <p className="font-sans text-text-1 text-base leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>
                <div>
                  <h3 className="font-sans font-extrabold text-text-1 text-lg mb-2">College of Western Idaho</h3>
                  <p className="font-sans text-text-1 text-base leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent
                    libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum
                    imperdiet. Duis sagittis ipsum. Praesent mauris.
                  </p>
                </div>
              </div>

              {/* Certifications */}
              <div className="flex flex-col gap-2 w-full">
                <h4 className="font-sans font-semibold text-text-1 text-xs uppercase tracking-widest opacity-50">
                  Certifications
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {educationCerts.map((cert) => (
                    <SubTechChip key={cert.label} sub={cert} />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <h3 className="font-sans font-extrabold text-text-1 text-xl">{tech.label}</h3>
              <p className="font-sans text-text-1 text-base leading-relaxed">{tech.description}</p>
              {tech.subTech && tech.subTech.length > 0 && (
                <div className="flex flex-col gap-2">
                  <h4 className="font-sans font-semibold text-text-1 text-xs uppercase tracking-widest opacity-50">
                    Related
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {tech.subTech.map((sub) => (
                      <SubTechChip key={sub.label} sub={sub} />
                    ))}
                  </div>
                </div>
              )}
              <div className="flex flex-wrap gap-1.5">
                {tech.categories.map((cat) => {
                  const isActive = activeFilters.has(cat)
                  return (
                    <button
                      key={cat}
                      onClick={() => { onToggleFilter(cat); onClose() }}
                      className={`text-xs font-sans px-2 py-0.5 rounded-full border transition-colors cursor-pointer
                        ${isActive
                          ? 'bg-blue-medium-1 border-blue-medium-2 text-text-1'
                          : 'bg-blue-medium-1/20 border-blue-medium-1/40 text-text-1 hover:bg-blue-medium-1/40'
                        }`}
                    >
                      {cat}
                    </button>
                  )
                })}
              </div>
            </>
          )}
        </div>
        <button
          onClick={onClose}
          className="self-start border-2 border-blue-medium-2 bg-transparent px-5 py-2
            text-text-1 font-sans text-lg rounded-lg
            hover:bg-blue-medium-2 hover:text-white transition-colors mt-4"
        >
          Back
        </button>
      </div>
    </div>
  )
}

// --- Mobile hex layout ---
// 3-4-3-4-3-4-1 = 22 tiles across 7 rows (r=-5 to r=1)
// Max 4 wide — fits comfortably at 60% scale on small phones.
// All rows satisfy the centering invariant: q_left + q_right + r = -1
// Tiles are remapped in technologies[] array order (index 0–21).
//
//   r=-5 (3): education, figma, github
//   r=-4 (4): aws, amplify, python, sql
//   r=-3 (3): docker, linux, kubernetes
//   r=-2 (4): helm, azure_devops, azure_cloud, csharp
//   r=-1 (3): netcore, react, tailwind
//   r= 0 (4): javascript, typescript, prometheus, grafana
//   r= 1 (1): loki

const mobileGridPositions: { q: number; r: number }[] = [
  // Row r=-5 (3): education, figma, github
  { q: 1, r: -5 }, { q: 2, r: -5 }, { q: 3, r: -5 },
  // Row r=-4 (4): aws, amplify, python, sql
  { q: 0, r: -4 }, { q: 1, r: -4 }, { q: 2, r: -4 }, { q: 3, r: -4 },
  // Row r=-3 (3): docker, linux, kubernetes
  { q: 0, r: -3 }, { q: 1, r: -3 }, { q: 2, r: -3 },
  // Row r=-2 (4): helm, azure_devops, azure_cloud, csharp
  { q: -1, r: -2 }, { q: 0, r: -2 }, { q: 1, r: -2 }, { q: 2, r: -2 },
  // Row r=-1 (3): netcore, react, tailwind
  { q: -1, r: -1 }, { q: 0, r: -1 }, { q: 1, r: -1 },
  // Row r=0 (4): javascript, typescript, prometheus, grafana
  { q: -2, r: 0 }, { q: -1, r: 0 }, { q: 0, r: 0 }, { q: 1, r: 0 },
  // Row r=1 (1): loki
  { q: -1, r: 1 },
]

// --- Main component ---

export function Technologies(): React.JSX.Element {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [activeFilters, setActiveFilters] = useState<Set<CategoryName>>(new Set())
  const [isMobile, setIsMobile] = useState(false)
  const [isCompactGrid, setIsCompactGrid] = useState(false)

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 1280)
      setIsCompactGrid(window.innerWidth < 768)
    }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const displayHexes = useMemo(() => {
    if (!isCompactGrid) return technologies
    return technologies.map((tech, i) => ({
      ...tech,
      q: mobileGridPositions[i].q,
      r: mobileGridPositions[i].r,
    }))
  }, [isCompactGrid])

  const fadedIds = useMemo(() => {
    if (activeFilters.size === 0) return new Set<string>()
    const faded = new Set<string>()
    for (const tech of displayHexes) {
      const matchesAny = tech.categories.some((cat) => activeFilters.has(cat))
      if (!matchesAny) faded.add(tech.id)
    }
    return faded
  }, [activeFilters, displayHexes])

  const selectedTech = selectedId ? displayHexes.find((t) => t.id === selectedId) ?? null : null

  const handleSelect = (id: string) => {
    setSelectedId((prev) => (prev === id ? null : id))
  }

  const handleReturn = () => setSelectedId(null)

  const toggleFilter = (name: CategoryName) => {
    setActiveFilters((prev) => {
      const next = new Set(prev)
      if (next.has(name)) {
        next.delete(name)
      } else {
        next.add(name)
      }
      return next
    })
    setSelectedId(null)
  }

  return (
    <section id="skills" className="bg-blue-neutral flex flex-col items-center justify-center overflow-hidden px-4 py-10 sm:py-12 md:py-20"
      onClick={() => { if (activeFilters.size > 0) setActiveFilters(new Set()) }}>
      <h2 className="font-heading font-medium text-text-1 text-3xl sm:text-4xl md:text-5xl lg:text-7xl mb-8 sm:mb-10 md:mb-14">
        <span className="border-b-4 border-blue-medium-1 pb-2">My Skills</span>
      </h2>

      <div className="flex flex-col lg:flex-row items-start justify-center gap-8 w-full max-w-7xl">
        {/* Left: Filters + Hex Grid */}
        <div className="flex flex-col items-center gap-4 flex-1">
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl px-4">
            {categoryDefs.map((cat) => {
              const isActive = activeFilters.has(cat.name)
              return (
                <button
                  key={cat.name}
                  onClick={(e) => { e.stopPropagation(); toggleFilter(cat.name) }}
                  className={`flex items-center justify-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5
                    ${isActive
                      ? 'bg-blue-medium-1 border-blue-medium-2 shadow-md ring-2 ring-blue-medium-2/30'
                      : 'bg-cream-neutral border-blue-medium-1'
                    }
                    rounded-full border-1.5 sm:border-2 shadow-sm
                    hover:shadow-md hover:scale-105 hover:-translate-y-0.5
                    active:scale-95
                    transition-all duration-200 ease-out
                    cursor-pointer`}
                >
                  <span className="font-sans font-medium text-text-1 text-xs sm:text-sm tracking-wide whitespace-nowrap">
                    {cat.name}
                  </span>
                </button>
              )
            })}
          </div>

          <div className="flex justify-center">
            <HexGrid
              hexes={displayHexes}
              size={75}
              fadedIds={fadedIds}
              onSelect={handleSelect}
              onReturn={handleReturn}
            />
          </div>
        </div>

        {/* Right: Detail panel (wide desktop only) */}
        <div className="hidden xl:flex">
          <DetailPanel tech={selectedTech} />
        </div>
      </div>

      {/* Mobile modal */}
      {isMobile && selectedTech && (
        <MobileModal tech={selectedTech} onClose={handleReturn} activeFilters={activeFilters} onToggleFilter={toggleFilter} />
      )}
    </section>
  )
}

export default Technologies
