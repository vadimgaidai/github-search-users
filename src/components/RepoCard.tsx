import { FC } from 'react'
import { Grid, Box, makeStyles, createStyles, Theme } from '@material-ui/core'

interface RepoCardTypes {
  url: string
  name: string
  forks: number
  stars: number
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      display: 'flex',
      cursor: 'pointer',
      alignItems: 'center',
      textDecoration: 'none',
      color: 'white',
      padding: 15,
      backgroundColor: theme.palette.primary.main,
    },
  })
)

const RepoCard: FC<RepoCardTypes> = ({
  url,
  name,
  forks,
  stars,
}: RepoCardTypes) => {
  const style = useStyles()
  return (
    <a
      href={url.replace('git:', 'https:')}
      className={style.card}
      target="_blank"
      rel="noreferrer"
    >
      <Grid item xs={6}>
        <h2>{name}</h2>
      </Grid>
      <Grid container justify="flex-end">
        <Box>
          <p>Forks: {forks}</p>
          <p>Stars: {stars}</p>
        </Box>
      </Grid>
    </a>
  )
}

export default RepoCard
