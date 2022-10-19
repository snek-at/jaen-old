import {Site} from '../../types.js'
import type {IUser} from '@snek-at/snek-api-client'

export interface IJaenState {
  auth: {
    isAuthenticated: boolean
    user: IUser | null
  }
  site: Site
  status: {
    isPublishing: boolean
  }
}
