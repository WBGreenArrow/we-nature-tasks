import React from 'react'
import { Grid } from '@mui/material'
import { Card } from '../Card'
import './styles.scss'

type BoardColumnProps = {
  textHeader: string
}

export const BoardColumn = ({ textHeader }: BoardColumnProps) => {
  return (
    <Grid className="board-column-container" item xs>
      <div className="board-column-header">
        <h2>{textHeader}</h2>
      </div>
      <div className="board-column-content">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </Grid>
  )
}
