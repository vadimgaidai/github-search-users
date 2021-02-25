import { call, put, takeLatest } from 'redux-saga/effects'

import { fetchSearchUsers, fetchUser } from '../../api/users'
import { LoadingStatus } from '../currentTypes'
import { UsersActionsType } from './types'

import { setUsers, setUsersErrorStatus, setUsersLoadingStatus } from './index'

export function* loadSearchUsers(inputValue: string): Generator {
  try {
    yield put(setUsersLoadingStatus(LoadingStatus.LOADING))
    const payload: ReturnType<typeof Object> = yield call(() =>
      fetchSearchUsers(inputValue)
    )
    yield put(setUsers(payload))
  } catch ({ status }) {
    yield put(setUsersLoadingStatus(LoadingStatus.ERROR))
    yield put(setUsersErrorStatus(status))
  }
}

export function* loadUser(name: string): Generator {
  try {
    yield put(setUsersLoadingStatus(LoadingStatus.LOADING))
    const payload: ReturnType<typeof Object> = yield call(() => fetchUser(name))
    yield put(setUsers(payload))
  } catch ({ status }) {
    yield put(setUsersLoadingStatus(LoadingStatus.ERROR))
    yield put(setUsersErrorStatus(status))
  }
}

export function* usersSaga(): Generator {
  // yield takeLatest(UsersActionsType.LOAD_SEARCH_USERS, loadSearchUsers)
  // yield takeLatest(UsersActionsType.LOAD_USER, loadUser)
}
