/* eslint-disable camelcase */
import { LoadingStatus, ErrorStatus } from '../currentTypes'
import { UserType } from '../users/types'

export enum UserActionsType {
  LOAD_USER = 'user/LOAD_USER',
}

export interface UserActionInterface {
  type: UserActionsType.LOAD_USER
  payload: string
}

export interface StateType {
  user: UserType | null
  loading: LoadingStatus
  error: ErrorStatus
}
