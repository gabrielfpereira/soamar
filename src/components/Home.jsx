import React, {useContext} from 'react'
import { SoamarContext } from '../context/soamarContext'
import './Home.css'

const Home = () => {
    const [soamarState, dispatch] = useContext(SoamarContext)
  return (
    <div className='home'>
        <h2>Menu</h2>
        <button onClick={() => dispatch({type: 'CONTAGEM'})}>Fazer contagem nas turmas</button>
        <button onClick={() => dispatch({type: 'MEDIDAS'})}>Medidas / Infrações</button>
    </div>
  )
}

export default Home