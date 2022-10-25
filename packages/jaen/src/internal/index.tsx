import {ChakraProvider} from '@chakra-ui/react'
import {navigate} from 'gatsby'
import {ActivationButton} from './components/index.js'
import {IncomingBuildCheckerProvider} from './context/IncomingBuildChecker/index.js'
import {SnekFinder} from './context/SnekFinder/index.js'

export {useIncomingBuildChecker} from './context/IncomingBuildChecker/index.js'

export {AdminPage} from './components/index.js'

export * as views from './views/index.js'

export interface WrapperProps {
  children: React.ReactNode
  ssr?: boolean
}

export const GatsbyRootWrapper: React.FC<WrapperProps> = ({
  children,
  ssr = false
}) => {
  console.log(`GatsbyRootWrapper`, {ssr})

  return (
    <ChakraProvider resetCSS={true}>
      <IncomingBuildCheckerProvider>{children}</IncomingBuildCheckerProvider>
    </ChakraProvider>
  )
}

export interface PageWrapperProps extends WrapperProps {
  path: string
}

export const GatsbyPageWrapper: React.FC<PageWrapperProps> = ({
  children,
  path
}) => {
  const isOnAdminPage = path.startsWith('/admin')

  const handleActivationButtonClick = () => {
    navigate('/admin')
  }

  let Wrapper = () => {
    return (
      <>
        {!isOnAdminPage && (
          <ActivationButton onClick={handleActivationButtonClick} />
        )}
        {children}
      </>
    )
  }

  if (isOnAdminPage) {
    return (
      <SnekFinder>
        <Wrapper />
      </SnekFinder>
    )
  }

  return <Wrapper />
}
