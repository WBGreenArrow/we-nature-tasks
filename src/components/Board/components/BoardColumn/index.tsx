import React from 'react'
import { Grid } from '@mui/material'
import { Card } from '../Card'
import './styles.scss'
import { ITask } from '../../../../pages/Tasks/mock'

type BoardColumnProps = {
  textHeader: string
  data: Array<ITask>
  taskCount: number
}

export const BoardColumn = ({ textHeader, data, taskCount }: BoardColumnProps) => {
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
        {data.map((task) => {
          return (
            <Card
              key={task.id}
              id={task.id}
              title={task.title}
              desc={task.desc}
              status={task.status}
              updatedAtt={task.updated_at}
            />
          )
        })}
      </div>
    </Grid>
  )
}
