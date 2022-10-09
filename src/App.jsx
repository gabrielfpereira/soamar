import './App.css'
import { useContext} from 'react'
import { SoamarContext } from './context/soamarContext'

import Home from './components/Home'
import Contagem from './components/Contagem'
import Medidas from './components/Medidas'
import { NotificationContext } from './context/notificationsContext'
import Login from './components/Login'

function App() {
  const [soamarState, dispatch] = useContext(SoamarContext)

  const handleHomeScreen = () => {
    dispatch({type: 'HOME'})
  }

  return (
    <div className="App">
      { soamarState.tela === 'HOME' && <Home /> }
      { soamarState.tela === 'CONTAGEM' && <Contagem handleHomeScreen={handleHomeScreen} /> }
      { soamarState.tela === 'MEDIDAS' && <Medidas handleHomeScreen={handleHomeScreen} /> }
      { soamarState.tela === 'LOGIN' && <Login handleHomeScreen={handleHomeScreen} /> }    
    </div>
  )
}

export default App
