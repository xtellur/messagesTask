import { combineReducers } from 'redux'
import messages from './messages/reducer'
import { IMessagesState } from './messages/type'

export interface IAppState {
  messages: IMessagesState
}

export default combineReducers<IAppState>({
  messages,
})
