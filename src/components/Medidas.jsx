import React,{useState, useEffect, useContext} from 'react'
import './Medidas.css'
import turmas from  '../data/turmas'
import ModalNotyfi from './ModalNotyfi'

import { collection, addDoc, getDocs, doc, setDoc, deleteDoc, query, where  } from "firebase/firestore";
import { db, app } from '../services/firebase';
import Loading from './Loading';

const date = new Date()
const dateString = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`


const Medidas = ({handleHomeScreen}) => {
  const [notifications, setNotifications] = useState([])
  const [name, setName] = useState('')
  const [classScool, setClassScool] = useState('1201')
  const [category, setCategory] = useState('')
  const [modalHidden, setModalHidden] = useState(false)
  const [notyfiForUpdate, setNotyfiForUpdate] = useState({})
  const [load, setLoad] = useState(false)

  const handleBackButton = () => {
    handleHomeScreen()
  }

  const handleCategoryChange = (value) => {
    setCategory(value)
  }

  const handleClassScoolChange = (value) => {
    setClassScool(value)
    console.log(classScool)
  }

  const handleSaveNotification = async () => {
    // set(ref(db, `notifications/${uuid}`), {
    //     name: name,
    //     class: classScool,
    //     category: category,
    //     status: 'pending',
    //     id: uuid,
    //     createdAt: `${now.getDate()}-${now.getMonth()}-${now.getFullYear()}`,
    //     updatedAt: `${now.getDate()}-${now.getMonth()}-${now.getFullYear()}`,
    // })

    const docRef = await addDoc(collection(db, 'notifications'),{
      name: name,
      class: classScool,
      category: category,
      status: 'pending',
      createdAt: `${dateString}`,
      updatedAt: `${dateString}`
    })

    clearStates()
    handleLoad()
  }

  const clearStates = () => {
    setName('')
    setCategory('')
    setClassScool('')
  }

  
  const handleDelete = async (notify) => {
    console.log(notify)
    await deleteDoc(doc(db, "notifications", notify.uid));

    handleLoad()
  }

  const handleUpdate = (notify) => {
    toggleModal()
    setNotyfiForUpdate(notify)
  }

  const toggleModal = () => {
    setModalHidden(!modalHidden)
  }

  const handleLoad = async () => {
    setLoad(true)
    const querySnapshot = await getDocs(collection(db, 'notifications'));
    const array = []
    querySnapshot.forEach((doc) => {
      try {
        array.push({
          uid: doc.id,
          ...doc.data()
        })
        
      } catch (error) {
        // console.log(error)
      }
    });

    setNotifications(array)
    setLoad(false)
  }

  useEffect(() => {
   handleLoad()
  },[])

  
  return (
    <div className='notificacao'>
      <button className='btn-back' onClick={handleBackButton} >{'<'}</button>
      <h2>Medidas e Infrações</h2>

      <div className="form">
        <input type="text" name="fullName" placeholder='Nome do aluno' value={name} onChange={(e) => setName(e.target.value)} />

        <select className='turmas' onChange={(e) => handleClassScoolChange(e.target.value)} value={classScool}>
          {turmas.map((turma, index) => (
            <option value={turma} key={index}>{turma}</option>
          ))}
        </select>

        <div className="categoria">
          <div className="categoria_info">
            <label htmlFor="medida">Medida</label>
            <input type="radio" name="categoria" value={'Medida'} id="medida" onChange={(e) => handleCategoryChange(e.target.value)} />
          </div>

          <div className="categoria_info">
            <label htmlFor="infracao">Infração</label>
              <input type="radio" name="categoria" value={'Infração'} id="infracao" onChange={(e) => handleCategoryChange(e.target.value)} />
          </div>
        </div>

        <button onClick={() => handleSaveNotification()}>Safo</button>
      </div>

      <hr />

      <div className="container">
        
      { load ? <Loading /> : 
        notifications.length ? notifications.map( (notify, index) => (
            <div className="card" key={index}>
                <div className="left">
                <h3>{notify.name}</h3>
                <div className="infos">
                    <span>{notify.class}</span>
                    <span>situação: {notify.status}</span>
                    <span>{notify.category}</span>
                </div>         
                </div>
                
                <div className="rigth">
                <button onClick={() => handleDelete(notify)}>excluir</button>
                <button onClick={() => handleUpdate(notify)}>editar</button>
                </div>
            </div>
        )) : <p>oops! Não encontramos nada.</p>
      }

        {modalHidden && <ModalNotyfi toggleModal={toggleModal} notyfi={notyfiForUpdate} handleLoad={handleLoad} />}
      </div>
    </div>
  )
}

export default Medidas