import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {SoamarProvider} from './context/soamarContext'
import {NotificationProvider} from  './context/notificationsContext'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SoamarProvider>
      <NotificationProvider>
        <App />
      </NotificationProvider>
    </SoamarProvider>
  </React.StrictMode>
)
