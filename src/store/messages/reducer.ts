import { createReducer } from 'redux-act'
import {
  messagesGet,
  authorListGetSuccess,
  authorListGet,
  messageSaveSuccess,
  authorGet,
  authorGetSuccess,
  messagesGetSuccess,
} from './actions'
import { IMessagesState } from './type'

const defaultState: IMessagesState = {
  items: [],
  authorList: [],
  author: undefined,
  isFetching: false,
}

const reducer = createReducer({}, defaultState)

reducer.on(messagesGet, state => {
  return {
    ...state,
    isFetching: true,
    error: undefined,
  }
})

reducer.on(messagesGetSuccess, (state, payload) => {
  return {
    ...state,
    isFetching: false,
    items: payload,
  }
})

reducer.on(messageSaveSuccess, (state, payload) => {
  return {
    ...state,
    items: [...state.items, payload],
  }
})

reducer.on(authorListGet, state => {
  return {
    ...state,
    isFetching: true,
    error: undefined,
  }
})

reducer.on(authorListGetSuccess, (state, payload) => {
  return {
    ...state,
    authorList: payload,
    isFetching: false,
  }
})

reducer.on(authorGet, state => {
  return {
    ...state,
    isFetching: true,
    error: undefined,
  }
})

reducer.on(authorGetSuccess, (state, payload) => {
  return {
    ...state,
    isFetching: false,
    author: payload,
  }
})

export default reducer
