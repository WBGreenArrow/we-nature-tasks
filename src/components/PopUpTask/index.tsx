import React, { useEffect } from 'react'
import { Select } from '../Select'

import { Modal, Box } from '@mui/material'
import { Delete as DeleteIcon, Clear as CloseIcon } from '@mui/icons-material/'

import './styles.scss'

type PopUpTaskProps = {
  isOpen: boolean
  handleOpen: (statePopUp: boolean) => void
}

export const PopUpTask = ({ isOpen, handleOpen }: PopUpTaskProps) => {
  useEffect(() => {
    isOpen && handleOpen(true)

    return () => handleOpen(false)
  }, [isOpen])

  const handleClose = (event: React.MouseEvent, reason: string = '') => {
    if (reason && reason === 'backdropClick' && 'escapeKeyDown') return
    handleOpen(false)
  }

  const handleDeleteTask = () => {
    console.log('deleting')
  }

  return (
    <>
      <Modal open={isOpen} onClose={handleClose} sx={{ margin: '32px' }}>
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
                <input type="text" placeholder="" />
              </span>
              <span className="pop-up-form-text">
                <label>Description:</label>
                <textarea />
              </span>
            </div>
            <div className="pop-up-form-container">
              <div className="pop-up-form-btns-container">
                <span className="select-container">
                  <label>Status:</label>
                  <Select type="select" />
                </span>

                <span className="delete-btn-container" onClick={handleDeleteTask}>
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
            <span className="save-btn-container" onClick={handleDeleteTask}>
              Save
            </span>
          </div>
        </Box>
      </Modal>
    </>
  )
}
