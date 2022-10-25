import {ComponentMeta, Story} from '@storybook/react'
import React from 'react'
import {FaEye, FaPager} from "react-icons/fa"
import {BiCog, BiNotification} from "react-icons/bi"
import { BsFiles, BsHouse } from 'react-icons/bs'


import {default as AdminPage} from './AdminPage.js'
import {LoadingAdminPage} from './LoadingAdminPage.js'
export default {
  title: 'templates/AdminPage',
  component: AdminPage,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof AdminPage>

type ComponentProps = React.ComponentProps<typeof AdminPage>

// Create a template for the component
const Template: Story<ComponentProps> = args => <AdminPage {...args} />

export const Basic: Story<ComponentProps> = Template.bind({})

Basic.args = {
  views: [
    {
      path: '/',
      Component: () => <div>Home</div>,
      label: 'Dashboard',
      Icon: BsHouse
    },
    {
      path: '/pages',
      Component: () => <div>Pages</div>,
      label: 'Pages',
      group: 'Your Site',
      Icon: FaPager
    },
    {
      path: '/files',
      Component: () => <div>Files</div>,
      label: 'Files',
      group: 'Your Site',
      Icon: BsFiles
    },
    {
      path: '/notifications',
      Component: () => <div>Notifications</div>,
      label: 'Notifications',
      group: 'Your Site',
      Icon: BiNotification
    },
    {
      path: '/settings',
      Component: () => <div>Settings</div>,
      label: 'Settings',
      group: 'Your Site',
      Icon: BiCog
    }
  ],
  toolbar: {
    toolbarItems: [
      {
        label: 'Back to my site',
        leftIcon: <FaEye />,
        onClick: () => {
          console.log('clicked')
        }
      }
    ],
    logoText: 'Jaen Admin',
    userMenu: {
      user: {
        name: 'Nico Schett',
        email: 'schett@snek.at',
        imageSrc:
          'https://avatars.githubusercontent.com/u/125676?s=460&u=3d4d1c8b0f0f8b0c8c8c8c8c8c8c8c8c8c8c8c8c&v=4'
      },
      showNotification: true,
      menuItems: [
        {
          label: 'Landing Page',
          onClick: () => {
            console.log('clicked')
          },
          divider: true
        },
        {
          label: 'Logout',
          onClick: () => {
            console.log('clicked')
          }
        }
      ]
    }
  }
}

export const Loading: Story = () => {
  return <LoadingAdminPage heading='Welcome to Jaen Admin' />
} 
