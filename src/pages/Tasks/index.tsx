import React, { useState, useEffect, useRef } from 'react'
import { Select } from '../../components/Select'
import { Board } from '../../components/Board'
import SearchIcon from '@mui/icons-material/Search'

import { ITask, useStore } from '../../store'
import './styles.scss'
import { Status } from '../../constants'
import { filterByValue } from '../../utils'

export const Tasks = () => {
  const [filterValue, setfilterValue] = useState<string>('')

  const [filterListByStatus, setFilterListByStatus] = useState<ITask[] | []>([])
  const [pending, setPending] = useState<ITask[] | []>([])
  const [inProgess, setInProgess] = useState<ITask[] | []>([])
  const [done, setDone] = useState<ITask[] | []>([])

  const filterRef = useRef<string>('')

  const { state } = useStore()

  useEffect(() => {
    setFilter()
  }, [filterValue, state])

  const handleOnChangeFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    if (filterValue === '') {
      setPending(() => filterByValue(value, state.pendingTasks))
      setInProgess(() => filterByValue(value, state.inProgressTasks))
      setDone(() => filterByValue(value, state.doneTasks))
      return
    }

    if (value === '') {
      setPending(() => state.pendingTasks)
      setInProgess(() => state.inProgressTasks)
      setDone(() => state.doneTasks)
      setFilterListByStatus(() => state[filterRef.current])
      return
    }

    setFilterListByStatus(() => filterByValue(value, state[filterRef.current]))
  }

  const setFilter = () => {
    if (filterValue === Status.PENDING) {
      setFilterListByStatus(() => state.pendingTasks)
      filterRef.current = 'pendingTasks'
    } else if (filterValue === Status.IN_PROGRESS) {
      setFilterListByStatus(() => state.inProgressTasks)
      filterRef.current = 'inProgressTasks'
    } else if (filterValue === Status.DONE) {
      setFilterListByStatus(() => state.doneTasks)
      filterRef.current = 'doneTasks'
    } else {
      setPending(() => state.pendingTasks)
      setInProgess(() => state.inProgressTasks)
      setDone(() => state.doneTasks)
    }
  }

  return (
    <div className="tasks-container">
      <div className="tasks-search-container">
        <Select type="filter" onChange={(value) => setfilterValue(() => value)} />
        <span>
          <SearchIcon />
          <input type="text" placeholder="Search by cards, subjects or guardians..." onChange={handleOnChangeFilter} />
        </span>
      </div>
      <Board
        pendingTasks={filterValue !== '' ? filterListByStatus : pending}
        inProgressTasks={filterValue !== '' ? filterListByStatus : inProgess}
        doneTasks={filterValue !== '' ? filterListByStatus : done}
        filterValue={filterValue}
      />
    </div>
  )
}
