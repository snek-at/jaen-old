import {useDisclosure} from '@chakra-ui/react'
import {useEffect} from 'react'
import {IncomingBuildAlert} from '../../components/organisms/alerts/index.js'

import {useIncomingBuild} from './useIncomingBuild.js'
import {IncomingBuildCheckerContext} from './useIncomingBuildChecker.js'

export const IncomingBuildCheckerProvider: React.FC<
  React.PropsWithChildren<{}>
> = ({children}) => {
  const {isOpen, onOpen, onClose} = useDisclosure()

  const {isIncomingBuild, isDisabled, updateToLatest} = useIncomingBuild()

  useEffect(() => {
    if (isIncomingBuild) {
      onOpen()
    }
  }, [isIncomingBuild])

  const handleUpdateConfirm = async () => {
    updateToLatest()

    return true
  }

  const {totalChanges} = useChanges()

  return (
    <IncomingBuildCheckerContext.Provider
      value={{
        isIncomingBuild,
        isDisabled,
        onOpenAlert: onOpen
      }}>
      <IncomingBuildAlert
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleUpdateConfirm}
        totalChanges={totalChanges}
      />
      {children}
    </IncomingBuildCheckerContext.Provider>
  )
}

function useChanges(): {totalChanges: any} {
  return {
    totalChanges: 0
  }
}
