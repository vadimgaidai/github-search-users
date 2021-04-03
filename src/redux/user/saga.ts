/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { call, put, takeLatest } from 'redux-saga/effects'

import { UsersApi } from '../../api/users'
import { LoadingStatus } from '../currentTypes'
import { RepoType, UserActionInterface, UserActionsType } from './types'
import { UserType } from '../users/types'

import { setMoreRepos, setUser, setUserLoadingStatus } from './index'
import { setNotification } from '../notifications'

export function* loadUser({ payload }: UserActionInterface) {
  try {
    yield put(setUserLoadingStatus(LoadingStatus.LOADING))
    const user: UserType = yield call(UsersApi.fetchUser, payload)
    const repos: RepoType[] = yield call(UsersApi.fetchUserRepos, payload)
    yield put(setUser({ user, repos }))
  } catch ({ status }) {
    yield put(setUserLoadingStatus(LoadingStatus.ERROR))
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

export function* loadMoreRepos({ payload }: UserActionInterface) {
  try {
    const repos: RepoType[] = yield call(UsersApi.fetchUserRepos, payload)
    yield put(setMoreRepos(repos))
  } catch ({ status }) {
    yield put(setUserLoadingStatus(LoadingStatus.ERROR))
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

export function* userSaga(): Generator {
  yield takeLatest(UserActionsType.LOAD_USER, loadUser)
  yield takeLatest(UserActionsType.LOAD_USER_REPOS, loadMoreRepos)
}
