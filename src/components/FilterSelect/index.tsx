import React, { useState } from 'react'
import FilterListIcon from '@mui/icons-material/FilterList'
import './styles.scss'

export const FilterSelect = () => {
  const [filterValue, setFilterValue] = useState<string>('')
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleOpen = () => {
    setIsOpen((prevState) => !prevState)
  }

  const handleSelectItem = (value: string) => {
    if (value !== filterValue) {
      setFilterValue(() => value)
    }
    handleOpen()
  }

  return (
    <div className="filter-select-container">
      <span onClick={handleOpen}>
        <FilterListIcon />
        <label>filter</label>
      </span>

      {isOpen && (
        <ul className="filter-select-items-container">
          <li onClick={() => handleSelectItem('pending')}>pending</li>
          <li onClick={() => handleSelectItem('in progress')}>in progress</li>
          <li onClick={() => handleSelectItem('done')}>done</li>
        </ul>
      )}
    </div>
  )
}
