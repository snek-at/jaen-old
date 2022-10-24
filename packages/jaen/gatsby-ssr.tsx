import {GatsbySSR} from 'gatsby'
import React from 'react'

import {internal} from './dist/index.js'

const {GatsbyRootWrapper, GatsbyPageWrapper} = internal

export const wrapRootElement: GatsbySSR['wrapRootElement'] = ({element}) => {
  return <GatsbyRootWrapper ssr>{element}</GatsbyRootWrapper>
}

export const wrapPageElement: GatsbySSR['wrapPageElement'] = ({
  element,
  props
}) => {
  return <GatsbyPageWrapper path={props.path} ssr>{element}</GatsbyPageWrapper>
}
