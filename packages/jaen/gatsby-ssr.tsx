import {GatsbySSR} from 'gatsby'
import React from 'react'

import {internal} from './dist/index.js'

const {GatsbyRootWrapper, GatsbyPageWrapper} = internal

export const wrapRootElement: GatsbySSR['wrapRootElement'] = ({
  element
}) => {
  return <GatsbyRootWrapper>{element}</GatsbyRootWrapper>
}

export const wrapPageElement: GatsbySSR['wrapPageElement'] = ({element}) => {
  return <GatsbyPageWrapper>{element}</GatsbyPageWrapper>
}
