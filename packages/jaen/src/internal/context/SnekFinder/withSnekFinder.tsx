import { SnekFinder } from "./SnekFinder.js"

export const withSnekFinder = <P extends object>(
    Component: React.ComponentType<React.PropsWithChildren<P>>
  ): React.FC<React.PropsWithChildren<P>> => props => {
    return (
      <SnekFinder>
        <Component {...props} />
      </SnekFinder>
    )
  }
  