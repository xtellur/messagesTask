import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { authorListGet, messagesGet } from '@/store/messages/actions'
import { messagesSelector, authorListSelector } from '@/store/messages/selectors'
import { MessageList } from '@/components/MessageList'
import { Menu } from '@/components/Menu'

export const Main: React.FC = () => {
  const dispatch = useDispatch()

  const messageList = useSelector(messagesSelector)
  const authorList = useSelector(authorListSelector)

  useEffect(() => {
    dispatch(authorListGet())
    dispatch(messagesGet({}))
  }, [])

  return (
    <>
      <Menu />
      <MessageList messageList={messageList} authorList={authorList} showFilter={true} />
    </>
  )
}
