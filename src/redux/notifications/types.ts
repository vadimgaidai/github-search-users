export interface NotificationType {
  message: string
  options: {
    key?: string
    variant: string
  }
}

export interface NotificationsActionInterface {
  payload: string
}

export interface StateType {
  notifications: NotificationType[]
}
