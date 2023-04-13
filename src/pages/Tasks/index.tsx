import React from 'react'
import { FilterSelect } from '../../components/FilterSelect'
import { Board } from '../../components/Board'
import SearchIcon from '@mui/icons-material/Search'
import './styles.scss'

export const Tasks = () => {
  return (
    <div className="tasks-container">
      <div className="tasks-search-container">
        <FilterSelect />
        <span>
          <SearchIcon />
          <input type="text" placeholder="Search by cards, subjects or guardians..." />
        </span>
      </div>
      <Board />
    </div>
  )
}
