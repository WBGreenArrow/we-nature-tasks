import React, { useState } from 'react'
import './styles.scss'
import { PopUpTask } from '../../../PopUpTask'

export type CardProps = {
  id: number
  title: string
  desc: string
  status: string
  updatedAtt: string
}

export const Card = ({ id, title, desc, status, updatedAtt }: CardProps) => {
  const [isOpenPopUpTask, setIsOpenPopUpTask] = useState<boolean>(false)

  const handleOpenPopUpTask = (statePopUp: boolean) => {
    setIsOpenPopUpTask(() => statePopUp)
  }

  return (
    <>
      <div className="card-container" onClick={() => handleOpenPopUpTask(true)}>
        <div className="card-header">
          <h5>{title}</h5>
          <span>{updatedAtt}</span>
        </div>
        <div className="card-body">
          <p>{desc}</p>
        </div>
      </div>
      {isOpenPopUpTask && <PopUpTask handleOpen={handleOpenPopUpTask} data={{ id, title, desc, status, updatedAtt }} />}
    </>
  )
}
