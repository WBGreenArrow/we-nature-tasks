import React, { useEffect } from 'react'
import { Grid } from '@mui/material'
import { Card } from '../Card'
import './styles.scss'
import { ITask } from '../../../../store'

type BoardColumnProps = {
  textHeader: string
  taskList: Array<ITask>
  taskCount: number
  filterValue: string
}

export const BoardColumn = ({ textHeader, taskCount, taskList, filterValue }: BoardColumnProps) => {
  const columnElement = document.getElementById(`column-${textHeader}`)

  useEffect(() => {
    if (columnElement?.classList.contains('hidden-column')) {
      columnElement?.classList.remove('hidden-column')
    }

    if (filterValue !== '' && filterValue !== textHeader) {
      columnElement?.classList.add('hidden-column')
    }
  }, [filterValue])

  return (
    <Grid
      id={`column-${textHeader}`}
      className="board-column-container"
      style={filterValue !== '' ? { margin: 0 } : {}}
      item
      xs
    >
      <div className="board-column-header">
        <span>
          <label>
            {textHeader}
            {taskCount > 0 && <span>{taskCount}</span>}
          </label>
        </span>
      </div>
      <div className="board-column-content">
        {taskList?.map((taskData) => {
          return <Card key={taskData.id} task={taskData} />
        })}
      </div>
    </Grid>
  )
}
