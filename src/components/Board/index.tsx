import React, { useEffect } from 'react'
import { BoardColumn } from './components/BoardColumn'
import { Grid } from '@mui/material'
import './styles.scss'

import { ITask, useStore } from '../../store'

type BoardProps = {
  data: Array<ITask>
}

export const Board = ({ data }: BoardProps) => {
  const { state, actions } = useStore()

  useEffect(() => {
    const pedding = handleFiterByStatus('pedding')
    const inProgress = handleFiterByStatus('in progress')
    const done = handleFiterByStatus('done')

    actions.setPeddingTasks(pedding)
    actions.setInProgressTasks(inProgress)
    actions.setDoneTasks(done)
  }, [])

  useEffect(() => {
    console.log(state)
  }, [state])

  const handleFiterByStatus = (status: string) => {
    if (data.length) {
      const tasksFiltered = data.filter((task) => task.status === status)
      return tasksFiltered
    }
    return []
  }

  return (
    <div className="board-container">
      <Grid className="board-content" container spacing={2}>
        <BoardColumn textHeader="pedding" taskList={state.peddingTasks} taskCount={state.peddingTasks.length} />
        <BoardColumn
          textHeader="in progress"
          taskList={state.inProgressTasks}
          taskCount={state.inProgressTasks.length}
        />
        <BoardColumn textHeader="done" taskList={state.doneTasks} taskCount={state.doneTasks.length} />
      </Grid>
    </div>
  )
}
