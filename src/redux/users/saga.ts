/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { call, put, takeLatest } from 'redux-saga/effects'

import { UsersApi } from '../../api/users'
import { LoadingStatus } from '../currentTypes'
import {
  UsersSearchActionInterface,
  UsersActionInterface,
  UsersActionsType,
  UserType,
  SearchUsersType,
} from './types'

import { setUsers, setMoreUsers, setUsersLoadingStatus } from './index'
import { setNotification } from '../notifications'

export function* loadSearchUsers({ payload }: UsersSearchActionInterface) {
  try {
    yield put(setUsersLoadingStatus(LoadingStatus.LOADING))
    const { items }: SearchUsersType = yield call(
      UsersApi.fetchSearchUsers,
      payload
    )
    yield payload.page > 1 ? put(setMoreUsers(items)) : put(setUsers(items))
  } catch ({ status }) {
    yield put(setUsersLoadingStatus(LoadingStatus.ERROR))
    yield put(
      setNotification({
        message:
          status === LoadingStatus.LIMIT_API
            ? 'API rate limit exceeded'
            : 'Failed fetching users',
        options: {
          variant: 'error',
        },
      })
    )
  }
}

export function* loadUsers({ payload }: UsersActionInterface) {
  try {
    yield put(setUsersLoadingStatus(LoadingStatus.LOADING))
    const data: UserType[] = yield call(UsersApi.fetchUsers, payload)
    yield payload ? put(setMoreUsers(data)) : put(setUsers(data))
  } catch ({ status }) {
    yield put(setUsersLoadingStatus(LoadingStatus.ERROR))
    yield put(
      setNotification({
        message:
          status === LoadingStatus.LIMIT_API
            ? 'API rate limit exceeded'
            : 'Failed fetching users',
        options: {
          variant: 'error',
        },
      })
    )
  }
}

export function* usersSaga(): Generator {
  yield takeLatest(UsersActionsType.LOAD_SEARCH_USERS, loadSearchUsers)
  yield takeLatest(UsersActionsType.LOAD_USERS, loadUsers)
}
