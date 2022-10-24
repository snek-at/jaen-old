import type {GatsbyConfig as GatsbyConfigType} from 'gatsby'

import {JaenData} from '../utils/JaenData.js'

const jaenData = new JaenData({jaenDataDir: './jaen-data'})

const internalJaenData = jaenData.internal

const GatsbyConfig: GatsbyConfigType = {
  jsxRuntime: 'automatic',
  jsxImportSource: '@emotion/react',
  siteMetadata: internalJaenData?.site.siteMetadata
}

GatsbyConfig.plugins = [
  {
    resolve: `gatsby-plugin-compile-es6-packages`,
    options: {
      modules: [
        `@chakra-ui/gatsby-plugin`,
      ]
    }
  },
  'gatsby-plugin-react-helmet-async',
  {
    resolve: `gatsby-plugin-sharp`,
    options: {
      defaults: {
        formats: [`auto`, `webp`],
        placeholder: `dominantColor`,
        quality: 50,
        breakpoints: [750, 1080, 1366, 1920],
        backgroundColor: `transparent`,
        tracedSVGOptions: {},
        blurredOptions: {},
        jpgOptions: {},
        pngOptions: {},
        webpOptions: {},
        avifOptions: {}
      }
    }
  },
  `gatsby-transformer-sharp`,
  `gatsby-plugin-image`
]

export default GatsbyConfig
