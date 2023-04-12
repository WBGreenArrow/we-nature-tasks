import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import './styles.scss'

type HeaderProps = {
  textHeader: string
}

export const Header = ({ textHeader }: HeaderProps) => {
  return (
    <header className="header-container">
      <h1>{textHeader}</h1>
      <AccountCircleIcon />
    </header>
  )
}
