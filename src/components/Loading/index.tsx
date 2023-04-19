import React from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import './styles.scss'

export const Loading = () => {
  return (
    <Box className="loading-container">
      <CircularProgress size={30} style={{ color: '#fff' }} />
    </Box>
  )
}
