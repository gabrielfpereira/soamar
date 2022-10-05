import React, { useContext, useState} from 'react'
import { NotificationContext } from '../context/notificationsContext'

const Notify = () => {
    const [notificationState, dispatch] = useContext(NotificationContext)
    console.log(notificationState.notifications[0])
  return (
    <div>
        { notificationState.notifications.map( (notify, index) => (
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
    </div>
  )
}

export default Notify