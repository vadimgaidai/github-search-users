import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LoadingStatus } from '../currentTypes'
import { StateType, UserType } from './types'

const { actions, reducer } = createSlice({
  name: 'users',
  initialState: {
    users: [],
    searchValue: '',
    page: 1,
    isMoreLoading: true,
    loading: LoadingStatus.NEVER,
  } as StateType,
  reducers: {
    setUsers(state: StateType, { payload }: PayloadAction<UserType[]>) {
      state.users = payload
      state.isMoreLoading = true
      state.loading = LoadingStatus.LOADED
    },
    setMoreUsers(state: StateType, { payload }: PayloadAction<UserType[]>) {
      if (payload.length) {
        state.users.push(...payload)
      } else {
        state.isMoreLoading = false
      }
      state.loading = LoadingStatus.LOADED
    },
    setPage(state: StateType, { payload }: PayloadAction<number>) {
      state.page = payload
    },
    setSearchValue(state: StateType, { payload }: PayloadAction<string>) {
      state.searchValue = payload
    },
    setUsersLoadingStatus(
      state: StateType,
      { payload }: PayloadAction<LoadingStatus>
    ) {
      state.loading = payload
    },
  },
})

export const {
  setUsers,
  setPage,
  setSearchValue,
  setMoreUsers,
  setUsersLoadingStatus,
} = actions
export default reducer
