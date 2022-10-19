import {GatsbyBrowser} from 'gatsby'
import React from 'react'

import {internal} from './dist/index.js'

const {GatsbyRootWrapper, GatsbyPageWrapper} = internal

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({
  element
}) => {
  return <GatsbyRootWrapper>{element}</GatsbyRootWrapper>
}

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({element}) => {
  return <GatsbyPageWrapper>{element}</GatsbyPageWrapper>
}