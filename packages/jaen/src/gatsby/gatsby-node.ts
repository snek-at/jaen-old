import {GatsbyNode} from 'gatsby'

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
