import React,{useContext, useEffect, useState} from 'react'
import { SoamarContext } from '../context/soamarContext'
import './Contagem.css'
import { v4 as uuidv4} from 'uuid'

import { collection, addDoc, getDocs, doc, setDoc, deleteDoc, query, where  } from "firebase/firestore";
import { db, app } from '../services/firebase';
import Loading from './Loading';

const date = new Date()
const dateString = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`

const Contagem = () => {
  const [load, setLoad] = useState(true)
  const [soamarState, dispatch] = useContext(SoamarContext)
  const [ quantidade, setQuantidade] = useState(0)
  const [turmaSelected, setTurmaSelected] = useState('1201')
  const [filterDay, setFilterDay] = useState(null)
  const [listDays, setListDays] = useState([])

  const [contagem, setContagem] = useState([])

  const hadleSafoButton = async () => {
    const result = contagem.find((item, index) => item.turma == turmaSelected)

    if(result){
      await setDoc(doc(db, "contagem", result.uid), {
        turma: turmaSelected,
        quantidade: quantidade,
        createdAt: result.createdAt,
        updatedAt: `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
      });
    } else{
      const docRef = await addDoc(collection(db, 'contagem'),{
        turma: turmaSelected,
        quantidade: quantidade,
        createdAt: `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`,
        updatedAt: `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
      })
    }

    setQuantidade(0)
    handleLoad()
  }

  const handleTotal = () => {
    let result = 0
    contagem.map( item => result += parseInt(item.quantidade))

    return result
  }

  const handleDelete = async (item) => {
    await deleteDoc(doc(db, "contagem", item.uid));

    handleLoad()
  }

  const handleLoad = async (day) => {
    console.log(filterDay)
    setLoad(true)
    const q = query(collection(db, "contagem"), where("createdAt", "==", day ? day : dateString));

    const querySnapshot = await getDocs(q);
    const array = []
    querySnapshot.forEach((doc) => {
      try {
        array.push({
          uid: doc.id,
          ...doc.data()
        })
        
      } catch (error) {
        console.log(error)
      }
    });

    setContagem(array)
    setLoad(false)
  }

  const handleGenetorDays = () => {
    const array = []
    for (let index = 0; index < 10; index++) {
      const day = date.getDate() - index
      if(day > 0){
        array.push(`${day}-${date.getMonth() + 1}-${date.getFullYear()}`)
      }
      
    }

    setListDays(array)
  }

  useEffect(() => {
    handleLoad()
    handleTotal()
    handleGenetorDays()
  }, [])

  return (
    <div className='contagem'>
      <div className="form">
        <div className="box">
          <input type="number" value={quantidade ? quantidade : ""} placeholder="Ex. 25" onChange={(item) => setQuantidade(item.target.value)} maxLength="2" />
          <select name="" id="" onChange={(item) => setTurmaSelected(item.target.value)}>
            { soamarState.turmas.map( (item, index) => (
              <option value={item} key={index} >{item}</option>
            ))}
          </select>
        </div>

        <button onClick={() => hadleSafoButton()}>Safo</button>
      </div>

      <div className="container">
        
        <div className="list_days">
          { listDays && listDays.map( (day, i) => (
            <button className='btn_days' key={i} onClick={ () => handleLoad(day)} >{day}</button>
          ))}
        </div>
            
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

      { load && <Loading/>}

      <div className="footer">
        <p>Total: { handleTotal()}</p>
        <span>{ contagem.length } - turmas</span>
      </div>
    </div>
  )
}

export default Contagem