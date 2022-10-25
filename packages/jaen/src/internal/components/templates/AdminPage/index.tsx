import * as React from 'react'
import {isSSR} from '../../../../utils/isSSR.js'
import {LoadingAdminPage} from './LoadingAdminPage.js'

const LazyAdminPage = React.lazy(() => import('./AdminPage.js'))

export type AdminPageProps = React.ComponentProps<typeof LazyAdminPage>

export const AdminPage: React.FC<AdminPageProps> = (props) => {
  // AdminPage has a dependency on the `window` object, so we need to
  // check if we're in a browser environment before rendering it.
  

  return (
    <React.Suspense fallback={<LoadingAdminPage />}>
      {!isSSR() ? <LazyAdminPage {...props} /> : <LoadingAdminPage />}
    </React.Suspense>
  )
}
