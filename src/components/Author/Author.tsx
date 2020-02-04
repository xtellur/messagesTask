import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RouteComponentProps, Link } from 'react-router-dom'
import classnames from 'classnames/bind'
import { MessageList } from '@/components/MessageList'
import { authorSelector, messagesSelector } from '@/store/messages/selectors'
import { Menu } from '@/components/Menu'
import { authorGet, messagesGet } from '@/store/messages/actions'
import css from './Author.css'
import { RouterPath } from '@/router/constants'

const cn = classnames.bind(css)

interface IAuthorPageProps {
  authorId: string
}

interface IProps extends RouteComponentProps<IAuthorPageProps> {}

export const Author: React.FC<IProps> = props => {
  const { match } = props
  const authorId = match.params.authorId

  const author = useSelector(authorSelector)
  const messageList = useSelector(messagesSelector)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(authorGet(authorId))
    dispatch(messagesGet({ authorId }))
  }, [authorId])

  return (
    <div>
      <Menu showAddBtn={false} />
      <div className={cn('description')}>
        <h1>{author?.title}</h1>
        <div>{author?.description}</div>
        <Link to={RouterPath.MAIN} className={cn('back')}>
          Go back
        </Link>
      </div>
      <MessageList messageList={messageList} />
    </div>
  )
}
