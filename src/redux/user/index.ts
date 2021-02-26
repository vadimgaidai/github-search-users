import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { LoadingStatus, ErrorStatus } from '../currentTypes'
import { UserType } from '../users/types'
import { RepoType, StateType } from './types'

const { actions, reducer } = createSlice({
  name: 'user',
  initialState: {
    user: null,
    repos: [],
    loading: LoadingStatus.NEVER,
    error: null,
  } as StateType,
  reducers: {
    setUser(
      state: StateType,
      { payload }: PayloadAction<{ user: UserType | null; repos: RepoType[] }>
    ) {
      state.user = payload.user
      state.repos = payload.repos
      state.loading = LoadingStatus.LOADED
    },
    setMoreRepos(state: StateType, { payload }: PayloadAction<RepoType[]>) {
      state.repos = [...state.repos, ...payload]
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

export const {
  setUser,
  setMoreRepos,
  setUserLoadingStatus,
  setUserErrorStatus,
} = actions
export default reducer
