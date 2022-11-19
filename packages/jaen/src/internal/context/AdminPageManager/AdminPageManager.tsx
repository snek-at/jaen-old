import React from 'react'
import {IJaenPage, IJaenTemplate} from '../../../types.js'

export interface PageTreeItems {
  [id: string]: {
    data: {
      title: string
      slug: string
      template: Omit<IJaenTemplate, 'children'> | null
      deleted?: true
    }
    isRootItem?: true
    children: string[]
    parent: string | null
  }
}

export interface PageCreateValues {
  slug: string
  title: string
  template: Omit<IJaenTemplate, 'children'>
}

export type ContentValues = {
  title: string
  slug: string
  image?: string
  description?: string
  excludedFromIndex?: boolean
}

export interface AdminPageManagerContext {
  onCreate: (
    parentId: string | null,
    values: PageCreateValues
  ) => {
    payload: Partial<IJaenPage> & {
      id?: string | undefined
      fromId?: string | undefined
    }
    type: string
  }
  onDelete: (id: string) => void
  onMove: (
    id: string,
    oldParentId: string | null,
    newParentId: string | null
  ) => void
  onUpdate: (id: string, values: ContentValues) => void
  onGet: (id: string) => IJaenPage | null
  onNavigate: (id: string) => void
  pageTree: PageTreeItems
  templates: IJaenTemplate[]
  isTemplatesLoading: boolean
  rootPageId: string
  onToggleCreator: (parentId: string | null) => void
}

export const AdminPageManagerContext =
  React.createContext<AdminPageManagerContext | undefined>(undefined)
