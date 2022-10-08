import React,{useState, useEffect, useContext} from 'react'
import './Medidas.css'
import turmas from  '../data/turmas'
import ModalNotyfi from './ModalNotyfi'

// import { database, app } from "../services/firebase";
import { getDatabase, ref, set, push, child, query, orderByChild, onValue, remove, update, get } from "firebase/database";
import { v4 as uuidv4} from 'uuid'

// const db = getDatabase()
const now = new Date()

const Medidas = ({handleHomeScreen}) => {
  const [notifications, setNotifications] = useState([])
  const [name, setName] = useState('')
  const [classScool, setClassScool] = useState('1201')
  const [category, setCategory] = useState('')
  const [modalHidden, setModalHidden] = useState(false)
  const [notyfiForUpdate, setNotyfiForUpdate] = useState({})

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

  const handleSaveNotification = () => {
    const uuid = uuidv4()
    // set(ref(db, `notifications/${uuid}`), {
    //     name: name,
    //     class: classScool,
    //     category: category,
    //     status: 'pending',
    //     id: uuid,
    //     createdAt: `${now.getDate()}-${now.getMonth()}-${now.getFullYear()}`,
    //     updatedAt: `${now.getDate()}-${now.getMonth()}-${now.getFullYear()}`,
    // })

    clearStates()
    handleLoad()
  }

  const clearStates = () => {
    setName('')
    setCategory('')
    setClassScool('')
  }

  
  const handleDelete = (notify) => {
    console.log(notify)
    // remove(ref(db, `notifications/${notify.id}`))
    handleLoad()
  }

  const handleUpdate = (notify) => {
    toggleModal()
    setNotyfiForUpdate(notify)
  }

  const toggleModal = () => {
    setModalHidden(!modalHidden)
  }

  const handleLoad = () => {
    // get(child(ref(db), 'notifications')).then((snapshot) => {
    //   const array = []
    //   if (snapshot.exists()) {
    //     const data = snapshot.val()

    //     if( data != null) {
    //           Object.values(data).map( (item) => {
    //               array.push(item)
    //           })
    //       }
    //     } else {
    //       console.log("No data available");
    //     }

    //     setNotifications(array)
    //   }).catch((error) => {
    //     console.error(error);
    // });
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
        
      { notifications && notifications.map( (notify, index) => (
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
        ))}

        {modalHidden && <ModalNotyfi toggleModal={toggleModal} notyfi={notyfiForUpdate} handleLoad={handleLoad} />}
      </div>
    </div>
  )
}

export default Medidas