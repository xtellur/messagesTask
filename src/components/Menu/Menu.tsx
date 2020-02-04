import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames/bind'
import { Button } from '@/ui/Button'
import { MessageModal } from '@/components/MessageModal'
import { RouterPath } from '@/router/constants'
import css from './Menu.css'

const cn = classnames.bind(css)

interface IProps {
  showAddBtn?: boolean
}

export const Menu: React.FC<IProps> = props => {
  const { showAddBtn = true } = props

  const [isModalOpened, setIsModalOpened] = useState(false)

  const handleTriggerModal = () => {
    setIsModalOpened(!isModalOpened)
  }

  return (
    <div className={cn('menu')}>
      <Link to={RouterPath.MAIN} className={cn('title')}>
        Great posts
      </Link>

      {showAddBtn && <Button text="New message" onClick={handleTriggerModal} />}

      <MessageModal isOpen={isModalOpened} onClose={handleTriggerModal} />
    </div>
  )
}
