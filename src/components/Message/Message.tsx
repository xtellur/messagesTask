import React from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames/bind'
import format from 'date-fns/format'
import { IMessage } from '@/store/messages/type'
import css from './Message.css'
import { RouterPath } from '@/router/constants'

const cn = classnames.bind(css)

interface IProps {
  message: IMessage
  className?: string
}

export const Message: React.FC<IProps> = props => {
  const { message, className } = props
  const { id, dateTime, messageText, author } = message

  return (
    <div key={id} className={cn('message', className)}>
      <div className={cn('header')}>
        <Link to={`${RouterPath.AUTHOR}/${author.id}`}>{author.title}</Link>
        <span>{format(dateTime, 'hh:mm:ss / dd.MM.yyyy')}</span>
      </div>
      <div className={cn('text')}>{messageText}</div>
    </div>
  )
}
