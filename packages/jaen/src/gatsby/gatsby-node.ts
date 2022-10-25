import {GatsbyNode} from 'gatsby'

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({
  actions,
  loaders,
  stage
}) => {
  if (stage === 'build-html' || stage === 'develop-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /canvas/,
            use: loaders.null()
          },
          {
            test: /filerobot-image-editor/,
            use: loaders.null()
          }
        ]
      }
    })
  }
}

export const createSchemaCustomization: GatsbyNode['onCreateWebpackConfig'] = ({
  actions
}) => {
  actions.createTypes(`
    type JaenInternal implements Node {
      finderUrl: String
    }
  `)
}

export const createPages: GatsbyNode['createPages'] = async ({actions}) => {
  const {createPage} = actions

  createPage({
    path: '/admin',
    // matchPath to ignore trailing slash
    matchPath: '/admin/*',
    component: require.resolve('../AdminPage.tsx'),
    context: {}
  })
}
