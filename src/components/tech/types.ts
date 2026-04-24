import type { ReactNode } from 'react'

export type CategoryName =
  | 'Front-End Development'
  | 'Back-End Development'
  | 'Cloud & DevOps'
  | 'Monitoring & Observability'
  | 'Miscellaneous'

export interface CategoryDef {
  name: CategoryName
  displayName: string
  icon: string | null
}

export interface SubTechItem {
  label: string
  iconSrc: string | null
  href?: string
}

export interface TechItem {
  id: string
  label: string
  iconSrc: string
  icon: ReactNode
  q: number
  r: number
  description: string
  categories: CategoryName[]
  subTech?: SubTechItem[]
}
