import { call, put, takeLatest } from 'redux-saga/effects'

import { fetchSearchUsers, fetchUsers, fetchUser } from '../../api/users'
import { LoadingStatus } from '../currentTypes'
import {
  UsersSearchInterface,
  UsersActionsType,
  UserInterface,
  UsersInterface,
} from './types'

import {
  setUser,
  setUsers,
  setMoreUsers,
  setUsersErrorStatus,
  setUsersLoadingStatus,
} from './index'

export function* loadSearchUsers({ payload }: UsersSearchInterface): Generator {
  try {
    yield put(setUsersLoadingStatus(LoadingStatus.LOADING))
    const { items }: ReturnType<typeof Object> = yield call(
      fetchSearchUsers,
      payload
    )
    yield payload.page > 1 ? put(setMoreUsers(items)) : put(setUsers(items))
  } catch ({ status }) {
    yield put(setUsersLoadingStatus(LoadingStatus.ERROR))
    yield put(setUsersErrorStatus(status))
  }
}

export function* loadUsers({ payload }: UsersInterface): Generator {
  try {
    yield put(setUsersLoadingStatus(LoadingStatus.LOADING))
    const data: ReturnType<typeof Object> = yield call(fetchUsers, payload)
    yield payload > 1 ? put(setMoreUsers(data)) : put(setUsers(data))
  } catch ({ status }) {
    yield put(setUsersLoadingStatus(LoadingStatus.ERROR))
    yield put(setUsersErrorStatus(status))
  }
}

export function* loadUser({ payload }: UserInterface): Generator {
  try {
    yield put(setUsersLoadingStatus(LoadingStatus.LOADING))
    const data: ReturnType<typeof Object> = yield call(fetchUser, payload)
    yield put(setUser(data))
  } catch ({ status }) {
    yield put(setUsersLoadingStatus(LoadingStatus.ERROR))
    yield put(setUsersErrorStatus(status))
  }
}

export function* usersSaga(): Generator {
  yield takeLatest(UsersActionsType.LOAD_SEARCH_USERS, loadSearchUsers)
  yield takeLatest(UsersActionsType.LOAD_USERS, loadUsers)
  yield takeLatest(UsersActionsType.LOAD_USER, loadUser)
}
