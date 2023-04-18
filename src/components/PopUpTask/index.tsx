import React, { useState } from 'react'
import { Select } from '../Select'

import { Modal, Box } from '@mui/material'
import { Delete as DeleteIcon, Clear as CloseIcon } from '@mui/icons-material/'

import './styles.scss'
import { ITask, useStore } from '../../store'
import { formatDate } from '../../utils'

type PopUpTaskProps = {
  handleOpen: (statePopUp: boolean) => void
  task: ITask
}

enum StatusList {
  'pending' = 'pendingTasks',
  'in progress' = 'inProgressTasks',
  'done' = 'doneTasks',
}

export const PopUpTask = ({ handleOpen, task }: PopUpTaskProps) => {
  const [titleValue, setTitleValue] = useState<string>(task.title)
  const [descValue, setDescValue] = useState<string>(task.desc)
  const [statusValue, setStatusValue] = useState<string>(task.status)

  const { actions } = useStore()

  const handleClose = (event: React.MouseEvent, reason: string = '') => {
    if (reason && reason === 'backdropClick' && 'escapeKeyDown') return

    handleOpen(false)
    handleCleanValues()
  }

  const handleDeleteTask = (task: ITask) => {
    actions.taskRemove(task)
    handleOpen(false)
  }

  const handleSaveTask = () => {
    const currenTask = {
      ...task,
      title: titleValue,
      desc: descValue,
      status: statusValue,
    }
    if (currenTask.id) {
      actions.taskUpdate(currenTask)
    } else {
      actions.createTask(currenTask)
    }
    handleOpen(false)
  }

  const handleChangeTitleValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setTitleValue(() => value)
  }

  const handleChangeSelectValue = (value: ITask['status']) => {
    if (!task.id) {
      task['status_list'] = StatusList[value as keyof typeof StatusList]
    }
    setStatusValue(() => value)
  }

  const handleChangeDescValue = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target
    setDescValue(() => value)
  }

  const handleCleanValues = () => {
    setTitleValue(() => '')
    setDescValue(() => '')
  }

  return (
    <>
      <Modal open={true} onClose={handleClose} sx={{ margin: '32px' }}>
        <Box className="pop-up-container">
          <div className="pop-up-header-container">
            <h2>Create Task</h2>
            <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
            <span onClick={handleClose}>
              <CloseIcon />
            </span>
          </div>
          <div className="pop-up-form-container">
            <div className="pop-up-form-content-fields">
              <span className="pop-up-form-text">
                <label>Title:</label>
                <input type="text" placeholder="" value={titleValue || ''} onChange={handleChangeTitleValue} />
              </span>
              <span className="pop-up-form-text">
                <label>Description:</label>
                <textarea value={descValue || ''} onChange={handleChangeDescValue} />
              </span>
            </div>
            <div className="pop-up-form-container">
              <div className="pop-up-form-btns-container">
                <span className="select-container">
                  <label>Status:</label>
                  <Select type="select" value={statusValue} onChange={(value) => handleChangeSelectValue(value)} />
                </span>
                {task.id && (
                  <span className="delete-btn-container" onClick={() => handleDeleteTask(task)}>
                    <label>Delete</label>
                    <DeleteIcon />
                  </span>
                )}
              </div>
              {task.id && (
                <div className="pop-up-form-info-container">
                  <span>
                    <label>Modified:</label>
                    <span>{formatDate(task.updated_at || '')}</span>
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="pop-up-form-footer-container">
            <span className="save-btn-container" onClick={handleSaveTask}>
              Save
            </span>
          </div>
        </Box>
      </Modal>
    </>
  )
}
