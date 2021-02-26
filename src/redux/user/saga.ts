import { call, put, takeLatest } from 'redux-saga/effects'

import { fetchUser, fetchUserRepos } from '../../api/users'
import { LoadingStatus } from '../currentTypes'
import { UserActionInterface, UserActionsType } from './types'

import {
  setMoreRepos,
  setUser,
  setUserErrorStatus,
  setUserLoadingStatus,
} from './index'

export function* loadUser({ payload }: UserActionInterface): Generator {
  try {
    yield put(setUserLoadingStatus(LoadingStatus.LOADING))
    const user: ReturnType<typeof Object> = yield call(fetchUser, payload)
    const repos: ReturnType<typeof Object> = yield call(fetchUserRepos, payload)
    yield put(setUser({ user, repos }))
  } catch ({ status }) {
    yield put(setUserLoadingStatus(LoadingStatus.ERROR))
    yield put(setUserErrorStatus(status))
  }
}

export function* loadMoreRepos({ payload }: UserActionInterface): Generator {
  try {
    yield put(setUserLoadingStatus(LoadingStatus.LOADING))
    const repos: ReturnType<typeof Object> = yield call(fetchUserRepos, payload)
    yield put(setMoreRepos(repos))
  } catch ({ status }) {
    yield put(setUserLoadingStatus(LoadingStatus.ERROR))
    yield put(setUserErrorStatus(status))
  }
}

export function* userSaga(): Generator {
  yield takeLatest(UserActionsType.LOAD_USER, loadUser)
  yield takeLatest(UserActionsType.LOAD_USER_REPOS, loadMoreRepos)
}
