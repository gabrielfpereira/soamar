import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {SoamarProvider} from './context/soamarContext'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SoamarProvider>
      <App />
    </SoamarProvider>
  </React.StrictMode>
)
