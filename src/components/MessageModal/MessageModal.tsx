import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import classnames from 'classnames/bind'
import { Button, ButtonTheme } from '@/ui/Button'
import { Select } from '@/ui/Select'
import { authorListGet, messageSave } from '@/store/messages/actions'
import { authorListSelector } from '@/store/messages/selectors'
import { IAuthor } from '@/store/messages/type'
import css from './MessageModal.css'

const cn = classnames.bind(css)

const MAX_LENGTH = 500

interface IProps {
  isOpen: boolean
  onClose: () => void
}

export const MessageModal: React.FC<IProps> = props => {
  const { isOpen, onClose } = props

  const [text, setText] = useState('')
  const [author, setAuthor] = useState<IAuthor>()

  const dispatch = useDispatch()
  const authorList = useSelector(authorListSelector)

  useEffect(() => {
    if (!isOpen) {
      setText('')
      return
    }

    dispatch(authorListGet())
  }, [isOpen])

  useEffect(() => {
    if (authorList.length === 0) {
      return
    }

    setAuthor(authorList[0])
  }, [authorList])

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value

    if (value.length > MAX_LENGTH) {
      return
    }

    setText(value)
  }

  const isSaveDisabled = !author || text.length === 0 || text.length > MAX_LENGTH

  const handleSave = () => {
    if (isSaveDisabled) {
      return
    }

    dispatch(messageSave({ dateTime: Date.now(), author: author as IAuthor, messageText: text }))

    onClose()
  }

  return (
    <div className={cn('overlay', { overlay_opened: isOpen })}>
      <div className={cn('modal')}>
        <div className={cn('header')}>
          <Select items={authorList} onSelect={setAuthor} />
          <div className={cn('counter')}>{`${text.length} / ${MAX_LENGTH}`}</div>
        </div>
        <textarea
          value={text}
          className={cn('text')}
          placeholder={`What do you think? Not more than ${MAX_LENGTH} symbols =)`}
          onChange={handleTextChange}
        ></textarea>
        <div className={cn('controls')}>
          <Button text="Save" disabled={isSaveDisabled} className={cn('saveBtn')} onClick={handleSave} />
          <Button text="Close" theme={ButtonTheme.GREY} onClick={onClose} />
        </div>
      </div>
    </div>
  )
}
