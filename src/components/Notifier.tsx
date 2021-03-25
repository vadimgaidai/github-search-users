/* eslint-disable react-hooks/exhaustive-deps */
import { ReactElement, useEffect } from 'react'
import { SnackbarKey, useSnackbar } from 'notistack'
import { useDispatch, useSelector } from 'react-redux'
import { IconButton, createStyles, makeStyles, Theme } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

import { selectNotifications } from '../redux/notifications/selectors'
import { removeNotification } from '../redux/notifications'
import { NotificationType } from '../redux/notifications/types'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    closeButton: {
      color: theme.palette.text.primary,
    },
  })
)

const Notifier = (): null => {
  const style = useStyles()
  const dispatch = useDispatch()
  const notifications = useSelector(selectNotifications)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const action = (key: string): ReactElement => (
    <IconButton
      aria-label="close"
      className={style.closeButton}
      onClick={() => closeSnackbar(key)}
    >
      <CloseIcon />
    </IconButton>
  )

  useEffect(() => {
    notifications.forEach(({ message, options }: NotificationType) => {
      enqueueSnackbar(message, {
        ...options,
        autoHideDuration: 3000,
        action,
        onExited: (_: HTMLElement, key: SnackbarKey): void => {
          dispatch(removeNotification(key))
          closeSnackbar(key)
        },
      })
    })
  }, [notifications, enqueueSnackbar])

  return null
}

export default Notifier
