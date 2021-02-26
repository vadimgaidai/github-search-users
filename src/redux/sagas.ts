import { all } from 'redux-saga/effects'

import { usersSaga } from './users/saga'
import { userSaga } from './user/saga'

export default function* rootSaga(): Generator {
  yield all([usersSaga(), userSaga()])
}
