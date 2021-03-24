import { LoadingStatus } from '../currentTypes'
import { RootState } from '../store'
import { StateType, UserType } from './types'

export const selectUsersState = (state: RootState): StateType => state.users

export const selectUsers = (state: RootState): UserType[] =>
  selectUsersState(state).users

export const selectPage = (state: RootState): number =>
  selectUsersState(state).page

export const selectSearchValue = (state: RootState): string =>
  selectUsersState(state).searchValue

export const selectIsUsersMoreLoading = (state: RootState): boolean =>
  selectUsersState(state).isMoreLoading

export const selectIsUsersNeverLoading = (state: RootState): boolean =>
  selectUsersState(state).loading === LoadingStatus.NEVER

export const selectIsUsersLoadedError = (state: RootState): boolean =>
  selectUsersState(state).loading === LoadingStatus.ERROR
