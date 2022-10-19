import {IncomingBuildCheckerProvider} from './context/IncomingBuildChecker/index.js'

export interface WrapperProps {
  children: React.ReactNode
  ssr?: boolean
}

export const GatsbyRootWrapper: React.FC<WrapperProps> = ({
  children,
  ssr = false
}) => {
  console.log(`GatsbyRootWrapper2`, {ssr})

  return <IncomingBuildCheckerProvider>{children}</IncomingBuildCheckerProvider>
}

export const GatsbyPageWrapper: React.FC<WrapperProps> = ({
  children,
  ssr = false
}) => {
  console.log(ssr)

  return <>{children}</>
}
