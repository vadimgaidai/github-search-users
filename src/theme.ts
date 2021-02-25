import { createMuiTheme } from '@material-ui/core/styles'
import { lightBlue, green, grey } from '@material-ui/core/colors'

const theme = createMuiTheme({
  typography: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue',
  },
  palette: {
    primary: {
      main: lightBlue[500],
    },
    secondary: {
      main: green[300],
    },
    background: {
      default: grey.A400,
    },
  },
})

export default theme
