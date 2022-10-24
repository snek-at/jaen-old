import {GatsbyBrowser} from 'gatsby'
import React from 'react'

import {internal} from '@snek-at/jaen'

const {GatsbyRootWrapper, GatsbyPageWrapper} = internal

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({
  element,
  pathname
}) => {
  return <GatsbyRootWrapper>{element}</GatsbyRootWrapper>
}

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({
  element,
  props
}) => {
  return <GatsbyPageWrapper path={props.path}>{element}</GatsbyPageWrapper>
}
