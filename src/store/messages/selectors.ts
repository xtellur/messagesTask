import { createSelector } from 'reselect'
import { IAppState } from '@/store/rootReducer'

const stateSelector = (state: IAppState) => state.messages

export const isFetchingSelector = createSelector(stateSelector, ({ isFetching }) => isFetching)

export const messagesSelector = createSelector(stateSelector, ({ items }) => items)

export const authorListSelector = createSelector(stateSelector, ({ authorList }) => authorList)

export const authorSelector = createSelector(stateSelector, ({ author }) => author)
