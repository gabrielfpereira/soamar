import { createContext, useReducer } from "react";
import turmas from  '../data/turmas'

const TELAS = ['HOME', 'CONTAGEM', 'MEDIDAS', 'LOGIN']
const initialState = {
    tela: TELAS[3],
    turmas,
    turmasContadas: []
}

const soamarReducer = (state, action) => {

    switch (action.type) {
        case 'CONTAGEM':
           return {
            ...state,
            tela: TELAS[1]
           }
        
        case 'MEDIDAS':
            return {
             ...state,
             tela: TELAS[2]
            }

        case 'HOME':
            return {
                ...state,
                tela: TELAS[0]
            }

        case 'LOGIN':
            return {
                ...state,
                tela: TELAS[3]
            }

        case 'INSERT':
            let newArray = [...state.turmasContadas]
            const result = newArray.findIndex( (item) => item.turma == action.data.turma)
            
            if(result != -1){
                let dataTrasform = state.turmasContadas
                dataTrasform[result].quantidade = action.data.quantidade
                return {
                    ...state,
                    turmasContadas: dataTrasform 
                }
            }

            newArray.push(action.data)

            return {
                ...state,
                turmasContadas: newArray.sort((a, b) => a.value - b.value)}

        case 'DELETE_ITEM':
            let cloneArray = [...state.turmasContadas]
            const resultFind = cloneArray.findIndex( (item) => item.turma == action.data.turma)

            if(resultFind != -1){
                cloneArray.splice(resultFind, 1)
            }

            return {
                ...state,
                turmasContadas: cloneArray
            }
        default:
            state;
    }

}

export const SoamarContext = createContext({})

export const SoamarProvider = ({children}) => {
    const data = useReducer(soamarReducer, initialState)

    return <SoamarContext.Provider value={data}>{children}</SoamarContext.Provider>
    
}