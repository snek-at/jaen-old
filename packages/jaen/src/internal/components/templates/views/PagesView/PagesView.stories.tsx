import {ComponentMeta, Story} from '@storybook/react'
import React from 'react'
import {AdminPageManagerProvider} from '../../../../context/AdminPageManager/AdminPageManagerProvider.js'
import {PagesView} from './PagesView.js'
export default {
  title: 'templates/views/PagesView',
  component: PagesView,
  parameters: {
    layout: 'fullscreen'
  },
  decorators: [
    Story => (
      <AdminPageManagerProvider
        onCreate={() => ({
          payload: {},
          type: ''
        })}
        onDelete={() => {}}
        onMove={() => {}}
        onUpdate={() => {}}
        onGet={() => null}
        onNavigate={() => {}}
        pageTree={{}}
        templates={[]}
        isTemplatesLoading={false}
        rootPageId=""
        onToggleCreator={() => {}}>
        <Story />
      </AdminPageManagerProvider>
    )
  ]
} as ComponentMeta<typeof PagesView>

type ComponentProps = React.ComponentProps<typeof PagesView>

// Create a template for the component
const Template: Story<ComponentProps> = args => <PagesView {...args} />

export const Basic: Story<ComponentProps> = Template.bind({})
