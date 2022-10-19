import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import type { IJaenState } from '../types.js'

export const statusInitialState: IJaenState['status'] = {
  isPublishing: false
}

const statusSlice = createSlice({
  name: 'status',
  initialState: statusInitialState,
  reducers: {
    setPublishing: (state, action: PayloadAction<boolean>) => {
      state.isPublishing = action.payload
    }
  }
})

export const {setPublishing} = statusSlice.actions
export default statusSlice.reducer