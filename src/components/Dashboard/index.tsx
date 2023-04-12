import React, { useState, useEffect } from 'react'
import { Outlet as RouterComponent, useNavigate } from 'react-router-dom'
import { SideBar } from '../SideBar'
import './styles.scss'
import { Footer } from '../Footer'
import { Header } from '../Header'

export const DashBoard = () => {
  const [currentRouter, setCurrentRouter] = useState<string>('tasks')
  const navigate = useNavigate()

  const handleChangeRouter = (routerName: string) => {
    setCurrentRouter(() => routerName)
  }

  useEffect(() => {
    navigate(`/${currentRouter}`)
  }, [currentRouter])

  return (
    <div className="container">
      <SideBar changeRouter={handleChangeRouter} />
      <main className="main-container">
        <Header textHeader={currentRouter} />
        <RouterComponent />
        <Footer />
      </main>
    </div>
  )
}
