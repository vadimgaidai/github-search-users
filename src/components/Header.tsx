import { FC } from 'react'
import { createStyles, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() =>
  createStyles({
    caption: {
      textAlign: 'center',
    },
  })
)

const Header: FC = () => {
  const style = useStyles()
  return (
    <header>
      <h1 className={style.caption}>GitHub Searcher</h1>
    </header>
  )
}
export default Header
