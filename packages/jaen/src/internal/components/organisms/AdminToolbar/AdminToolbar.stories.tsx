import {ComponentMeta, Story} from '@storybook/react'
import React from 'react'
import {FaEye} from 'react-icons/fa'
import {AdminToolbar} from './AdminToolbar.js'
export default {
  title: 'organisms/AdminToolbar',
  component: AdminToolbar,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof AdminToolbar>

type ComponentProps = React.ComponentProps<typeof AdminToolbar>

// Create a template for the component
const Template: Story<ComponentProps> = args => <AdminToolbar {...args} />

export const Basic: Story<ComponentProps> = Template.bind({})

Basic.args = {
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
