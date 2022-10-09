import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {SoamarProvider} from './context/soamarContext'
import {NotificationProvider} from  './context/notificationsContext'
import {AuthProvider} from './context/authContext'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <SoamarProvider>
        <NotificationProvider>
          <App />
        </NotificationProvider>
      </SoamarProvider>
    </AuthProvider>
  </React.StrictMode>
)
