/* eslint-disable camelcase */
import { LoadingStatus, ErrorStatus } from '../currentTypes'

export enum UsersActionsType {
  LOAD_SEARCH_USERS = 'users/LOAD_SEARCH_USERS',
  LOAD_USERS = 'users/LOAD_USERS',
  LOAD_USER = 'users/LOAD_USER',
}

export interface UserType {
  node_id: string
  avatar_url: string
  login: string
}

export interface UsersSearchInterface {
  type: UsersActionsType.LOAD_SEARCH_USERS
  payload: {
    page: number
    value: string
  }
}

export interface UsersInterface {
  type: UsersActionsType.LOAD_USERS
  payload: number
}

export interface UserInterface {
  type: UsersActionsType.LOAD_USER
  payload: string
}
export interface StateType {
  users: UserType[]
  user: UserType | null
  loading: LoadingStatus
  error: ErrorStatus
}
