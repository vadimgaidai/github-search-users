import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ThemeProvider, CssBaseline } from '@material-ui/core'
import { SnackbarProvider } from 'notistack'

import materialUiTheme from './theme'
import store from './redux/store'

import Header from './components/Header'
import App from './App'
import Footer from './components/Footer'

import reportWebVitals from './reportWebVitals'

import './index.css'

ReactDOM.render(
  <ThemeProvider theme={materialUiTheme}>
    <CssBaseline />
    <Provider store={store}>
      <BrowserRouter>
        <SnackbarProvider
          maxSnack={6}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <Header />
          <App />
          <Footer />
        </SnackbarProvider>
      </BrowserRouter>
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
