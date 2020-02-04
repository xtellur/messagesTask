import React, { useState } from 'react'
import classnames from 'classnames/bind'
import { Message } from '@/components/Message'
import { Select } from '@/ui/Select'
import css from './MessageList.css'
import { IAuthor, IMessage } from '@/store/messages/type'

const cn = classnames.bind(css)

interface IProps {
  messageList: IMessage[]
  authorList?: IAuthor[]
  showFilter?: boolean
  className?: string
}

export const MessageList: React.FC<IProps> = props => {
  const { messageList, authorList, showFilter, className } = props

  const [selectedAuthor, setSelectedAuthor] = useState<IAuthor>()

  const filterMessages = () => {
    if (selectedAuthor) {
      return messageList.filter(item => item.author.id === selectedAuthor?.id)
    }

    return messageList
  }

  return (
    <div className={cn('messageList', className)}>
      {showFilter && authorList && (
        <div className={cn('filter')}>
          <Select items={authorList} defaultText="Filter by author" onSelect={setSelectedAuthor} />
        </div>
      )}
      <div className={cn('messages')}>
        {filterMessages().map(item => (
          <Message key={item.id} message={item} className={cn('message')} />
        ))}
      </div>
    </div>
  )
}
