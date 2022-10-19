import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { IJaenState } from '../types.js'

export type Site = IJaenState['site']

export const siteInitialState: IJaenState['site'] = {
  siteMetadata: {}
}

const siteSlice = createSlice({
  name: 'site',
  initialState: siteInitialState,
  reducers: {
    updateSiteMetadata: (
      state,
      action: PayloadAction<Site>
    ) => {
      state.siteMetadata = {
        ...state.siteMetadata,
        ...action.payload
      }
    }
  }
})

export const {updateSiteMetadata} = siteSlice.actions
export default siteSlice.reducer