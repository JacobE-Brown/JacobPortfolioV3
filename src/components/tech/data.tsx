import type { CategoryName, CategoryDef, SubTechItem, TechItem } from './types'

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
// Sub-tech icons
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
import awardIcon from '@/assets/images/misc/award.svg'

// Education documents — served from public/documents/ as static assets
const bachelorsDoc       = '/documents/Bachelors.pdf'
const cwiDoc             = '/documents/CWI.pdf'
const resumeDoc          = '/documents/Jacob Brown Resume.pdf'
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

// --- Categories ---

export const categoryDefs: CategoryDef[] = [
  { name: 'Cloud & DevOps',              displayName: 'Cloud & DevOps', icon: null },
  { name: 'Monitoring & Observability',   displayName: 'Observability',  icon: null },
  { name: 'Back-End Development',        displayName: 'Backend',        icon: null },
  { name: 'Front-End Development',       displayName: 'Frontend',       icon: null },
  { name: 'Miscellaneous',               displayName: 'Misc',           icon: null },
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
    icon: <img className="relative w-full h-full max-w-none max-h-none min-w-0 min-h-0 object-contain rounded-md" alt={alt} src={iconSrc} loading="lazy" />,
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
//   r=-2 (4):  docker      linux       kubernetes  helm
//   r=-1 (5):  aws         azure_cloud azure_devops prometheus  grafana
//   r= 0 (4):  amplify     education   python      sql
//   r= 1 (5):  csharp      netcore     react       tailwind    javascript
//   r= 2 (4):  claude      figma       github      typescript
//
// Array order is mobile-driven (see mobileGridPositions below).
// Desktop q,r are set per-item and are independent of array index.

export const technologies: TechItem[] = [
  // Indices 0-2 — DevOps core: containers + orchestration (mobile r=-5)
  makeTech('docker', 'Docker', dockerIcon, 'Docker', -1, -2,
    ['Cloud & DevOps'],
    'Daily use for containerizing applications and managing local dev environments. Comfortable writing Dockerfiles, managing images, and working within container-based workflows.',
    [
      { label: 'Docker Compose', iconSrc: dockerIcon },
      { label: 'Docker Hub',     iconSrc: dockerIcon },
      { label: 'Dockerfile',     iconSrc: dockerIcon },
      { label: 'ACR',            iconSrc: acrIcon },
    ]),
  makeTech('linux', 'Linux', linuxIcon, 'Linux', 0, -2,
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
  makeTech('kubernetes', 'Kubernetes', kubernetesIcon, 'Kubernetes', 1, -2,
    ['Cloud & DevOps'],
    'Hands-on experience deploying and managing workloads in Kubernetes clusters. Comfortable with pods, deployments, services, ingress, namespaces, and YAML resource management. Use k9s for cluster navigation and Cilium/Hubble for networking and observability.',
    [
      { label: 'kubectl',            iconSrc: kubernetesIcon },
      { label: 'k9s',                iconSrc: k9sIcon },
      { label: 'Ingress',            iconSrc: kubernetesIcon },
      { label: 'Namespaces',        iconSrc: kubernetesIcon },
      { label: 'Security Risk Mgmt', iconSrc: awardIcon, href: certManageSecurity },
    ]),

  // Indices 3-6 — cloud providers + pipelines (mobile r=-4)
  makeTech('helm', 'Helm', helmIcon, 'Helm', 2, -2,
    ['Cloud & DevOps'],
    'Use Helm to manage Kubernetes application deployments via charts. Experience writing and customizing Helm charts for repeatable, version-controlled cluster releases.',
    [
      { label: 'Helm Charts',  iconSrc: helmIcon },
      { label: 'Helmfile',     iconSrc: helmIcon },
      { label: 'Values Files', iconSrc: helmIcon },
    ]),
  makeTech('aws', 'AWS', awsIcon, 'AWS', -2, -1,
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
  makeTech('azure_cloud', 'Azure Cloud', azureCloudIcon, 'Azure Cloud', -1, -1,
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
  makeTech('azure_devops', 'Azure DevOps', azureDevOpsIcon, 'Azure DevOps', 0, -1,
    ['Cloud & DevOps'],
    'Daily use at Netacent — managing pipelines, releases, repos, and work items. Experience authoring YAML pipelines and configuring multi-stage release definitions.',
    [
      { label: 'Pipelines', iconSrc: azurePipelinesIcon },
      { label: 'Repos', iconSrc: azureReposIcon },
      { label: 'Boards', iconSrc: azureBoardsIcon },
      { label: 'Artifacts', iconSrc: azureArtifactsIcon },
      { label: 'AWS', iconSrc: awsIcon },
    ]),

  // Indices 7-9 — monitoring + education (mobile r=-3)
  makeTech('prometheus', 'Prometheus', prometheusIcon, 'Prometheus', 1, -1,
    ['Monitoring & Observability'],
    'Experience setting up Prometheus for metrics collection in Kubernetes environments. Use Retina for network metrics and integrate with Grafana for visualization and alerting.',
    [
      { label: 'Retina', iconSrc: retinaIcon },
      { label: 'Alloy', iconSrc: alloyIcon },
      { label: 'ACNS', iconSrc: hubbleIcon },
      { label: 'Cilium', iconSrc: ciliumIcon },
      { label: 'eBPF', iconSrc: ebpfIcon },
    ]),
  makeTech('grafana', 'Grafana', grafanaIcon, 'Grafana', 2, -1,
    ['Monitoring & Observability'],
    'Build and maintain Grafana dashboards for cluster and application observability. Experience configuring data sources, panels, and alert rules across Prometheus and Loki.',
    [
      { label: 'Alloy', iconSrc: alloyIcon },
      { label: 'Loki', iconSrc: lokiIcon },
      { label: 'Prometheus', iconSrc: prometheusIcon },
      { label: 'ACNS', iconSrc: hubbleIcon },
    ]),
  makeTech('education', 'My Education', educationIcon, 'Education', -1, 0,
    ['Miscellaneous'],
    'B.A. in Liberal Arts from Magdalen College and A.A.S. in Full-Stack Software Development from the College of Western Idaho. Education spanning classical liberal arts, software engineering, and industry certifications.'),

  // Indices 10-13 — cloud hosting + backend (mobile r=-2)
  makeTech('amplify', 'AWS Amplify', amplifyIcon, 'AWS Amplify', -2, 0,
    ['Cloud & DevOps'],
    'Hosting this portfolio on AWS Amplify. Experience using Amplify for CI/CD deployment pipelines, custom domains, and hosting static sites and full-stack web apps.',
    [
      { label: 'Lightsail', iconSrc: lightsailIcon },
      { label: 'WordPress', iconSrc: wordpressIcon },
    ]),
  makeTech('python', 'Python', pythonIcon, 'Python', 0, 0,
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
  makeTech('sql', 'SQL / Databases', sqlIcon, 'SQL', 1, 0,
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
  makeTech('csharp', 'C#', csharpIcon, 'C#', -3, 1,
    ['Back-End Development'],
    'Strongest backend language. Proficient in C# with ASP.NET Core, Entity Framework, LINQ, and .NET ecosystem tooling.',
    [
      { label: 'Serilog', iconSrc: serilogIcon },
      { label: 'NuGet', iconSrc: nugetIcon },
      { label: 'Chocolatey', iconSrc: chocolateyIcon },
    ]),

  // Indices 14-16 — backend + frontend (mobile r=-1)
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

  // Indices 17-20 — frontend + misc (mobile r=0)
  makeTech('javascript', 'JavaScript', jsIcon, 'JavaScript', 1, 1,
    ['Front-End Development', 'Back-End Development'],
    'Core language for web development. Proficient with ES6+, async/await patterns, DOM manipulation, and Node.js runtime.',
    [
      { label: 'TypeScript', iconSrc: tsIcon },
      { label: 'React', iconSrc: reactIcon },
      { label: 'Vue', iconSrc: vueIcon },
      { label: 'Angular', iconSrc: angularIcon },
    ]),
  makeTech('typescript', 'TypeScript', tsIcon, 'TypeScript', 0, 2,
    ['Front-End Development', 'Back-End Development'],
    'Preferred over plain JavaScript. Strong typing, interfaces, generics, and type-safe design across full-stack projects — used exclusively in this portfolio.',
    [
      { label: 'React', iconSrc: reactIcon },
      { label: 'Vue', iconSrc: vueIcon },
      { label: 'Angular', iconSrc: angularIcon },
    ]),
  makeTech('figma', 'Figma', figmaIcon, 'Figma', -2, 2,
    ['Front-End Development', 'Miscellaneous'],
    'One of my favorite tools. Use Figma for UI/UX design, prototyping, and design systems — including the design for this portfolio.',
    [
      { label: 'Claude AI', iconSrc: claudeIcon },
      { label: 'Figma Design Essentials', iconSrc: awardIcon, href: certFigmaDesign },
      { label: 'Wireframes',              iconSrc: awardIcon, href: certWireframes },
    ]),
  makeTech('github', 'GitHub', githubIcon, 'GitHub', -1, 2,
    ['Miscellaneous'],
    'Version control with Git and GitHub for collaboration, code review, and CI/CD. Proficient with branching strategies, rebasing, cherry-picking, and resolving complex merge conflicts.',
    [
      { label: 'Git',             iconSrc: githubIcon },
      { label: 'GitHub Actions', iconSrc: githubActionsIcon },
      { label: 'Azure Repos',    iconSrc: azureReposIcon },
      { label: 'Git & GitHub',   iconSrc: awardIcon, href: certGitGithub },
    ]),

  // Index 21 — AI tooling (mobile r=1)
  makeTech('claude', 'Claude AI', claudeIcon, 'Claude', -3, 2,
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

export const educationDiplomas = [
  { label: 'B.A. Liberal Arts — Magdalen College', href: bachelorsDoc },
  { label: 'A.A.S. Full-Stack Web Dev — CWI',      href: cwiDoc },
  { label: 'Resume',                                href: resumeDoc },
]

export const educationCerts: SubTechItem[] = [
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

// --- Mobile portrait hex layout ---
// 3-4-3-4-3-4-1 = 22 tiles across 7 rows (r=-5 to r=1)
// Mapped by array index:
//
//   r=-5 (3):  docker      linux       kubernetes
//   r=-4 (4):  helm        aws         azure_cloud azure_devops
//   r=-3 (3):  prometheus  grafana     education
//   r=-2 (4):  amplify     python      sql         csharp
//   r=-1 (3):  netcore     react       tailwind
//   r= 0 (4):  javascript  typescript  figma       github
//   r= 1 (1):  claude

export const mobileGridPositions: { q: number; r: number }[] = [
  // Row r=-5 (3): docker, linux, kubernetes
  { q: 1, r: -5 }, { q: 2, r: -5 }, { q: 3, r: -5 },
  // Row r=-4 (4): helm, aws, azure_cloud, azure_devops
  { q: 0, r: -4 }, { q: 1, r: -4 }, { q: 2, r: -4 }, { q: 3, r: -4 },
  // Row r=-3 (3): prometheus, grafana, education
  { q: 0, r: -3 }, { q: 1, r: -3 }, { q: 2, r: -3 },
  // Row r=-2 (4): amplify, python, sql, csharp
  { q: -1, r: -2 }, { q: 0, r: -2 }, { q: 1, r: -2 }, { q: 2, r: -2 },
  // Row r=-1 (3): netcore, react, tailwind
  { q: -1, r: -1 }, { q: 0, r: -1 }, { q: 1, r: -1 },
  // Row r=0 (4): javascript, typescript, figma, github
  { q: -2, r: 0 }, { q: -1, r: 0 }, { q: 0, r: 0 }, { q: 1, r: 0 },
  // Row r=1 (1): claude
  { q: -1, r: 1 },
]

// --- Mobile landscape hex layout ---
// 6-5-6-5 = 22 tiles across 4 rows (r=-2 to r=1)
// Mapped by array index:
//
//   r=-2 (6):  docker  linux  kubernetes  helm  aws  azure_cloud
//   r=-1 (5):  azure_devops  prometheus  grafana  education  amplify
//   r= 0 (6):  python  sql  csharp  netcore  react  tailwind
//   r= 1 (5):  javascript  typescript  figma  github  claude

export const landscapeMobileGridPositions: { q: number; r: number }[] = [
  // Row r=-2 (6): docker, linux, kubernetes, helm, aws, azure_cloud
  { q: -2, r: -2 }, { q: -1, r: -2 }, { q: 0, r: -2 }, { q: 1, r: -2 }, { q: 2, r: -2 }, { q: 3, r: -2 },
  // Row r=-1 (5): azure_devops, prometheus, grafana, education, amplify
  { q: -2, r: -1 }, { q: -1, r: -1 }, { q: 0, r: -1 }, { q: 1, r: -1 }, { q: 2, r: -1 },
  // Row r=0 (6): python, sql, csharp, netcore, react, tailwind
  { q: -3, r: 0 }, { q: -2, r: 0 }, { q: -1, r: 0 }, { q: 0, r: 0 }, { q: 1, r: 0 }, { q: 2, r: 0 },
  // Row r=1 (5): javascript, typescript, figma, github, claude
  { q: -3, r: 1 }, { q: -2, r: 1 }, { q: -1, r: 1 }, { q: 0, r: 1 }, { q: 1, r: 1 },
]
