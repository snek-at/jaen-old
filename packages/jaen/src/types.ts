import { IGatsbyImageData } from "gatsby-plugin-image"

interface SiteMetadata {
  title: string
  description: string
  siteUrl: string
  image: string
  author: {
    name: string
  }
  organization: {
    name: string
    url: string
    logo: string
  }
  social: {
    twitter: string // twitter username
    fbAppID: string // FB ANALYTICS
  }
}

export interface Site {
  siteMetadata: Partial<SiteMetadata>
}

export interface IJaenTemplate {
  name: string
  displayName: string
  children: {
    name: string
    displayName: string
  }[]
  isRootTemplate?: boolean
}

export type IJaenFields = {
  [type: string]: {
    [name: string]: {
      position?: number
      props?: object
      value: any
    }
  }
} | null

export interface IJaenPage {
  id: string
  slug: string
  buildPath?: string
  jaenPageMetadata: {
    title: string
    isBlogPost?: boolean
    image?: string
    description?: string
    datePublished?: string
    canonical?: string
  }
  jaenFields: IJaenFields
  jaenFiles: {
    id: string
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData
    }
  }[]
  parent: {
    id: string
  } | null
  children: Array<{id: string} & Partial<IJaenPage>>
  sections: IJaenSection[]
  [customFieldName: string]: any

  /**
   * Unique identifier of the page component name (e.g. `JaenPageHome`).
   * - Must be unique across all pages.
   * - Used to determine the component to render.
   */
  template: string | null
  /**
   * Name of the component
   * Used for page loading
   */
  componentName?: string
  deleted?: boolean
  excludedFromIndex?: boolean
}

export interface IJaenSection {
  fieldName: string
  items: IJaenSectionItem[]
  ptrHead: string | null
  ptrTail: string | null
  position?: number
  props?: object
}

export type IJaenSectionItem = {
  [customFieldName: string]: any
  id: string
  type: string
  ptrPrev: string | null
  ptrNext: string | null
  jaenFields: IJaenFields
  jaenFiles: Array<{
    id: string
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData
    }
  }>

  sections?: IJaenSection[]

  deleted?: true
}