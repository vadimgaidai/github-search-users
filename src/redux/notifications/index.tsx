import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit'
import { SnackbarKey } from 'notistack'
import { StateType, NotificationType } from './types'

const { actions, reducer } = createSlice({
  name: 'notifications',
  initialState: {
    notifications: [],
  } as StateType,
  reducers: {
    setNotification(
      state: StateType,
      { payload: { message, options } }: PayloadAction<NotificationType>
    ) {
      state.notifications.push({
        message,
        options: { key: nanoid(), ...options },
      })
    },
    removeNotification(
      state: StateType,
      { payload }: PayloadAction<string | SnackbarKey>
    ) {
      state.notifications = state.notifications.filter(
        ({ options: { key } }) => key !== payload
      )
    },
  },
})

export const { setNotification, removeNotification } = actions
export default reducer
