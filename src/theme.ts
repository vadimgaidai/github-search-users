import { createMuiTheme } from '@material-ui/core/styles'
import { lightBlue, grey } from '@material-ui/core/colors'

const theme = createMuiTheme({
  typography: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue',
  },
  palette: {
    primary: {
      main: lightBlue[600],
    },
    text: {
      primary: grey[100],
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
    MuiInput: {
      root: {
        width: '100%',
        marginTop: 30,
        marginBottom: 30,
      },
      underline: {
        '&::before': {
          borderColor: lightBlue[300],
        },
      },
    },
    MuiCircularProgress: {
      root: {
        display: 'block',
        margin: '20px auto 20px',
      },
    },
    MuiPaper: {
      root: {
        backgroundColor: lightBlue[600],
      },
    },
  },
})

export default theme
