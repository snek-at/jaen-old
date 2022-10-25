import {Box, Flex, Spacer, Stack, Text} from '@chakra-ui/react'
import * as React from 'react'
import {Outlet, Route, Routes, useNavigate} from 'react-router-dom'

import {isSSR} from '../../../../utils/isSSR.js'

import {NavGroup, NavItem} from '../../molecules/index.js'
import {BuiltViews} from './buildItemAndRoutesFromViews.js'
import {withAdminRouting} from './withAdminRouting.js'
import {AdminToolbar, AdminToolbarProps} from '../../organisms/index.js'

export interface AdminPageProps {
  items: BuiltViews['items']
  activePath: string | null
  toolbar: AdminToolbarProps
  children: React.ReactNode
  onNavigate: (path: string) => void
}

const AdminPage: React.FC<AdminPageProps> = ({
  items,
  activePath,
  toolbar,
  children,
  onNavigate
}) => {
  console.log('AdminPage', {items, toolbar, activePath, children, onNavigate})

  return (
    <Box height="100vh" overflow="hidden" position="relative">
      <AdminToolbar {...toolbar} />
      <Flex h="calc(100vh - 54px)" id="app-container">
        <Box w="64" bg="gray.900" color="white" fontSize="sm">
          <Flex h="100%" direction="column" px="4" py="4">
            <Stack spacing="8" flex="1">
              <Stack spacing="1">
                {items.ungrouped.map(item => (
                  <NavItem
                    active={item.path === activePath}
                    key={item.path}
                    icon={item.icon}
                    label={item.label}
                    onClick={() => onNavigate(item.path)}
                  />
                ))}
              </Stack>

              {Object.entries(items.grouped).map(([key, group]) => (
                <NavGroup key={key} label={group.label}>
                  {group.items.map(item => (
                    <NavItem
                      active={item.path === activePath}
                      key={item.path}
                      icon={item.icon}
                      label={item.label}
                      onClick={() => onNavigate(item.path)}
                    />
                  ))}
                </NavGroup>
              ))}
            </Stack>

            <Spacer />
            <Text w={'full'} textAlign="center">
              "Powered by SNEK 1.1.1"
            </Text>
          </Flex>
        </Box>
        <Box bg={'gray.50'} w="100%" h="100%" overflowY="hidden">
          <Box rounded="lg" bg="white" m="4" p="6">
            {children}
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}

export default withAdminRouting<{
  toolbar: AdminPageProps['toolbar']
}>(({routes, items, toolbar}) => {
  console.log(`withAdminRouting`, items, routes)
  const activePath = !isSSR() ? window.location.hash.replace('#', '') : null

  const routerNavigate = useNavigate()

  const onNavigate = React.useCallback((path: string) => {
    routerNavigate(path)
  }, [])

  return (
    <Routes>
      <Route
        element={
          <AdminPage
            items={items}
            activePath={activePath}
            toolbar={toolbar}
            onNavigate={onNavigate}>
            <Outlet />
          </AdminPage>
        }>
        {Object.entries(routes).map(([path, {Component, hasRoutes}]) => {
          if (hasRoutes) {
            path = `${path}/*`
          }

          return <Route key={path} path={path} element={<Component />} />
        })}

        <Route key='404' path="*" element={<p>There's nothing here: 404!</p>} />
      </Route>
    </Routes>
  )
})
