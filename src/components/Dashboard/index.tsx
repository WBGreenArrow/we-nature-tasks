import React from 'react'
import { SideBar } from '../SideBar'
import './styles.scss'
import { Footer } from '../Footer'

export const Dashboard = () => {
  return (
    <div className="container">
      <SideBar />
      <main className="main-container">
        <Footer />
      </main>
    </div>
  )
}
