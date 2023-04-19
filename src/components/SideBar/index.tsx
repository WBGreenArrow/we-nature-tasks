import React, { useState } from 'react'
import {
  Task as TaskIcon,
  Group as GroupIcon,
  Assignment as AssignmentIcon,
  Settings as SettingsIcon,
  Close as CloseIcon,
} from '@mui/icons-material'

import './styles.scss'

type SideBarProps = {
  changeRouter: (routerName: string) => void
}

export const SideBar = ({ changeRouter }: SideBarProps) => {
  const [currentItemActiveId, setCurrentItemActiveId] = useState<string>('item-1')
  const siderBarElement = document.querySelector('.side-bar-container')

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
      let routerName = itemToActiveElement?.getAttribute('router-name') || ''

      itemToActiveElement.classList.add('active')
      changeRouter(routerName)
      setCurrentItemActiveId(() => itemToActiveElement.id)
    }
    if (siderBarElement?.classList.contains('show-side-bar-menu')) {
      handleCloseSideBarMenu()
    }
  }

  const handleCloseSideBarMenu = () => {
    siderBarElement?.classList.remove('show-side-bar-menu')
  }

  return (
    <aside className="side-bar-container">
      <span className="hidden-side-bar-btn">
        <CloseIcon onClick={handleCloseSideBarMenu} />
      </span>
      <img src="https://www.lognature.com.br/wp-content/uploads/2022/04/logo-log.png" alt="logo of logonature" />
      <ul className="side-bar-content">
        <li id="item-1" className="side-bar-item active" router-name="tasks" onClick={handleChangeActiveTab}>
          {<TaskIcon />}
          <span>Tasks</span>
        </li>
        <li id="item-2" className="side-bar-item" router-name="teams" onClick={handleChangeActiveTab}>
          <GroupIcon />
          <span>Teams</span>
        </li>
        <li id="item-3" className="side-bar-item" router-name="reports" onClick={handleChangeActiveTab}>
          <AssignmentIcon />
          <span>Reports</span>
        </li>
        <li id="item-4" className="side-bar-item" router-name="settings" onClick={handleChangeActiveTab}>
          <SettingsIcon />
          <span>Settings</span>
        </li>
      </ul>
    </aside>
  )
}
