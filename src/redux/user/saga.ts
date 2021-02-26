import { call, put, takeLatest } from 'redux-saga/effects'

import { fetchUser } from '../../api/users'
import { LoadingStatus } from '../currentTypes'
import { UserActionInterface, UserActionsType } from './types'

import { setUser, setUserErrorStatus, setUserLoadingStatus } from './index'

export function* loadUser({ payload }: UserActionInterface): Generator {
  try {
    yield put(setUserLoadingStatus(LoadingStatus.LOADING))
    const data: ReturnType<typeof Object> = yield call(fetchUser, payload)
    yield put(setUser(data))
  } catch ({ status }) {
    yield put(setUserLoadingStatus(LoadingStatus.ERROR))
    yield put(setUserErrorStatus(status))
  }
}

export function* userSaga(): Generator {
  yield takeLatest(UserActionsType.LOAD_USER, loadUser)
}
