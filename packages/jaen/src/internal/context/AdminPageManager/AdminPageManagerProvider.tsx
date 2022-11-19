import {AdminPageManagerContext} from './AdminPageManager.js'

export interface AdminPageManagerProviderProps extends AdminPageManagerContext {
  children: React.ReactNode
}

export const AdminPageManagerProvider: React.FC<AdminPageManagerProviderProps> = ({
  children,
  ...contextValue
}) => {
  return (
    <AdminPageManagerContext.Provider
      value={contextValue}>
      {children}
    </AdminPageManagerContext.Provider>
  )
}
