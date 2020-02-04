import React from 'react'
import classnames from 'classnames/bind'
import css from './Button.css'

const cn = classnames.bind(css)

export enum ButtonTheme {
  BLUE = 'blue',
  GREY = 'grey',
}

interface IProps {
  text: string
  theme?: ButtonTheme
  disabled?: boolean
  className?: string
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export const Button: React.FC<IProps> = props => {
  const { text, theme = ButtonTheme.BLUE, disabled, className = '', onClick } = props

  return (
    <button
      type="button"
      disabled={disabled}
      className={cn('button', { [`button_${theme}`]: true, [className]: true })}
      onClick={onClick}
    >
      {text}
    </button>
  )
}
