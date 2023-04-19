import React, { useEffect, useState } from 'react'
import { ITask } from '../../../../store'
import { formatDate } from '../../../../utils'
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

  const formatTextOverflow = (text: string) => {
    let maxCaracter = 160

    if (text.length > maxCaracter) {
      return `${text.slice(0, maxCaracter)}...`
    }
    return text
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
