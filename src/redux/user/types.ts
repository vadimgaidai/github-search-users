/* eslint-disable camelcase */
import { LoadingStatus } from '../currentTypes'
import { UserType } from '../users/types'

export enum UserActionsType {
  LOAD_USER = 'user/LOAD_USER',
  LOAD_USER_REPOS = 'user/LOAD_USER_REPOS',
}

export interface UserActionInterface {
  type: UserActionsType.LOAD_USER
  payload: {
    name: string
    page?: number
  }
}

export interface UserReposActionInterface {
  type: UserActionsType.LOAD_USER_REPOS
  payload: {
    name: string
    page: number
  }
}

export interface RepoType {
  node_id: string
  name: string
  git_url: string
  forks_count: number
  stargazers_count: number
}

export interface StateType {
  user: UserType | null
  repos: RepoType[]
  isMoreLoading: boolean
  loading: LoadingStatus
}
