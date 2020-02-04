import React from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import { Main } from '@/components/Main'
import { Author } from '@/components/Author'
import { RouterPath } from './constants'
import history from './history'

const AppRouter: React.FC = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path={RouterPath.MAIN} component={Main} />
        <Route path={`${RouterPath.AUTHOR}/:authorId`} component={Author} />
      </Switch>
    </Router>
  )
}

export default AppRouter
