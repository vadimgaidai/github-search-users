import { LoadingStatus, ErrorStatus } from '../currentTypes'
import { RootState } from '../store'
import { UserType } from '../users/types'
import { RepoType, StateType } from './types'

export const selectUserState = (state: RootState): StateType => state.user

export const selectUser = (state: RootState): UserType | null =>
  selectUserState(state).user

export const selectRepos = (state: RootState): RepoType[] =>
  selectUserState(state).repos

export const selectIsUserLoadedError = (state: RootState): boolean =>
  selectUserState(state).loading === LoadingStatus.ERROR

export const selectErrorStatus = (state: RootState): ErrorStatus =>
  selectUserState(state).error
