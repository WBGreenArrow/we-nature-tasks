import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { ITask, useStore } from '../../store'
import { StatusList } from '../../constants'
import { formatDate } from '../../utils'
import { Select } from '../Select'
import { Loading } from '../Loading'

import { Modal, Box } from '@mui/material'
import { Delete as DeleteIcon, Clear as CloseIcon } from '@mui/icons-material/'

import './styles.scss'

type PopUpTaskProps = {
  handleOpen: (statePopUp: boolean) => void
  task: ITask
}

export const PopUpTask = ({ handleOpen, task }: PopUpTaskProps) => {
  const [titleValue, setTitleValue] = useState<string>(task.title)
  const [descValue, setDescValue] = useState<string>(task.desc)
  const [statusValue, setStatusValue] = useState<string>(task.status)
  const [isSaving, setIsSaving] = useState<'save' | 'delete' | ''>('')

  const { actions } = useStore()

  const handleClose = (event: React.MouseEvent, reason: string = '') => {
    if (reason && reason === 'backdropClick' && 'escapeKeyDown') return

    handleOpen(false)
  }

  const handleDeleteTask = async (task: ITask) => {
    if (isSaving === 'delete') return

    setIsSaving('delete')
    await notify('task deleted successfully!')
    actions.taskRemove(task)

    handleOpen(false)
    setIsSaving('')
  }

  const handleSaveTask = async () => {
    if (isSaving === 'save') return
    const currenTask = {
      ...task,
      title: titleValue,
      desc: descValue,
      status: statusValue,
    }
    setIsSaving('save')
    if (currenTask.id) {
      actions.taskUpdate(currenTask)
      await notify('task updated successfully!')
    } else {
      actions.createTask(currenTask)
      await notify('task created successfully!')
    }
    handleOpen(false)
    setIsSaving('')
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

  const notify = async (message: string) => {
    await new Promise<void>((resolve) =>
      setTimeout(() => {
        toast.success(message)
        resolve(void 0)
      }, 1000),
    )
  }

  return (
    <>
      <Modal open={true} onClose={handleClose} sx={{ margin: '32px' }}>
        <Box className="pop-up-container-main">
          <div className="pop-up-header-container">
            <h2>Create Task</h2>
            <p>Create your task with title description and status :)</p>
            <span onClick={handleClose}>
              <CloseIcon />
            </span>
          </div>
          <div className="pop-up-form-content">
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
                    {isSaving == 'delete' ? (
                      <Loading />
                    ) : (
                      <>
                        <label>Delete</label>
                        <DeleteIcon />
                      </>
                    )}
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
              {isSaving === 'save' ? <Loading /> : 'Save'}
            </span>
          </div>
        </Box>
      </Modal>
    </>
  )
}
