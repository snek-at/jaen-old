import * as React from 'react'

import {internal} from '@snek-at/jaen'

const {AdminPage} = internal

const AdminPageContainer = () => {
  return (
    <AdminPage
      views={[]}
      toolbar={{
        toolbarItems: [
          {
            label: 'Back to my site',
            onClick: () => {
              console.log('clicked')
            }
          },
          {
            label: 'Edit',
            onClick: () => {
              alert('Edit')
            }
          }, {
            label: 'Discard',
            onClick: () => {
              alert('Discard')
            }
          }, {
            label: 'Publish',
            onClick: () => {
              alert('Publish')
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
      }}
    />
  )
}

export default AdminPageContainer
