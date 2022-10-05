import { createContext, useReducer } from "react";
import turmas from '../data/turmas'
import { service } from "../services/notification";

const initialState = {
    turmas,
    notifications: []
}

const notificationReducer = (state, action) => {

    switch (action.type) {
        case 'GET_ALL_NOTIFICATIONS':
            const data = service.getAll()

            // const temp = {
            //     ...state,
            //     notifications: []
            // }
            return { ...state, notifications: data}
        
        case 'SAVE_NOTIFICATION':
            service.save(action.payload)

            const result = service.getAll()

            // console.log(result)

            return { ...state, notifications: result}
        default: 
            return state
    }
}

export const NotificationContext = createContext()

export const NotificationProvider = ({children}) => {
    const data = useReducer(notificationReducer, initialState)
    return (
        <NotificationContext.Provider value={data}>
            {children}
        </NotificationContext.Provider>
    )
}