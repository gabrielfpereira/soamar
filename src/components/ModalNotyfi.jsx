import React, { useState } from 'react'
import './ModalNotyfi.css'
import turmas from '../data/turmas'

const ModalNotyfi = ({toggleModal, notyfi}) => {

  return (
    <div className='modal'>
        <div className="modal-box">
            <button className='close' onClick={() => toggleModal()}>x</button>
            <h2>Atualizar</h2>

            <input type="text" value={notyfi.name} />

            <select className='' defaultValue={notyfi.class}>
                {turmas.map((turma, index) => (
                    <option value={turma} key={index}>{turma}</option>
                ))}
            </select>

            <div className="">
                <select name="" id="" defaultValue={notyfi.category}>
                    <option value="Infração">Infração</option>
                    <option value="Medida">Medida</option>
                </select>
            </div>

            <div className="">
                <select name="" id="" defaultValue={notyfi.status}>
                    <option value="Entregue">Entregue</option>
                    <option value="pending">Pendente</option>
                </select>
            </div>

            <button className='atualizar'>Atualizar</button>
        </div>
    </div>
  )
}

export default ModalNotyfi