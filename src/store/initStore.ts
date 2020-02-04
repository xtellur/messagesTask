import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from '@/store/rootReducer'
import rootSaga from '@/store/rootSaga'

export default function initStore() {
  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(rootReducer, {}, composeWithDevTools(applyMiddleware(sagaMiddleware)))

  sagaMiddleware.run(rootSaga)

  return store
}
