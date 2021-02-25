import { LoadingStatus, ErrorStatus } from '../currentTypes'

export enum UsersActionsType {
  LOAD_USERS = 'users/LOAD_USERS',
}

export interface UserType {
  id: string
}

export interface StateType {
  users: UserType[]
  loading: LoadingStatus
  error: ErrorStatus
}
