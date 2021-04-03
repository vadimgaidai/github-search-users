/* eslint-disable camelcase */
import { LoadingStatus } from '../currentTypes'

export enum UsersActionsType {
  LOAD_SEARCH_USERS = 'users/LOAD_SEARCH_USERS',
  LOAD_USERS = 'users/LOAD_USERS',
}

export interface UserType {
  id: number
  node_id: string
  avatar_url: string
  login: string
  name: string
  location: string
  created_at: string
  followers: number
  following: number
}

export interface SearchUsersType {
  incomplete_results: boolean
  items: UserType[]
  total_count: number
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
  searchValue: string
  page: number
  isMoreLoading: boolean
  loading: LoadingStatus
}
