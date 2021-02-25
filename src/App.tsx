import { FC, useEffect } from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import User from './pages/User'

import Users from './pages/Users'

const App: FC = () => {
  const location = useLocation()

  useEffect(() => {
    window.scroll(0, 0)
  }, [location])

  return (
    <Switch>
      <Route path="/" component={Users} exact />
      <Route path="/user/:name" component={User} exact />
    </Switch>
  )
}

export default App
