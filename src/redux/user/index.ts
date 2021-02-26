import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { LoadingStatus, ErrorStatus } from '../currentTypes'
import { UserType } from '../users/types'
import { StateType } from './types'

const { actions, reducer } = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loading: LoadingStatus.NEVER,
    error: null,
  } as StateType,
  reducers: {
    setUser(state: StateType, { payload }: PayloadAction<UserType>) {
      state.user = payload
      state.loading = LoadingStatus.LOADED
    },
    setUserLoadingStatus(
      state: StateType,
      { payload }: PayloadAction<LoadingStatus>
    ) {
      state.loading = payload
    },
    setUserErrorStatus(
      state: StateType,
      { payload }: PayloadAction<ErrorStatus>
    ) {
      state.error = payload
    },
  },
})

export const { setUser, setUserLoadingStatus, setUserErrorStatus } = actions
export default reducer
