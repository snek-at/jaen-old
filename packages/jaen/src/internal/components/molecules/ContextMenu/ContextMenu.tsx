import {Button, Menu, MenuItem, MenuList, useMenuButton} from '@chakra-ui/react'
import React, {useState} from 'react'

export interface ContextMenuProps {
  children: React.ReactNode
}

const ContextMenuContext =
  React.createContext<
    | {
        isOpen: boolean
        onOpen: (e: React.MouseEventHandler) => void
        onClose: () => void
      }
    | undefined
  >(undefined)

export const ContextMenu: React.FC<ContextMenuProps> = props => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Menu
      isOpen={isOpen}
      onClose={() => {
        setIsOpen(false)
      }}>
      <Button
        onContextMenu={e => {
          e.preventDefault()
          setIsOpen(true)

          const menu = document.querySelector('[role=menu]')

          const popper = menu.parentElement

          const x = e.clientX
          const y = e.clientY

          Object.assign(popper.style, {
            top: `${y}px`,
            left: `${x}px`
          })
        }}>
        Right click to open
      </Button>
      <MenuList
        onAnimationEnd={e => {
          const menu = document.querySelector('[role=menu]')
          menu.focus()
        }}>
        <MenuItem>Download</MenuItem>
        <MenuItem>Create a Copy</MenuItem>
        <MenuItem>Mark as Draft</MenuItem>
        <MenuItem>Delete</MenuItem>
        <MenuItem>Attend a Workshop</MenuItem>
      </MenuList>
    </Menu>
  )
}
