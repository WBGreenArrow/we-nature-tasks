import React, { useEffect } from 'react'
import { Outlet as RouterComponent, useNavigate } from 'react-router-dom'
import { SideBar } from '../SideBar'
import './styles.scss'
import { Footer } from '../Footer'

export const Dashboard = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/tasks')
  }, [])

  return (
    <div className="container">
      <SideBar />
      <main className="main-container">
        <div>
          <RouterComponent />
        </div>
        <Footer />
      </main>
    </div>
  )
}
