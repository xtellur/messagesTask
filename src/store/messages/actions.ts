import { createAction } from 'redux-act'
import { IMessage, IAuthor, IMessageGetPayload } from './type'

export const messagesGet = createAction<IMessageGetPayload>('MESSAGES/GET')
export const messagesGetSuccess = createAction<IMessage[]>('MESSAGES/GET/SUCCESS')
export const messagesGetFail = createAction<string>('MESSAGES/GET/FAIL')

export const messageSave = createAction<IMessage>('MESSAGES/SAVE')
export const messageSaveSuccess = createAction<IMessage>('MESSAGES/SAVE/SUCCESS')
export const messageSaveFail = createAction<string>('MESSAGES/SAVE/FAIL')

export const authorListGet = createAction('AUTHOR_LIST/GET')
export const authorListGetSuccess = createAction<IAuthor[]>('AUTHOR_LIST/GET/SUCCESS')
export const authorListGetFail = createAction<string>('AUTHOR_LIST/GET/FAIL')

export const authorGet = createAction<string>('AUTHOR/GET')
export const authorGetSuccess = createAction<IAuthor>('AUTHOR/GET/SUCCESS')
export const authorGetFail = createAction<string>('AUTHOR/GET/FAIL')
