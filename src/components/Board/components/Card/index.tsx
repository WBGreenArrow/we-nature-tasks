import React, { useState } from 'react'
import './styles.scss'
import { PopUpTask } from '../../../PopUpTask'
import { ITask } from '../../../../store'

type CardProp = {
  task: ITask
}

export const Card = ({ task }: CardProp) => {
  const [isOpenPopUpTask, setIsOpenPopUpTask] = useState<boolean>(false)

  const handleOpenPopUpTask = (statePopUp: boolean) => {
    setIsOpenPopUpTask(() => statePopUp)
  }

  return (
    <>
      <div className="card-container" onClick={() => handleOpenPopUpTask(true)}>
        <div className="card-header">
          <h5>{task.title}</h5>
          <span>{task.created_at}</span>
        </div>
        <div className="card-body">
          <p>{task.desc}</p>
        </div>
      </div>
      {isOpenPopUpTask && <PopUpTask handleOpen={handleOpenPopUpTask} task={task} />}
    </>
  )
}
