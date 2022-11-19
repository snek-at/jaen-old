import {ComponentMeta, Story} from '@storybook/react'
import React from 'react'
import {ContextMenu} from './ContextMenu.js'
export default {
  title: 'Components/ContextMenu',
  component: ContextMenu,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof ContextMenu>

type ComponentProps = React.ComponentProps<typeof ContextMenu>

// Create a template for the component
const Template: Story<ComponentProps> = args => <ContextMenu {...args} />

export const Basic: Story<ComponentProps> = Template.bind({})

export const Multiple: Story<ComponentProps> = () => {
  return (
    <div>
      <ContextMenu />
      <ContextMenu />
    </div>
  )
}
