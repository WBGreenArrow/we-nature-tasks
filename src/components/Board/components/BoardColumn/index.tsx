import React from 'react'
import { Grid } from '@mui/material'
import { Card } from '../Card'
import './styles.scss'
import { ITask } from '../../../../store'

type BoardColumnProps = {
  textHeader: string
  taskList: Array<ITask>
  taskCount: number
}

export const BoardColumn = ({ textHeader, taskCount, taskList }: BoardColumnProps) => {
  return (
    <Grid className="board-column-container" item xs>
      <div className="board-column-header">
        <span>
          <label>
            {textHeader}
            {taskCount > 0 && <span>{taskCount}</span>}
          </label>
        </span>
      </div>
      <div className="board-column-content">
        {taskList.map((taskData) => {
          return <Card key={taskData.id} task={taskData} />
        })}
      </div>
    </Grid>
  )
}
