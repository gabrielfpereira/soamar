import React,{useContext, useEffect, useState} from 'react'
import { SoamarContext } from '../context/soamarContext'
import './Contagem.css'
import { v4 as uuidv4} from 'uuid'

import { getDatabase, ref, set, push, child, query, orderByChild, get, remove } from "firebase/database";
import { database, app } from '../services/firebase';

const db = getDatabase();
const date = new Date()
const dateString = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`

const Contagem = () => {
  const [soamarState, dispatch] = useContext(SoamarContext)
  const [ quantidade, setQuantidade] = useState(0)
  const [turmaSelected, setTurmaSelected] = useState('1201')

  const [contagem, setContagem] = useState([])

  const hadleSafoButton = () => {
    const result = contagem.find((item, index) => item.turma == turmaSelected)
    let uuid = uuidv4()

    if(result){
      uuid = result.id
    }
    
    
    set(ref(db, `contagem/${dateString}/${uuid}`), {
      id: uuid,
      turma: turmaSelected,
      quantidade: quantidade,
      createdAt: `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
    });
    
    setQuantidade(0)
    handleLoad()
  }

  const handleTotal = () => {
    let result = 0
    contagem.map( item => result += parseInt(item.quantidade))

    return result
  }

  const handleDelete = (item) => {
    remove(ref(db, `contagem/${item.createdAt}/${item.id}`))
    handleLoad()
  }

  const handleLoad = () => {
    get(child(ref(db), `contagem/${dateString}`)).then((snapshot) => {
      const array = []
      if (snapshot.exists()) {
        const data = snapshot.val()

        if( data != null) {
              Object.values(data).map( (item) => {
                  array.push(item)
              })
          }
        } else {
          console.log("No data available");
        }

        setContagem(array)
      }).catch((error) => {
        console.error(error);
    });
  }

  useEffect(() => {
    handleLoad()
    handleTotal()
    console.log(contagem)
  }, [])

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
        { contagem.map( (item,index) => (
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
              <button onClick={() => handleDelete(item)}>X</button>
            </div>
          </div>
        ))}
      </div>

      <div className="footer">
        <p>Total: { handleTotal()}</p>
        <span>{ contagem.length } - turmas</span>
      </div>
    </div>
  )
}

export default Contagem