import React,{useContext, useEffect, useState} from 'react'
import { SoamarContext } from '../context/soamarContext'
import './Contagem.css'

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
          <p key={index}>{item.turma} - {item.quantidade} - <button onClick={() => dispatch({type: 'DELETE_ITEM', data: {
            turma: item.turma
          }})}>X</button></p>
        ))}
      </div>

      <div className="footer">
        <p>Total: { handleTotal()}</p>
      </div>
    </div>
  )
}

export default Contagem