import React from 'react'
import { BoardColumn } from './components/BoardColumn'
import { Grid } from '@mui/material'
import './styles.scss'

export const Board = () => {
  return (
    <div className="board-container">
      <Grid className="board-content" container spacing={2}>
        <BoardColumn textHeader="pedding" />
        <BoardColumn textHeader="in progress" />
        <BoardColumn textHeader="done" />
      </Grid>
    </div>
  )
}
