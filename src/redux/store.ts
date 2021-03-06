import { combineReducers, configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import users from './users'
import user from './user'
import notifications from './notifications'

import sagas from './sagas'

const sagaMiddleware = createSagaMiddleware()

const reducer = combineReducers({ users, user, notifications })

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: true,
      serializableCheck: true,
      thunk: false,
    }).concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
})

sagaMiddleware.run(sagas)

export type RootState = ReturnType<typeof store.getState>
export default store
