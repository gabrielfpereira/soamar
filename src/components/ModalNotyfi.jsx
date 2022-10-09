import React, { useState } from 'react'
import './ModalNotyfi.css'
import turmas from '../data/turmas'

import { collection, addDoc, getDocs, doc, setDoc, deleteDoc, query, where  } from "firebase/firestore";
import { db, app } from '../services/firebase';

const date = new Date()
const dateString = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`

const ModalNotyfi = ({toggleModal, notyfi, handleLoad}) => {
    const [name, setName] = useState(notyfi.name)
    const [category, setCategory] = useState(notyfi.category)
    const [status, setStatus] = useState(notyfi.status)
    const [classScool, setClassScool] = useState(notyfi.class)
    
    const createdAt = notyfi.createdAt
    const uid = notyfi.uid

    const handleSubmit = async () => {
        const student = {
            name,
            category,
            status,
            class: classScool,
            createdAt,
            updatedAt: `${dateString}`
        }

        toggleModal()
        handleLoad()
        await setDoc(doc(db, "notifications", uid), student);

    }

  return (
    <div className='modal'>
        <div className="modal-box">
            <button className='close' onClick={() => toggleModal()}>x</button>
            <h2>Atualizar</h2>

            <input type="text" value={name} onChange={ e => setName(e.target.value)}  />

            <select value={classScool} onChange={(e) => setClassScool(e.target.value)}>
                {turmas.map((turma, index) => (
                    <option value={turma} key={index}>{turma}</option>
                ))}
            </select>

            <div>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="Infração">Infração</option>
                    <option value="Medida">Medida</option>
                </select>
            </div>

            <div>
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="Entregue">Entregue</option>
                    <option value="pending">Pendente</option>
                </select>
            </div>

            <button className='atualizar' onClick={handleSubmit}>Atualizar</button>
        </div>
    </div>
  )
}

export default ModalNotyfi