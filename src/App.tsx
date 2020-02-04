import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import classnames from 'classnames/bind'
import initStore from '@/store/initStore'
import AppRouter from '@/router/AppRouter'
import '@/styles/common.css'
import '@/styles/variables.css'
import css from './App.css'

const cn = classnames.bind(css)

const store = initStore()

ReactDOM.render(
  <Provider store={store}>
    <div className={cn('app')}>
      <AppRouter />
    </div>
  </Provider>,
  document.getElementById('root'),
)
