import React, { useState } from 'react'
import { ITask } from '../../../../store'
import { formatDate, formatTextOverflow } from '../../../../utils'
import { PopUpTask } from '../../../PopUpTask'

import './styles.scss'

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

          <span>{formatDate(task.updated_at || '')}</span>
        </div>
        <div className="card-body">
          <p>{formatTextOverflow(task.desc)}</p>
        </div>
      </div>
      {isOpenPopUpTask && <PopUpTask handleOpen={handleOpenPopUpTask} task={task} />}
    </>
  )
}
