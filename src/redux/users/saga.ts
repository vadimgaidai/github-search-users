import { call, put, takeLatest } from 'redux-saga/effects'

import { fetchSearchUsers, fetchUsers } from '../../api/users'
import { LoadingStatus } from '../currentTypes'
import {
  UsersSearchActionInterface,
  UsersActionInterface,
  UsersActionsType,
} from './types'

import { setUsers, setMoreUsers, setUsersLoadingStatus } from './index'
import { setNotification } from '../notifications'

export function* loadSearchUsers({
  payload,
}: UsersSearchActionInterface): Generator {
  try {
    yield put(setUsersLoadingStatus(LoadingStatus.LOADING))
    const { items }: ReturnType<typeof Object> = yield call(
      fetchSearchUsers,
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

export function* loadUsers({ payload }: UsersActionInterface): Generator {
  try {
    yield put(setUsersLoadingStatus(LoadingStatus.LOADING))
    const data: ReturnType<typeof Object> = yield call(fetchUsers, payload)
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
