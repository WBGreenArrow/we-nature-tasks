import React, { useState } from 'react'
import { Select } from '../Select'

import { Modal, Box } from '@mui/material'
import { Delete as DeleteIcon, Clear as CloseIcon } from '@mui/icons-material/'

import './styles.scss'
import { CardProps } from '../Board/components/Card'
import { useStore } from '../../store'

type PopUpTaskProps = {
  handleOpen: (statePopUp: boolean) => void
  data: CardProps
}

export const PopUpTask = ({ handleOpen, data }: PopUpTaskProps) => {
  const [titleValue, setTitleValue] = useState<string>(data.title)
  const [descValue, setDescValue] = useState<string>(data.desc)
  const [statusValue, setStatusValueValue] = useState<string>(data.status)

  const { actions } = useStore()

  const handleClose = (event: React.MouseEvent, reason: string = '') => {
    if (reason && reason === 'backdropClick' && 'escapeKeyDown') return

    handleOpen(false)
    handleCleanValues()
  }

  const handleDeleteTask = (id: number) => {
    actions.removeTaskById(id)
    handleOpen(false)
  }

  const handleSaveTask = () => {
    console.log('saving')
  }

  const handleChangeTitleValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setTitleValue(() => value)
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
                  <Select type="select" value={statusValue} onChange={(value) => console.log(value)} />
                </span>

                <span className="delete-btn-container" onClick={() => handleDeleteTask(data.id)}>
                  <label>Delete</label>
                  <DeleteIcon />
                </span>
              </div>
              <div className="pop-up-form-info-container">
                <span>
                  <label>Modified:</label>
                  <span>15/04/2023</span>
                </span>
              </div>
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
