import {ComponentMeta, Story} from '@storybook/react'
import React from 'react'
import {PageTree} from './PageTree.js'
export default {
  title: 'Components/PageTree',
  component: PageTree,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof PageTree>

type ComponentProps = React.ComponentProps<typeof PageTree>

// Create a template for the component
const Template: Story<ComponentProps> = args => <PageTree {...args} />

export const Basic: Story<ComponentProps> = Template.bind({})
