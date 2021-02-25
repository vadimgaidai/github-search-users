import { FC } from 'react'
import {
  Paper,
  Grid,
  Avatar,
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core'

interface UserCardTypes {
  image: string
  name: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      display: 'flex',
      cursor: 'pointer',
      alignItems: 'center',
      padding: 15,
      backgroundColor: theme.palette.primary.main,
    },
    cardAvatar: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  })
)

const UserCard: FC<UserCardTypes> = ({ image, name }: UserCardTypes) => {
  const style = useStyles()
  return (
    <Paper className={style.card} variant="outlined" square>
      <Grid item xs={6}>
        <Avatar className={style.cardAvatar} alt={name} src={image} />
      </Grid>
      <Grid item xs={6}>
        <h2>{name}</h2>
      </Grid>
    </Paper>
  )
}

export default UserCard
