import { takeEvery, put, all, select } from 'redux-saga/effects'
import v4 from 'uuid/v4'
import { Action } from 'redux-act'
import {
  messagesGet,
  messagesGetFail,
  messagesGetSuccess,
  authorListGet,
  authorListGetSuccess,
  authorListGetFail,
  messageSave,
  messageSaveSuccess,
  messageSaveFail,
  authorGet,
  authorGetSuccess,
  authorGetFail,
} from './actions'
import { authorList } from './mock'
import { IMessage, IMessageGetPayload } from './type'
import { messagesSelector } from './selectors'

function* handleGetMessages(action?: Action<IMessageGetPayload>) {
  try {
    const messageId = action?.payload.messageId
    const authorId = action?.payload.authorId

    const messages: IMessage[] = JSON.parse(localStorage.getItem('messages') || '')

    if (messageId) {
      yield put(messagesGetSuccess(messages.filter(item => item.id === messageId)))
      return
    } else if (authorId) {
      yield put(messagesGetSuccess(messages.filter(item => item.author.id === authorId)))
      return
    }

    yield put(messagesGetSuccess(messages))
  } catch (error) {
    yield put(messagesGetFail(error))
  }
}

function* handleSaveMessage(action: Action<IMessage>) {
  try {
    const message = action.payload

    message.id = v4()

    const messages = yield select(messagesSelector)

    const newMessages = [...messages, message]

    localStorage.setItem('messages', JSON.stringify(newMessages))

    yield put(messageSaveSuccess(message))
  } catch (error) {
    yield put(messageSaveFail(error))
  }
}

function* handleGetAuthorList() {
  try {
    yield put(authorListGetSuccess(authorList))
  } catch (error) {
    yield put(authorListGetFail(error))
  }
}

function* handleGetAuthor(action: Action<string>) {
  try {
    const authorId = action.payload

    const author = authorList.find(item => item.id === authorId)

    if (!author) {
      return
    }

    yield put(authorGetSuccess(author))
  } catch (error) {
    yield put(authorGetFail(error))
  }
}

function* messagesSaga() {
  return yield all([
    takeEvery(messagesGet.getType(), handleGetMessages),
    takeEvery(messageSave.getType(), handleSaveMessage),
    takeEvery(authorListGet.getType(), handleGetAuthorList),
    takeEvery(authorGet.getType(), handleGetAuthor),
  ])
}

export default messagesSaga
