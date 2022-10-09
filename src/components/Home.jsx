import React, {useContext, useEffect} from 'react'
import { AuthContext } from '../context/authContext'
import { SoamarContext } from '../context/soamarContext'
import './Home.css'

const Home = () => {
    const [soamarState, dispatch] = useContext(SoamarContext)
    const {user, Logged, singOut} = useContext(AuthContext)
    
    const handleSingOut = () => {
      singOut()
    }

    useEffect(() => {
      if(!Logged){
        dispatch({type: 'LOGIN'})
      }
    } ,[Logged])

  return (
    <div className='home'>
      { user && 
        <div className='user'>
          <p>Bem vindo</p>
          <div className='display'>
            <img src={user.photoURL} alt="usuario" />
            <h3>{user.displayName}</h3>
          </div>
          <a onClick={handleSingOut}>sair</a> 
        </div> 
      }
        <h2>Menu</h2>
        <button onClick={() => dispatch({type: 'CONTAGEM'})}>Fazer contagem nas turmas</button>
        <button onClick={() => dispatch({type: 'MEDIDAS'})}>Medidas / Infrações</button>
    </div>
  )
}

export default Home