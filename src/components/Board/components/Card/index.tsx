import React, { useState } from 'react'
import './styles.scss'
import { PopUpTask } from '../../../PopUpTask'

export const Card = () => {
  const [isOpenPopUpTask, setIsOpenPopUpTask] = useState<boolean>(false)

  const handleOpenPopUpTask = (statePopUp: boolean) => {
    setIsOpenPopUpTask(() => statePopUp)
  }

  return (
    <>
      <div className="card-container" onClick={() => handleOpenPopUpTask(true)}>
        <div className="card-header">
          <h5>#Bora Codar</h5>
          <span>13/04/2023</span>
        </div>
        <div className="card-body">
          <p>Novo desafio do #boraCodar da Rocketseat, onde é proposto construir um quadro de Kanban.</p>
        </div>
      </div>
      <PopUpTask handleOpen={handleOpenPopUpTask} isOpen={isOpenPopUpTask} />
    </>
  )
}
