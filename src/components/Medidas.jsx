import React,{useState, useEffect} from 'react'
import './Medidas.css'
import turmas from  '../data/turmas'
import { service } from '../services/notification'
import ModalNotyfi from './ModalNotyfi'

const Medidas = () => {
  const [name, setName] = useState('')
  const [classScool, setClassScool] = useState('1201')
  const [category, setCategory] = useState('')
  const [notifications, setNotifications] = useState([])
  const [modalHidden, setModalHidden] = useState(false)
  const [notyfiForUpdate, setNotyfiForUpdate] = useState({})

  const handleCategoryChange = (value) => {
    setCategory(value)
    console.log(category)
  }

  const handleClassScoolChange = (value) => {
    setClassScool(value)
    console.log(classScool)
  }

  const handleSaveNotification = () => {
    service.save({
      name: name,
      class: classScool,
      category: category,
      status: 'pending'
    })

    clearStates()
  }

  const clearStates = () => {
    setName('')
    setCategory('')
    setClassScool('')
  }

  const hydrateStateNotifications = () => {
    const data = service.getAll()
    setNotifications(data)
  }

  const handleDelete = (notify) => {
    service.delete(notify.id)
  }

  const handleUpdate = (notify) => {
    toggleModal()
    setNotyfiForUpdate(notify)
  }

  const toggleModal = () => {
    setModalHidden(!modalHidden)
  }

  useEffect(()=>{
    hydrateStateNotifications()
  },[])

  return (
    <div className='notificacao'>
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
        
        { notifications.map( (notify,index) => (
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

        {modalHidden && <ModalNotyfi toggleModal={toggleModal} notyfi={notyfiForUpdate} />}
      </div>
    </div>
  )
}

export default Medidas