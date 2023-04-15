import React, { useState, useEffect, useRef } from 'react'
import FilterListIcon from '@mui/icons-material/FilterList'
import './styles.scss'

type SelectProp = {
  type: 'filter' | 'select'
  value?: string
  onChange: (valeu: string) => void
}

enum Status {
  PENDING = 'pending',
  IN_PROGRESS = 'in progress',
  DONE = 'done',
}

export const Select = ({ type, value = '', onChange }: SelectProp) => {
  const [selectValue, setSelectValue] = useState<Status | ''>(value as Status)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const selecteContainerRef = useRef<HTMLUListElement>(null)
  const prevItemSelectedRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    document.addEventListener('click', closeSelectClickOutside)
    if (type === 'select') return setSelectValue(Status.PENDING)
    return () => document.removeEventListener('click', closeSelectClickOutside)
  }, [])

  useEffect(() => {
    if (!isOpen) {
      selecteContainerRef.current?.classList.add('hidden')
      return
    }
    selecteContainerRef.current?.classList.remove('hidden')
  }, [isOpen])

  const handleOpenSelect = () => {
    setIsOpen((prevState) => !prevState)
  }

  const handleSelectItem = (event: React.MouseEvent<HTMLElement>) => {
    let liElement = event.target as HTMLElement
    const { value } = event.currentTarget.dataset

    handleOpenSelect()
    onChange(value as string)

    if (value === selectValue) {
      if (type === 'select') return
      setSelectValue(() => '')
      liElement.classList.remove('item-active')
      return
    }
    setSelectValue(() => value as Status)
    liElement.classList.add('item-active')

    if (prevItemSelectedRef.current) {
      prevItemSelectedRef.current.classList.remove('item-active')
    }
    prevItemSelectedRef.current = liElement
  }

  const closeSelectClickOutside = (event: MouseEvent) => {
    const elementClicked = event.target as HTMLElement
    if (elementClicked.id === 'filter-button') {
      return
    }
    const isClickInside = selecteContainerRef?.current?.contains(event?.target as Node)

    if (!isClickInside && !selecteContainerRef?.current?.classList.contains('hidden')) {
      handleOpenSelect()
    }
  }

  return (
    <div className="filter-select-container">
      <span id="filter-button" onClick={handleOpenSelect}>
        {type === 'select' ? (
          selectValue
        ) : (
          <>
            <FilterListIcon />
            filters
          </>
        )}
      </span>
      <ul
        ref={selecteContainerRef as React.LegacyRef<HTMLUListElement>}
        className="filter-select-items-container hidden"
      >
        <li data-value={Status.PENDING} onClick={handleSelectItem}>
          {Status.PENDING}
        </li>
        <li data-value={Status.IN_PROGRESS} onClick={handleSelectItem}>
          {Status.IN_PROGRESS}
        </li>
        <li data-value={Status.DONE} onClick={handleSelectItem}>
          {Status.DONE}
        </li>
      </ul>
    </div>
  )
}
