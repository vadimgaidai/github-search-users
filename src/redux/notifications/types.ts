import { VariantType } from 'notistack'

export interface NotificationType {
  message: string
  options: {
    key?: string
    variant: VariantType
  }
}

export interface NotificationsActionInterface {
  payload: string
}

export interface StateType {
  notifications: NotificationType[]
}
