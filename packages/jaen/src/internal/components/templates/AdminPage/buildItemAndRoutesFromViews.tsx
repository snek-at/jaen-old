import { Circle, Icon } from "@chakra-ui/react"

export type SidebarItem = {
  path: string
  icon: JSX.Element
  label: string
}

export type View = {
  path: string
  label: string
  Icon: React.ComponentType | null
  Component: React.ComponentType
  group?: string
  hasRoutes?: boolean
}

export interface UseSidebarItemsProps {
  views: View[]
}

export interface BuiltViews {
  items: {
    grouped: Record<string, {label: string; items: SidebarItem[]}>
    ungrouped: SidebarItem[]
  }
  routes: {[key: string]: {Component: React.ComponentType; hasRoutes: boolean}}
  activePath: string
  onNavigate: (path: string) => void
}

export const buildFromViews = (
  views: View[]
): {
  items: BuiltViews['items']
  routes: BuiltViews['routes']
} => {
  const items: BuiltViews['items'] = {
    grouped: {},
    ungrouped: []
  }

  const routes: BuiltViews['routes'] = {}

  for (const view of views) {
    const item: SidebarItem = {
      path: view.path,
      icon: view.Icon ? <Icon as={view.Icon} boxSize='4' />: <Circle bg="teal" size='2' />,
      label: view.label
    }

    if (view.group) {
      if (!items.grouped[view.group]) {
        items.grouped[view.group] = {
          label: view.group,
          items: []
        }
      }

      items.grouped[view.group]?.items.push(item)
    } else {
      items.ungrouped.push(item)
    }

    routes[view.path] = {
      Component: view.Component,
      hasRoutes: view.hasRoutes ?? false
    }
  }

  return {
    items,
    routes
  }
}
