import React from 'react'
import { Select } from '../../components/Select'
import { Board } from '../../components/Board'
import SearchIcon from '@mui/icons-material/Search'

import { data } from './mock'
import './styles.scss'

export const Tasks = () => {
  return (
    <div className="tasks-container">
      <div className="tasks-search-container">
        <Select type="filter" onChange={(value) => console.log(value)} />
        <span>
          <SearchIcon />
          <input type="text" placeholder="Search by cards, subjects or guardians..." />
        </span>
      </div>
      <Board data={data} />
    </div>
  )
}
