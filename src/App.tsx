import { FC, useEffect } from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import { Container } from '@material-ui/core'

import Users from './pages/Users'
import User from './pages/User'
import Notifier from './components/Notifier'

const App: FC = () => {
  const location = useLocation()

  useEffect(() => {
    window.scroll(0, 0)
  }, [location])

  return (
    <Container component="main" maxWidth="md">
      <Notifier />
      <Switch>
        <Route path="/" component={Users} exact />
        <Route path="/user/:name" component={User} exact />
      </Switch>
    </Container>
  )
}

export default App
