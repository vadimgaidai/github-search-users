import { FC } from 'react'
import { Link, Box, createStyles, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() =>
  createStyles({
    box: {
      textAlign: 'center',
    },
  })
)

const Footer: FC = () => {
  const style = useStyles()
  return (
    <footer>
      <Box m={1} className={style.box}>
        <Link
          href="https://github.com/vadimgaidai"
          color="primary"
          target="_blank"
        >
          @github
        </Link>
      </Box>
    </footer>
  )
}

export default Footer
