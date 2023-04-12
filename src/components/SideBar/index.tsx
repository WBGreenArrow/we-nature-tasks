import React from 'react'
import tasksIcon from '../../assets/tasks-icon.svg'
import './styles.scss'

export const SideBar = () => {
  return (
    <aside className="side-bar-container">
      <img src="https://www.lognature.com.br/wp-content/uploads/2022/04/logo-log.png" alt="logo of logonature" />

      <ul className="side-bar-content">
        <li className="side-bar-item active">
          <img src={tasksIcon} alt="icon" />
          <span>Tarefas</span>
        </li>
        <li className="side-bar-item">
          <img src={tasksIcon} alt="icon" />
          <span>Tarefas</span>
        </li>
        <li className="side-bar-item">
          <img src={tasksIcon} alt="icon" />
          <span>Tarefas</span>
        </li>
        <li className="side-bar-item">
          <img src={tasksIcon} alt="icon" />
          <span>Tarefas</span>
        </li>
        <li className="side-bar-item">
          <img src={tasksIcon} alt="icon" />
          <span>Tarefas</span>
        </li>
      </ul>
    </aside>
  )
}
