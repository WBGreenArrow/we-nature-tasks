import React, { useState, useEffect, useRef } from 'react'
import { ITask, useStore } from '../../store'
import { Status } from '../../constants'
import { filterByValue } from '../../utils'
import { Select } from '../../components/Select'
import { Board } from '../../components/Board'
import { PopUpTask } from '../../components/PopUpTask'

import { Search as SearchIcon, Add as AddIcon } from '@mui/icons-material'

import './styles.scss'
import { saveTaskListsToLocalStorage } from '../../utils/localStorageUtils'

export const Tasks = () => {
  const [filterValue, setfilterValue] = useState<string>('')
  const [isOpenPopUpTask, setIsOpenPopUpTask] = useState<boolean>(false)

  const [filterListByStatus, setFilterListByStatus] = useState<ITask[]>([])
  const [pending, setPending] = useState<ITask[]>([])
  const [inProgess, setInProgess] = useState<ITask[]>([])
  const [done, setDone] = useState<ITask[]>([])

  const filterRef = useRef<string>('')

  const { state } = useStore()

  useEffect(() => {
    saveTaskListsToLocalStorage(state)
  }, [state])

  useEffect(() => {
    setFilter()
  }, [filterValue, state])

  const handleOnChangeFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    if (value !== '' && !pending.length && !inProgess.length && !done.length) {
      return
    }

    if (value !== '' && filterValue !== '' && !filterListByStatus.length) {
      return
    }

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

  const handleOpenPopUpTask = (statePopUp: boolean) => {
    setIsOpenPopUpTask(() => statePopUp)
  }

  return (
    <div className="tasks-container">
      <div className="tasks-search-container">
        <div className="tasks-filter-container">
          <Select type="filter" onChange={(value) => setfilterValue(() => value)} />
          <span>
            <SearchIcon />
            <input type="text" placeholder="Search by title, description or date..." onChange={handleOnChangeFilter} />
          </span>
        </div>
        <div className="btn-add-task-container">
          <span className="btn-add-task" onClick={() => handleOpenPopUpTask(true)}>
            <label> new task</label>
            <AddIcon />
          </span>
        </div>
      </div>
      <Board
        pendingTasks={filterValue !== '' ? filterListByStatus : pending}
        inProgressTasks={filterValue !== '' ? filterListByStatus : inProgess}
        doneTasks={filterValue !== '' ? filterListByStatus : done}
        filterValue={filterValue}
      />
      {isOpenPopUpTask && (
        <PopUpTask
          handleOpen={handleOpenPopUpTask}
          task={{ title: '', desc: '', status: 'pending', status_list: 'pendingTasks' }}
        />
      )}
    </div>
  )
}
