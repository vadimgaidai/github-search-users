import { LoadingStatus, ErrorStatus } from '../currentTypes'

export enum UsersActionsType {
  LOAD_SEARCH_USERS = 'users/LOAD_SEARCH_USERS',
  LOAD_USER = 'users/LOAD_USER',
}

export interface UserType {
  id: string
}

export interface StateType {
  users: UserType[]
  user: UserType | null
  loading: LoadingStatus
  error: ErrorStatus
}
