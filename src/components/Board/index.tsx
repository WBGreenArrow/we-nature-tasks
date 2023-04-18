import React from 'react'
import { ITask } from '../../store'
import { BoardColumn } from './components/BoardColumn'

import { Grid } from '@mui/material'

import './styles.scss'

type BoardProps = {
  pendingTasks: Array<ITask>
  inProgressTasks: Array<ITask>
  doneTasks: Array<ITask>
  filterValue: string
}

export const Board = ({ pendingTasks, inProgressTasks, doneTasks, filterValue }: BoardProps) => {
  return (
    <div className="board-container">
      <Grid className="board-content" container spacing={2}>
        <BoardColumn
          textHeader="pending"
          taskList={pendingTasks}
          taskCount={pendingTasks?.length}
          filterValue={filterValue}
        />
        <BoardColumn
          textHeader="in progress"
          taskList={inProgressTasks}
          taskCount={inProgressTasks?.length}
          filterValue={filterValue}
        />
        <BoardColumn textHeader="done" taskList={doneTasks} taskCount={doneTasks?.length} filterValue={filterValue} />
      </Grid>
    </div>
  )
}
