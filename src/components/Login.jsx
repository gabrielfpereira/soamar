import React, { useEffect } from 'react'
import './Login.css'
import { useContext } from 'react'
import { AuthContext } from '../context/authContext'

const Login = ({handleHomeScreen}) => {
    const {singin, Logged} = useContext(AuthContext)

    useEffect(() => {
        if(Logged){
            handleHomeScreen()
        }
    },[Logged])

  return (
    <div className='login'>
        <h1>Soamar</h1>
        <button onClick={singin}>Entrar com Google</button>
    </div>
  )
}

export default Login