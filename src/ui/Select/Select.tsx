import React from 'react'
import classnames from 'classnames/bind'
import css from './Select.css'

const cn = classnames.bind(css)

export type SelectItem = {
  id: string
  title: string
}

interface IProps {
  items: SelectItem[]
  defaultText?: string
  onSelect: (selectedItem: SelectItem) => void
}

export const Select: React.FC<IProps> = props => {
  const { items, defaultText, onSelect } = props

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = e.target.selectedIndex

    const index = defaultText ? selectedIndex - 1 : selectedIndex
    onSelect(items[index])
  }

  return (
    <select className={cn('select')} onChange={handleChange}>
      {defaultText && (
        <option key="default-0" value={undefined} title={defaultText}>
          - {defaultText}
        </option>
      )}
      {items.map(item => {
        return (
          <option key={item.id} value={item.id} title={item.title}>
            {item.title}
          </option>
        )
      })}
    </select>
  )
}
