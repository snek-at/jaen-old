import {ComponentMeta, Story} from '@storybook/react'
import React from 'react'
import {Loading as Component} from './Loading.js'
export default {
  title: 'Organisms/Loading',
  component: Component,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof Component>

type ComponentProps = React.ComponentProps<typeof Component>

// Create a template for the component
const Template: Story<ComponentProps> = args => <Component {...args} />

export const Basic: Story<ComponentProps> = Template.bind({})
