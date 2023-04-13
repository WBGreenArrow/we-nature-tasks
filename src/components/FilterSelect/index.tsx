import React, { useState, useEffect, useRef } from 'react'
import FilterListIcon from '@mui/icons-material/FilterList'
import './styles.scss'

export const FilterSelect = () => {
  const [filterValue, setFilterValue] = useState<string>('')
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const selecteContainerRef = useRef<HTMLUListElement>(null)
  const prevItemSelectedRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    document.addEventListener('click', closeSelectClickOutside)
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
    let value = liElement.innerHTML

    handleOpenSelect()
    if (value === filterValue) {
      setFilterValue(() => '')
      liElement.classList.remove('item-active')
      return
    }
    setFilterValue(() => value)
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
        <FilterListIcon />
        filters
      </span>
      <ul
        ref={selecteContainerRef as React.LegacyRef<HTMLUListElement>}
        className="filter-select-items-container hidden"
      >
        <li onClick={handleSelectItem}>pending</li>
        <li onClick={handleSelectItem}>in progress</li>
        <li onClick={handleSelectItem}>done</li>
      </ul>
    </div>
  )
}
