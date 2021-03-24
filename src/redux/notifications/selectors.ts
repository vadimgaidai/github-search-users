import { RootState } from '../store'
import { StateType, NotificationType } from './types'

export const selectNotificationsState = (state: RootState): StateType =>
  state.notifications

export const selectNotifications = (state: RootState): NotificationType[] =>
  selectNotificationsState(state).notifications
