import React,{useContext, useEffect, useState} from 'react'
import { SoamarContext } from '../context/soamarContext'
import './Contagem.css'
import { v4 as uuidv4} from 'uuid'

import { getDatabase, ref, set, push, child } from "firebase/database";
import { database, app } from '../services/firebase';

const Contagem = () => {
  const [soamarState, dispatch] = useContext(SoamarContext)
  const [ quantidade, setQuantidade] = useState(0)
  const [turmaSelected, setTurmaSelected] = useState('1201')

  const hadleSafoButton = () => {
    dispatch({type: 'INSERT', data: {
      quantidade: quantidade,
      turma: turmaSelected
    }})

    setQuantidade(0)

    const date = new Date()
    const uuid = uuidv4()
    const db = getDatabase();
    set(ref(db, `contagem/${uuid}`), {
      id: uuid,
      turma: turmaSelected,
      quantidade: quantidade,
      createdAt: `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
    });
  }

  const handleTotal = () => {
    let result = 0
    soamarState.turmasContadas.map( item => result += parseInt(item.quantidade))

    return result
  }

  return (
    <div className='contagem'>
      <div className="form">
        <div className="box">
          <input type="number" value={quantidade} onChange={(item) => setQuantidade(item.target.value)} maxLength="2" />
          <select name="" id="" onChange={(item) => setTurmaSelected(item.target.value)}>
            { soamarState.turmas.map( (item, index) => (
              <option value={item} key={index} >{item}</option>
            ))}
          </select>
        </div>

        <button onClick={() => hadleSafoButton()}>Safo</button>
      </div>

      <div className="container">
        {soamarState.turmasContadas.map( (item,index) => (
          <div className="card-turma" key={index}>
            <div className="left">
              <div className="card-header">
                <label htmlFor="">turma</label>
                <h4>{item.turma}</h4>
              </div>

              <div className="card-footer">
                <div className="infos">
                  <span>qnt: <strong>{item.quantidade}</strong></span>
                </div>

                <span>autor: G</span>
              </div>
            </div>

            <div className="rigth">
              <button onClick={() => dispatch({type: 'DELETE_ITEM', data: {
              turma: item.turma
            }})}>X</button>
            </div>
          </div>
        ))}
      </div>

      <div className="footer">
        <p>Total: { handleTotal()}</p>
      </div>
    </div>
  )
}

export default Contagem