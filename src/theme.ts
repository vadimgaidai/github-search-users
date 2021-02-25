import { createMuiTheme } from '@material-ui/core/styles'
import { lightBlue, grey } from '@material-ui/core/colors'

const theme = createMuiTheme({
  typography: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue',
  },
  palette: {
    primary: {
      main: lightBlue[500],
    },
    text: {
      primary: 'white',
    },
    background: {
      default: grey.A400,
    },
  },
  overrides: {
    MuiContainer: {
      root: {
        height: '100%',
      },
    },
  },
})

export default theme
