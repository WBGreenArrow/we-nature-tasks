import React from 'react'
import { BoardColumn } from './components/BoardColumn'
import { Grid } from '@mui/material'
import './styles.scss'

import { ITask } from '../../store'

type BoardProps = {
  pendingTasks: Array<ITask>
  inProgressTasks: Array<ITask>
  doneTasks: Array<ITask>
}

export const Board = ({ pendingTasks, inProgressTasks, doneTasks }: BoardProps) => {
  return (
    <div className="board-container">
      <Grid className="board-content" container spacing={2}>
        <BoardColumn textHeader="pending" taskList={pendingTasks} taskCount={pendingTasks.length} />
        <BoardColumn textHeader="in progress" taskList={inProgressTasks} taskCount={inProgressTasks.length} />
        <BoardColumn textHeader="done" taskList={doneTasks} taskCount={doneTasks.length} />
      </Grid>
    </div>
  )
}
