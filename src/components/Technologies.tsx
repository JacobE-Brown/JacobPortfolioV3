import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import HexGrid from './HexGrid'
import TechBadge from './TechBadge'


// Tech icon imports
import figmaIcon from '@/assets/images/tech/figma.svg'
import educationIcon from '@/assets/images/misc/education.svg'
import awsIcon from '@/assets/images/tech/AWS/aws.svg'
import amplifyIcon from '@/assets/images/tech/AWS/Amplify.svg'
import reactIcon from '@/assets/images/tech/react.svg'
import tailwindIcon from '@/assets/images/tech/tailwinds.svg'
import csharpIcon from '@/assets/images/tech/c.svg'
import netcoreIcon from '@/assets/images/tech/net-core-logo-1.svg'
import jsIcon from '@/assets/images/tech/js.svg'
import tsIcon from '@/assets/images/tech/typescript.svg'
import linuxIcon from '@/assets/images/tech/tux-1.svg'
import pythonIcon from '@/assets/images/tech/python.svg'
import githubIcon from '@/assets/images/tech/github-1-1.svg'
import sqlIcon from '@/assets/images/tech/sql.svg'
import dockerIcon from '@/assets/images/tech/docker.svg'
import kubernetesIcon from '@/assets/images/tech/kubernetes.svg'
import helmIcon from '@/assets/images/tech/helm.svg'
import azureDevOpsIcon from '@/assets/images/tech/AzureDevOps/Azure-DevOps.svg'
import azureCloudIcon from '@/assets/images/tech/Azure/Azure-A.svg'
import prometheusIcon from '@/assets/images/tech/Prometheus.svg'
import grafanaIcon from '@/assets/images/tech/Grafana.svg'
import claudeIcon from '@/assets/images/tech/claude-color.svg'
// Sub-tech icons (partial — others use text placeholder until assets are added)
import s3Icon from '@/assets/images/tech/AWS/Simple Storage Service.svg'
import ec2Icon from '@/assets/images/tech/AWS/EC2.svg'
import lambdaIcon from '@/assets/images/tech/AWS/Lambda.svg'
import rdsIcon from '@/assets/images/tech/AWS/RDS.svg'
import cloudFrontIcon from '@/assets/images/tech/AWS/CloudFront.svg'
import iamIcon from '@/assets/images/tech/AWS/IAM Identity Center.svg'
import archLinuxIcon from '@/assets/images/tech/arch-linux.svg'
import k9sIcon from '@/assets/images/tech/k9s.png'
import aksIcon from '@/assets/images/tech/Azure/Kubernetes-Services.svg'
import lokiIcon from '@/assets/images/tech/loki.svg'
import djangoIcon from '@/assets/images/tech/django.svg'
import githubActionsIcon from '@/assets/images/tech/github-actions.svg'
import mysqlIcon from '@/assets/images/tech/logo-mysql-170x115.png'
import postgresqlIcon from '@/assets/images/tech/postgresql-logo-svgrepo-com.svg'
import redisIcon from '@/assets/images/tech/icons8-redis-24.png'
import ubuntuIcon from '@/assets/images/tech/ubuntu-logo_svgstack_com_31491776873971.svg'
import debianIcon from '@/assets/images/tech/debian.svg'
import ciliumIcon from '@/assets/images/tech/cilium.svg'
import ebpfIcon from '@/assets/images/tech/ebpf-icon.svg'
import alloyIcon from '@/assets/images/tech/alloy_icon.png'
import acrIcon from '@/assets/images/tech/container-registries.svg'
import vueIcon from '@/assets/images/tech/vue.svg'
import skillIcon from '@/assets/images/misc/skill.svg'
import sqliteIcon from '@/assets/images/tech/sqlite.svg'
import mssqlIcon from '@/assets/images/tech/sql-server.svg'
import retinaIcon from '@/assets/images/tech/Retina-logo-horizontal.png'
import clawdIcon from '@/assets/images/tech/clawd.svg'
import mcpIcon from '@/assets/images/tech/MCP.svg'
import subagentIcon from '@/assets/images/tech/virtual-assistant.svg'
import azurePipelinesIcon from '@/assets/images/tech/Azure/azurepipelines-svgrepo-com.svg'
import azureReposIcon from '@/assets/images/tech/Azure/Azure Repos.svg'
import azureBoardsIcon from '@/assets/images/tech/AzureDevOps/Azure_Public_Service_Icons/Icons/general/10015-icon-service-Dashboard.svg'
import hubbleIcon from '@/assets/images/tech/hubble-space-telescope.svg'
import angularIcon from '@/assets/images/tech/Angular_idhHNISbnM_1.svg'
import wordpressIcon from '@/assets/images/tech/wordpress.svg'
import lightsailIcon from '@/assets/images/tech/AWS/Lightsail.svg'
import route53Icon from '@/assets/images/tech/AWS/Route 53.svg'
import vpcIcon from '@/assets/images/tech/AWS/Virtual Private Cloud.svg'
import cloudWatchIcon from '@/assets/images/tech/AWS/CloudWatch.svg'
import sqsIcon from '@/assets/images/tech/AWS/Simple Queue Service.svg'
import cosmosDbIcon from '@/assets/images/tech/Azure/Azure-Cosmos-DB.svg'
import azureSqlIcon from '@/assets/images/tech/Azure/SQL-Database.svg'
import azureBlobIcon from '@/assets/images/tech/Azure/Blob-Block.svg'
import azureVmIcon from '@/assets/images/tech/Azure/Virtual-Machine.svg'
import azureFuncIcon from '@/assets/images/tech/Azure/Function-Apps.svg'
import azureEntraIcon from '@/assets/images/tech/Azure/Entra-Managed-Identities.svg'
import azureArtifactsIcon from '@/assets/images/tech/azure-artifacts.svg'
import terminalIcon from '@/assets/images/tech/terminal.svg'
import nugetIcon from '@/assets/images/tech/nuget.svg'
import chocolateyIcon from '@/assets/images/tech/chocolatey.svg'
import auroraIcon from '@/assets/images/tech/Aurora.svg'
import viteIcon from '@/assets/images/tech/vitejs.svg'
import dynamoDbIcon from '@/assets/images/tech/DynamoDB.svg'
import serilogIcon from '@/assets/images/tech/Serilog.svg'
import nodeIcon from '@/assets/images/tech/nodejs-icon-svgrepo-com.svg'
import cssIcon from '@/assets/images/tech/css-3.svg'
import bootstrapIcon from '@/assets/images/tech/bootstrap-5.svg'
// Education panel icons
import graduatedIcon from '@/assets/images/misc/graduated.svg'
import awardIcon from '@/assets/images/misc/award.svg'
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
  displayName: string
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
  { name: 'Cloud & DevOps',           displayName: 'Cloud & DevOps', icon: null },
  { name: 'Back-End Development',     displayName: 'Backend',        icon: null },
  { name: 'Front-End Development',    displayName: 'Frontend',       icon: null },
  { name: 'Monitoring & Observability', displayName: 'Observability', icon: null },
  { name: 'Miscellaneous',            displayName: 'Misc',           icon: null },
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
    icon: <img className="relative w-full h-full object-contain rounded-md" alt={alt} src={iconSrc} />,
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
//   r= 2 (4):  typescript  prometheus  grafana     claude
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
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.'),
  makeTech('figma', 'Figma', figmaIcon, 'Figma', 0, -2,
    ['Front-End Development', 'Miscellaneous'],
    'One of my favorite tools. Use Figma for UI/UX design, prototyping, and design systems — including the design for this portfolio.',
    [
      { label: 'Claude AI', iconSrc: claudeIcon },
      { label: 'Figma Design Essentials', iconSrc: awardIcon, href: certFigmaDesign },
      { label: 'Wireframes',              iconSrc: awardIcon, href: certWireframes },
    ]),
  makeTech('github', 'GitHub', githubIcon, 'GitHub', 1, -2,
    ['Miscellaneous'],
    'Version control with Git and GitHub for collaboration, code review, and CI/CD. Proficient with branching strategies, rebasing, cherry-picking, and resolving complex merge conflicts.',
    [
      { label: 'Git',             iconSrc: githubIcon },
      { label: 'GitHub Actions', iconSrc: githubActionsIcon },
      { label: 'Azure Repos',    iconSrc: azureReposIcon },
      { label: 'Git & GitHub',   iconSrc: awardIcon, href: certGitGithub },
    ]),

  // Indices 3-6 — cloud + backend foundation (mobile r=-4)
  makeTech('aws', 'AWS', awsIcon, 'AWS', 2, -2,
    ['Cloud & DevOps'],
    'One of my favorite technologies. Experience with EC2, S3, Lambda, RDS, CloudFront, and IAM. Comfortable deploying and managing cloud infrastructure using AWS services.',
    [
      { label: 'EC2',          iconSrc: ec2Icon },
      { label: 'S3',           iconSrc: s3Icon },
      { label: 'Lambda',       iconSrc: lambdaIcon },
      { label: 'RDS',          iconSrc: rdsIcon },
      { label: 'CloudFront',   iconSrc: cloudFrontIcon },
      { label: 'IAM',          iconSrc: iamIcon },
      { label: 'Lightsail',    iconSrc: lightsailIcon },
      { label: 'Route 53',     iconSrc: route53Icon },
      { label: 'VPC',          iconSrc: vpcIcon },
      { label: 'CloudWatch',   iconSrc: cloudWatchIcon },
      { label: 'SQS',          iconSrc: sqsIcon },
      { label: 'DynamoDB',     iconSrc: dynamoDbIcon },
      { label: 'Google Cloud', iconSrc: awardIcon, href: certGoogleCloud },
    ]),
  makeTech('amplify', 'AWS Amplify', amplifyIcon, 'AWS Amplify', -2, -1,
    ['Cloud & DevOps'],
    'Hosting this portfolio on AWS Amplify. Experience using Amplify for CI/CD deployment pipelines, custom domains, and hosting static sites and full-stack web apps.',
    [
      { label: 'Lightsail', iconSrc: lightsailIcon },
      { label: 'WordPress', iconSrc: wordpressIcon },
    ]),
  makeTech('python', 'Python', pythonIcon, 'Python', 0, -1,
    ['Back-End Development'],
    'Strong Python skills with a focus on scripting, automation, and tooling. Experience building utilities and working with data processing libraries.',
    [
      { label: 'pip',                   iconSrc: pythonIcon },
      { label: 'Django',                iconSrc: djangoIcon },
      { label: 'NumPy',                 iconSrc: pythonIcon },
      { label: 'Pandas',                iconSrc: pythonIcon },
      { label: 'Flask',                 iconSrc: pythonIcon },
      { label: 'Python Certification',  iconSrc: awardIcon, href: certPython },
      { label: 'Data Analytics',        iconSrc: awardIcon, href: certDataAnalytics },
    ]),
  makeTech('sql', 'SQL / Databases', sqlIcon, 'SQL', 1, -1,
    ['Back-End Development'],
    'Experienced with relational databases including MySQL, SQLite, MSSQL, and PostgreSQL. Also familiar with caching solutions like Redis.',
    [
      { label: 'MySQL',                 iconSrc: mysqlIcon },
      { label: 'SQLite',                iconSrc: sqliteIcon },
      { label: 'MSSQL',                 iconSrc: mssqlIcon },
      { label: 'Redis',                 iconSrc: redisIcon },
      { label: 'PostgreSQL',            iconSrc: postgresqlIcon },
      { label: 'Cosmos DB',             iconSrc: cosmosDbIcon },
      { label: 'Aurora',                iconSrc: auroraIcon },
      { label: 'DynamoDB',              iconSrc: null },
      { label: 'Database Certification',iconSrc: awardIcon, href: certDatabase },
    ]),

  // Indices 7-9 — DevOps core (mobile r=-3)
  makeTech('docker', 'Docker', dockerIcon, 'Docker', 2, -1,
    ['Cloud & DevOps'],
    'Daily use for containerizing applications and managing local dev environments. Comfortable writing Dockerfiles, managing images, and working within container-based workflows.',
    [
      { label: 'Docker Compose', iconSrc: dockerIcon },
      { label: 'Docker Hub',     iconSrc: dockerIcon },
      { label: 'Dockerfile',     iconSrc: dockerIcon },
      { label: 'ACR',            iconSrc: acrIcon },
    ]),
  makeTech('linux', 'Linux', linuxIcon, 'Linux', -1, -1,
    ['Cloud & DevOps'],
    'Daily driver OS and primary server environment. Comfortable with system administration, shell scripting, package management, and managing Linux-based container hosts.',
    [
      { label: 'Bash', iconSrc: terminalIcon },
      { label: 'Vim', iconSrc: null },
      { label: 'SSH', iconSrc: terminalIcon },
      { label: 'Arch Linux', iconSrc: archLinuxIcon },
      { label: 'Ubuntu', iconSrc: ubuntuIcon },
      { label: 'Debian', iconSrc: debianIcon },
      { label: 'Cybersecurity',    iconSrc: awardIcon, href: certCybersecurity },
      { label: 'Network Security', iconSrc: awardIcon, href: certNetworkSecurity },
    ]),
  makeTech('kubernetes', 'Kubernetes', kubernetesIcon, 'Kubernetes', -2, 0,
    ['Cloud & DevOps'],
    'Hands-on experience deploying and managing workloads in Kubernetes clusters. Comfortable with pods, deployments, services, ingress, namespaces, and YAML resource management. Use k9s for cluster navigation and Cilium/Hubble for networking and observability.',
    [
      { label: 'kubectl',            iconSrc: kubernetesIcon },
      { label: 'k9s',                iconSrc: k9sIcon },
      { label: 'Ingress',            iconSrc: kubernetesIcon },
      { label: 'Namespaces',        iconSrc: kubernetesIcon },
      { label: 'Security Risk Mgmt', iconSrc: awardIcon, href: certManageSecurity },
    ]),

  // Indices 10-13 — orchestration + Azure pair (mobile r=-2)
  makeTech('helm', 'Helm', helmIcon, 'Helm', -1, 0,
    ['Cloud & DevOps'],
    'Use Helm to manage Kubernetes application deployments via charts. Experience writing and customizing Helm charts for repeatable, version-controlled cluster releases.',
    [
      { label: 'Helm Charts',  iconSrc: helmIcon },
      { label: 'Helmfile',     iconSrc: helmIcon },
      { label: 'Values Files', iconSrc: helmIcon },
    ]),
  makeTech('azure_devops', 'Azure DevOps', azureDevOpsIcon, 'Azure DevOps', 0, 0,
    ['Cloud & DevOps'],
    'Daily use at Netacent — managing pipelines, releases, repos, and work items. Experience authoring YAML pipelines and configuring multi-stage release definitions.',
    [
      { label: 'Pipelines', iconSrc: azurePipelinesIcon },
      { label: 'Repos', iconSrc: azureReposIcon },
      { label: 'Boards', iconSrc: azureBoardsIcon },
      { label: 'Artifacts', iconSrc: azureArtifactsIcon },
      { label: 'AWS', iconSrc: awsIcon },
    ]),
  makeTech('azure_cloud', 'Azure Cloud', azureCloudIcon, 'Azure Cloud', 1, 0,
    ['Cloud & DevOps'],
    'Experience with Azure cloud services for container-based workloads. Use AKS for Kubernetes orchestration, ACR as a container registry, and ACNS with Retina for network observability.',
    [
      { label: 'AKS', iconSrc: aksIcon },
      { label: 'ACR', iconSrc: acrIcon },
      { label: 'ACNS', iconSrc: hubbleIcon },
      { label: 'Blob Storage', iconSrc: azureBlobIcon },
      { label: 'Azure SQL', iconSrc: azureSqlIcon },
      { label: 'VMs', iconSrc: azureVmIcon },
      { label: 'Functions', iconSrc: azureFuncIcon },
      { label: 'Entra ID', iconSrc: azureEntraIcon },
    ]),
  makeTech('csharp', 'C#', csharpIcon, 'C#', -3, 1,
    ['Back-End Development'],
    'Strongest backend language. Proficient in C# with ASP.NET Core, Entity Framework, LINQ, and .NET ecosystem tooling.',
    [
      { label: 'Serilog', iconSrc: serilogIcon },
      { label: 'NuGet', iconSrc: nugetIcon },
      { label: 'Chocolatey', iconSrc: chocolateyIcon },
    ]),

  // Indices 14-16 — back-end + frontend (mobile r=-1)
  makeTech('netcore', 'ASP.NET Core', netcoreIcon, '.NET', -2, 1,
    ['Back-End Development'],
    'Backend framework for building REST APIs and web applications. Experience with middleware pipelines, dependency injection, and Entity Framework Core.',
    [
      { label: 'NuGet', iconSrc: nugetIcon },
      { label: 'Chocolatey', iconSrc: chocolateyIcon },
    ]),
  makeTech('react', 'React', reactIcon, 'React', -1, 1,
    ['Front-End Development'],
    'Primary frontend framework. Deep experience with hooks, context, component patterns, and building production UIs — this portfolio is built with React.',
    [
      { label: 'Angular', iconSrc: angularIcon },
      { label: 'Vue', iconSrc: vueIcon },
      { label: 'TypeScript', iconSrc: tsIcon },
      { label: 'JavaScript', iconSrc: jsIcon },
      { label: 'Figma', iconSrc: figmaIcon },
      { label: 'Node.js', iconSrc: nodeIcon },
      { label: 'Vite', iconSrc: viteIcon },
    ]),
  makeTech('tailwind', 'Tailwind CSS', tailwindIcon, 'Tailwind', 0, 1,
    ['Front-End Development'],
    'Go-to CSS framework for utility-first styling. Proficient with Tailwind v4, custom design tokens, and responsive design patterns — used throughout this portfolio.',
    [
      { label: 'CSS', iconSrc: cssIcon },
      { label: 'Bootstrap', iconSrc: bootstrapIcon },
      { label: 'Figma', iconSrc: figmaIcon },
    ]),

  // Indices 17-20 — frontend + monitoring (mobile r=0)
  makeTech('javascript', 'JavaScript', jsIcon, 'JavaScript', 1, 1,
    ['Front-End Development', 'Back-End Development'],
    'Core language for web development. Proficient with ES6+, async/await patterns, DOM manipulation, and Node.js runtime.',
    [
      { label: 'TypeScript', iconSrc: tsIcon },
      { label: 'React', iconSrc: reactIcon },
      { label: 'Vue', iconSrc: vueIcon },
      { label: 'Angular', iconSrc: angularIcon },
    ]),
  makeTech('typescript', 'TypeScript', tsIcon, 'TypeScript', -3, 2,
    ['Front-End Development', 'Back-End Development'],
    'Preferred over plain JavaScript. Strong typing, interfaces, generics, and type-safe design across full-stack projects — used exclusively in this portfolio.',
    [
      { label: 'React', iconSrc: reactIcon },
      { label: 'Vue', iconSrc: vueIcon },
      { label: 'Angular', iconSrc: angularIcon },
    ]),
  makeTech('prometheus', 'Prometheus', prometheusIcon, 'Prometheus', -2, 2,
    ['Monitoring & Observability'],
    'Experience setting up Prometheus for metrics collection in Kubernetes environments. Use Retina for network metrics and integrate with Grafana for visualization and alerting.',
    [
      { label: 'Retina', iconSrc: retinaIcon },
      { label: 'Alloy', iconSrc: alloyIcon },
      { label: 'ACNS', iconSrc: hubbleIcon },
      { label: 'Cilium', iconSrc: ciliumIcon },
      { label: 'eBPF', iconSrc: ebpfIcon },
    ]),
  makeTech('grafana', 'Grafana', grafanaIcon, 'Grafana', -1, 2,
    ['Monitoring & Observability'],
    'Build and maintain Grafana dashboards for cluster and application observability. Experience configuring data sources, panels, and alert rules across Prometheus and Loki.',
    [
      { label: 'Alloy', iconSrc: alloyIcon },
      { label: 'Loki', iconSrc: lokiIcon },
      { label: 'Prometheus', iconSrc: prometheusIcon },
      { label: 'ACNS', iconSrc: hubbleIcon },
    ]),

  // Index 21 — AI tooling (mobile r=1)
  makeTech('claude', 'Claude AI', claudeIcon, 'Claude', 0, 2,
    ['Miscellaneous'],
    'Daily AI collaborator for development, architecture decisions, and complex problem-solving. Use Claude Code as a CLI-driven coding agent — leveraging subagents, skills, and hooks to automate multi-step workflows directly in the terminal.',
    [
      { label: 'Claude Code', iconSrc: clawdIcon },
      { label: 'CLAUDE.md', iconSrc: claudeIcon },
      { label: 'Subagents', iconSrc: subagentIcon },
      { label: 'Skills', iconSrc: skillIcon },
      { label: 'MCP', iconSrc: mcpIcon },
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
    <img src={sub.iconSrc} alt={sub.label} className="w-5 h-5 sm:w-6 sm:h-6 object-contain rounded shrink-0" />
  ) : (
    <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded bg-blue-medium-1/20 text-text-1 shrink-0 select-none"
      style={{ fontSize: '9px', fontWeight: 700, lineHeight: 1 }}>
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
        className="flex items-center gap-2 bg-white/60 border border-blue-medium-2/50 rounded-full px-3 py-1.5
          cursor-pointer hover:bg-white/90 hover:border-blue-medium-2 hover:shadow-sm transition-all"
      >
        {icon}
        <span className="font-sans text-text-1 text-sm leading-none">{sub.label}</span>
        <span className="font-sans text-blue-medium-2 text-xs leading-none opacity-90 ml-0.5">↗</span>
      </a>
    )
  }

  return (
    <div className="flex items-center gap-2 bg-white/60 border border-blue-medium-1/30 rounded-full px-3 py-1.5 hover:bg-white/80 transition-colors">
      {icon}
      <span className="font-sans text-text-1 text-sm leading-none">{sub.label}</span>
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
                className="relative w-full h-full object-contain rounded-md"
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
              <div className="flex flex-wrap gap-2">
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
                <div className="flex flex-wrap gap-2">
                  {displayTech!.subTech.map((sub) => (
                    <SubTechChip key={sub.label} sub={sub} />
                  ))}
                </div>
              </div>
            )}
            <div className="flex flex-wrap gap-2 mt-1">
              {displayTech!.categories.map((cat) => (
                <span key={cat} className="bg-blue-medium-1/20 text-text-1 text-sm font-sans px-3 py-1 rounded-full">
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
  const closingRef = useRef(false)
  const [isPortrait, setIsPortrait] = useState(() => window.matchMedia('(orientation: portrait)').matches)

  const animateClose = useCallback(() => {
    if (closingRef.current) return
    closingRef.current = true
    setVisible(false)
    setTimeout(onClose, 300)
  }, [onClose])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const fab = document.getElementById('nav-fab')
    if (fab) fab.style.display = 'none'
    requestAnimationFrame(() => setVisible(true))
    return () => {
      document.body.style.overflow = ''
      if (fab) fab.style.display = ''
    }
  }, [])

  useEffect(() => {
    const mql = window.matchMedia('(orientation: portrait)')
    const handler = (e: MediaQueryListEvent) => setIsPortrait(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    const el = overlayRef.current
    el?.focus()
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') animateClose()
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
  }, [animateClose])

  /* Shared content block — education vs tech detail */
  const modalContent = tech.id === 'education' ? (
    <>
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
      <p className="font-sans text-text-1 text-base leading-relaxed">{tech.description}</p>
      {tech.subTech && tech.subTech.length > 0 && (
        <div className="flex flex-col gap-2">
          <h4 className="font-sans font-semibold text-text-1 text-xs uppercase tracking-widest opacity-50">
            Related
          </h4>
          <div className="flex flex-wrap gap-2">
            {tech.subTech.map((sub) => (
              <SubTechChip key={sub.label} sub={sub} />
            ))}
          </div>
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        {tech.categories.map((cat) => {
          const isActive = activeFilters.has(cat)
          return (
            <button
              key={cat}
              onClick={() => { onToggleFilter(cat); animateClose() }}
              className={`text-sm font-sans px-3 py-1.5 rounded-full border cursor-pointer
                transition-all duration-150 active:scale-95
                ${isActive
                  ? 'bg-blue-medium-1 border-blue-medium-2 text-text-1 font-semibold ring-2 ring-blue-medium-2/30'
                  : 'bg-blue-medium-1/20 border-blue-medium-1/40 text-text-1 hover:bg-blue-medium-1/40 hover:border-blue-medium-1/70'
                }`}
            >
              {cat}
            </button>
          )
        })}
      </div>
    </>
  )

  const closeButton = (
    <button
      onClick={animateClose}
      className="bg-transparent border-2 border-text-1 rounded-full
        px-8 py-3 shadow-md
        font-sans font-semibold text-text-1 text-base tracking-wider
        hover:bg-text-1 hover:text-cream-neutral hover:shadow-xl hover:scale-105
        active:scale-95
        transition-all duration-300 ease-out cursor-pointer"
    >
      Close
    </button>
  )

  return (
    <div
      ref={overlayRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label={tech.label}
      className={`fixed inset-0 z-50 flex flex-col
        backdrop-blur-md bg-white/70 overflow-hidden
        outline-none transition-opacity duration-300
        ${isPortrait ? 'justify-end' : 'items-center p-6'}
        ${visible ? 'opacity-100' : 'opacity-0'}`}
      style={isPortrait ? undefined : { paddingTop: 'calc(var(--nav-h, 80px) + 1.5rem)' }}
      onClick={animateClose}
    >
      {isPortrait ? (
        /* ── Portrait: bottom sheet ── */
        <div
          className={`flex flex-col w-full h-full
            bg-blue-neutral/60
            transition-transform duration-300 ease-out
            ${visible ? 'translate-y-0' : 'translate-y-full'}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header: icon + title */}
          <div className="flex items-center gap-4 px-6 pt-4 pb-4 shrink-0">
            <img
              className="w-10 h-10 object-contain rounded-md shrink-0"
              alt={tech.label}
              src={tech.iconSrc}
            />
            <h3 className="font-sans font-extrabold text-text-1 text-xl">
              {tech.id === 'education' ? 'My Education' : tech.label}
            </h3>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 min-h-0 overflow-y-auto px-6 flex flex-col gap-4">
            {modalContent}
          </div>

          {/* Close — pinned at bottom */}
          <div className="shrink-0 flex justify-center px-6 py-5">
            {closeButton}
          </div>
        </div>
      ) : (
        /* ── Landscape: two-column grid ── */
        <div
          className={`grid grid-cols-[2fr_1fr] items-center gap-10
            w-full flex-1 min-h-0 px-6 sm:px-12 md:px-20
            transition-all duration-300 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Text — left column */}
          <div className="flex flex-col gap-4 w-full min-w-0 min-h-0 max-h-full overflow-y-auto py-2">
            {tech.id !== 'education' && (
              <h3 className="font-sans font-extrabold text-text-1 text-xl">{tech.label}</h3>
            )}
            {modalContent}
          </div>

          {/* Hex badge + close — right column */}
          <div className="flex flex-col items-center justify-center gap-10">
            <div className="flex items-center justify-center
                            cursor-default transition-transform duration-200 ease-out hover:scale-105">
              <TechBadge
                icon={<img className="relative w-full h-full object-contain rounded-md" alt={tech.label} src={tech.iconSrc} />}
                name={tech.label}
                hexSize={{ x: 120, y: 120 }}
              />
            </div>
            {closeButton}
          </div>
        </div>
      )}
    </div>
  )
}

// --- Mobile portrait hex layout ---
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
//   r= 1 (1): claude

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
  // Row r=1 (1): claude
  { q: -1, r: 1 },
]

// --- Mobile landscape hex layout ---
// 6-5-6-5 = 22 tiles across 4 rows (r=-2 to r=1)
// Max 6 wide — wider and shorter to fit landscape viewports.
// All rows satisfy the centering invariant: q_left + q_right + r = -1
// Tiles are remapped in technologies[] array order (index 0–21).
//
//   r=-2 (6): education, figma, github, aws, amplify, python
//   r=-1 (5): sql, docker, linux, kubernetes, helm
//   r= 0 (6): azure_devops, azure_cloud, csharp, netcore, react, tailwind
//   r= 1 (5): javascript, typescript, prometheus, grafana, claude
//
// Grouping: info+cloud top row, devops core second, backend+frontend third,
// frontend+monitoring bottom. High-affinity pairs adjacent:
// aws↔amplify, docker↔linux↔kubernetes, kubernetes↔helm,
// csharp↔netcore, react↔tailwind, javascript↔typescript, prometheus↔grafana

const landscapeMobileGridPositions: { q: number; r: number }[] = [
  // Row r=-2 (6): education, figma, github, aws, amplify, python
  { q: -2, r: -2 }, { q: -1, r: -2 }, { q: 0, r: -2 }, { q: 1, r: -2 }, { q: 2, r: -2 }, { q: 3, r: -2 },
  // Row r=-1 (5): sql, docker, linux, kubernetes, helm
  { q: -2, r: -1 }, { q: -1, r: -1 }, { q: 0, r: -1 }, { q: 1, r: -1 }, { q: 2, r: -1 },
  // Row r=0 (6): azure_devops, azure_cloud, csharp, netcore, react, tailwind
  { q: -3, r: 0 }, { q: -2, r: 0 }, { q: -1, r: 0 }, { q: 0, r: 0 }, { q: 1, r: 0 }, { q: 2, r: 0 },
  // Row r=1 (5): javascript, typescript, prometheus, grafana, claude
  { q: -3, r: 1 }, { q: -2, r: 1 }, { q: -1, r: 1 }, { q: 0, r: 1 }, { q: 1, r: 1 },
]

// --- Main component ---

export function Technologies(): React.JSX.Element {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [activeFilters, setActiveFilters] = useState<Set<CategoryName>>(new Set())
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 1280)
  const [isCompactGrid, setIsCompactGrid] = useState(false)
  const [isLandscapeCompact, setIsLandscapeCompact] = useState(false)

  useEffect(() => {
    const orientationMql = window.matchMedia('(orientation: landscape)')

    const check = () => {
      const width = window.innerWidth
      const isLandscape = orientationMql.matches

      setIsMobile(width < 1280)

      if (isLandscape && width < 1024) {
        // Landscape mobile/tablet — use wide 6-5-6-5 layout
        setIsCompactGrid(false)
        setIsLandscapeCompact(true)
      } else if (!isLandscape && width < 768) {
        // Portrait mobile — use tall 3-4-3-4-3-4-1 layout
        setIsCompactGrid(true)
        setIsLandscapeCompact(false)
      } else {
        // Desktop / large tablet — use 4-5-4-5-4 diamond
        setIsCompactGrid(false)
        setIsLandscapeCompact(false)
      }
    }

    check()
    window.addEventListener('resize', check)
    orientationMql.addEventListener('change', check)
    return () => {
      window.removeEventListener('resize', check)
      orientationMql.removeEventListener('change', check)
    }
  }, [])

  const displayHexes = useMemo(() => {
    if (isLandscapeCompact) {
      return technologies.map((tech, i) => ({
        ...tech,
        q: landscapeMobileGridPositions[i].q,
        r: landscapeMobileGridPositions[i].r,
      }))
    }
    if (isCompactGrid) {
      return technologies.map((tech, i) => ({
        ...tech,
        q: mobileGridPositions[i].q,
        r: mobileGridPositions[i].r,
      }))
    }
    return technologies
  }, [isCompactGrid, isLandscapeCompact])

  const fadedIds = useMemo(() => {
    if (activeFilters.size === 0) return new Set<string>()
    const faded = new Set<string>()
    for (const tech of displayHexes) {
      const matchesAny = tech.categories.some((cat) => activeFilters.has(cat))
      if (!matchesAny) faded.add(tech.id)
    }
    return faded
  }, [activeFilters, displayHexes])

  const categoryCounts = useMemo(() => {
    const counts = {} as Record<CategoryName, number>
    for (const cat of categoryDefs) counts[cat.name] = 0
    for (const tech of technologies) {
      for (const cat of tech.categories) counts[cat]++
    }
    return counts
  }, [])

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

      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 w-full max-w-7xl">
        {/* Left: Filters + Hex Grid */}
        <div className="flex flex-col items-center gap-4 flex-1">
          <div className="flex flex-col items-center gap-2">
            <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl px-4">
              {categoryDefs.map((cat) => {
                const isActive = activeFilters.has(cat.name)
                return (
                  <button
                    key={cat.name}
                    onClick={(e) => { e.stopPropagation(); toggleFilter(cat.name) }}
                    className={`flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5
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
                    {isActive && (
                      <span className="text-text-1 text-xs leading-none">✓</span>
                    )}
                    <span className={`font-sans text-xs sm:text-sm tracking-wide whitespace-nowrap
                      ${isActive ? 'font-semibold text-text-1' : 'font-medium text-text-1'}`}>
                      {cat.displayName}
                    </span>
                    <span className={`font-sans text-[10px] leading-none tabular-nums
                      ${isActive ? 'text-text-1/70' : 'text-text-1/40'}`}>
                      {categoryCounts[cat.name]}
                    </span>
                  </button>
                )
              })}
              {activeFilters.size > 0 && (
                <button
                  onClick={(e) => { e.stopPropagation(); setActiveFilters(new Set()); setSelectedId(null) }}
                  className="flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5
                    bg-transparent border-text-1/20 text-text-1/50
                    rounded-full border-1.5 sm:border-2
                    hover:border-text-1/50 hover:text-text-1/80 hover:scale-105
                    active:scale-95
                    transition-all duration-200 ease-out cursor-pointer"
                >
                  <span className="font-sans text-xs sm:text-sm">✕</span>
                  <span className="font-sans text-xs sm:text-sm whitespace-nowrap">
                    Clear{activeFilters.size > 1 ? ` (${activeFilters.size})` : ''}
                  </span>
                </button>
              )}
            </div>
            <p className="font-sans text-xs text-text-1/40 tracking-wide select-none">
              {activeFilters.size === 0
                ? 'Select multiple to combine · Click any tile to learn more'
                : 'Click any tile to learn more'}
            </p>
          </div>

          <div className="flex justify-center">
            <HexGrid
              hexes={displayHexes}
              size={75}
              fadedIds={fadedIds}
              onSelect={handleSelect}
              onReturn={handleReturn}
              initialSelectedId={isMobile ? undefined : "education"}
              animateSelection={!isMobile}
              externalSelectedId={selectedId}
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
