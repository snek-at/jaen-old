import {createContext, useContext} from 'react'

export const IncomingBuildCheckerContext = createContext<
  | {
      isIncomingBuild: boolean
      isDisabled: boolean
      onOpenAlert: () => void
    }
  | undefined
>(undefined)

export const useIncomingBuildChecker = () => {
  const context = useContext(IncomingBuildCheckerContext)

  if (context === undefined) {
    throw new Error(
      'useIncomingBuildChecker must be within IncomingBuildCheckerProvider'
    )
  }

  return context
}
