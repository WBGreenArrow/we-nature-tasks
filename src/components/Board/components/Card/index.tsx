import React from 'react'
import './styles.scss'

export const Card = () => {
  return (
    <div className="card-container">
      <div className="card-header">
        <h5>#Bora Codar</h5>
        <span>13/04/2023</span>
      </div>
      <div className="card-body">
        <p>Novo desafio do #boraCodar da Rocketseat, onde é proposto construir um quadro de Kanban.</p>
      </div>
    </div>
  )
}
