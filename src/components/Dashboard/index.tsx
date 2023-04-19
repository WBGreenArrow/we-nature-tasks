import React, { useState, useEffect } from 'react'
import { Outlet as RouterComponent, useNavigate } from 'react-router-dom'
import { SideBar } from '../SideBar'
import { Header } from '../Header'
import { Footer } from '../Footer'
import { Dehaze as MenuIcon } from '@mui/icons-material'

import './styles.scss'

export const DashBoard = () => {
  const [currentRouter, setCurrentRouter] = useState<string>('tasks')
  const navigate = useNavigate()

  const handleChangeRouter = (routerName: string) => {
    setCurrentRouter(() => routerName)
  }

  const handleSideBarMenu = () => {
    const sideBarElement = document.querySelector('.side-bar-container')
    sideBarElement?.classList.add('show-side-bar-menu')
  }

  useEffect(() => {
    navigate(`/${currentRouter}`)
  }, [currentRouter])

  return (
    <div className="container">
      <SideBar changeRouter={handleChangeRouter} />
      <main className="main-container">
        <span className="menu-hamburger">
          <MenuIcon onClick={handleSideBarMenu} />
        </span>
        <Header textHeader={currentRouter} />
        <RouterComponent />
        <Footer />
      </main>
    </div>
  )
}
