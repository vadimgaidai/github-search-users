import { LoadingStatus } from '../currentTypes'
import { RootState } from '../store'
import { UserType } from '../users/types'
import { RepoType, StateType } from './types'

export const selectUserState = (state: RootState): StateType => state.user

export const selectUser = (state: RootState): UserType | null =>
  selectUserState(state).user

export const selectIsUserMoreLoading = (state: RootState): boolean =>
  selectUserState(state).isMoreLoading

export const selectRepos = (state: RootState): RepoType[] =>
  selectUserState(state).repos

export const selectIsUserLoading = (state: RootState): boolean =>
  selectUserState(state).loading !== LoadingStatus.LOADING

export const selectIsUserLoadedError = (state: RootState): boolean =>
  selectUserState(state).loading === LoadingStatus.ERROR
