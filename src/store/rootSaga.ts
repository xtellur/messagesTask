import { all, fork } from 'redux-saga/effects'
import messages from './messages/saga'

export default function*() {
  return yield all([fork(messages)])
}
