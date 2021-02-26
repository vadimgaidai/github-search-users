/* eslint-disable camelcase */
import { LoadingStatus, ErrorStatus } from '../currentTypes'

export enum UsersActionsType {
  LOAD_SEARCH_USERS = 'users/LOAD_SEARCH_USERS',
  LOAD_USERS = 'users/LOAD_USERS',
}

export interface UserType {
  node_id: string
  avatar_url: string
  login: string
}

export interface UsersSearchActionInterface {
  type: UsersActionsType.LOAD_SEARCH_USERS
  payload: {
    page: number
    value: string
  }
}

export interface UsersActionInterface {
  type: UsersActionsType.LOAD_USERS
  payload: number
}
export interface StateType {
  users: UserType[]
  loading: LoadingStatus
  error: ErrorStatus
}
