import React, { useState } from 'react'
import {
  Task as TaskIcon,
  Group as GroupIcon,
  Assignment as AssignmentIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material'

import './styles.scss'

export const SideBar = () => {
  const [currentItemActiveId, setCurrentItemActiveId] = useState<string>('item-1')

  const handleChangeActiveTab = (event: React.MouseEvent<HTMLElement>) => {
    const currentItemElement = document.getElementById(currentItemActiveId)
    const itemToActiveElement = document.getElementById(event.currentTarget.id)

    if (currentItemElement?.id === itemToActiveElement?.id) {
      return
    }

    if (currentItemElement) {
      currentItemElement.classList.remove('active')
    }

    if (itemToActiveElement) {
      itemToActiveElement.classList.add('active')
      setCurrentItemActiveId(() => itemToActiveElement.id)
    }
  }

  return (
    <aside className="side-bar-container">
      <img src="https://www.lognature.com.br/wp-content/uploads/2022/04/logo-log.png" alt="logo of logonature" />
      <ul className="side-bar-content">
        <li id="item-1" className="side-bar-item active" onClick={handleChangeActiveTab}>
          {<TaskIcon />}
          <span>Tarefas</span>
        </li>
        <li id="item-2" className="side-bar-item" onClick={handleChangeActiveTab}>
          <GroupIcon />
          <span>Equipes</span>
        </li>
        <li id="item-3" className="side-bar-item" onClick={handleChangeActiveTab}>
          <AssignmentIcon />
          <span>Relatórios</span>
        </li>
        <li id="item-4" className="side-bar-item" onClick={handleChangeActiveTab}>
          <SettingsIcon />
          <span>Ajustes</span>
        </li>
      </ul>
    </aside>
  )
}
