import './App.css'
import { useContext } from 'react'
import { SoamarContext } from './context/soamarContext'

import Home from './components/Home'
import Contagem from './components/Contagem'
import Medidas from './components/Medidas'

function App() {
  const [soamarState, dispatch] = useContext(SoamarContext)

  return (
    <div className="App">
      { soamarState.tela === 'HOME' && <Home /> }
      { soamarState.tela === 'CONTAGEM' && <Contagem /> }
      { soamarState.tela === 'MEDIDAS' && <Medidas /> }
    </div>
  )
}

export default App
