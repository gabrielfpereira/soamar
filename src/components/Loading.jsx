import React from 'react'
import loading from '../assets/loading.gif'

const Loading = () => {
  return (
    <img src={loading} alt="carregando" style={{
        width: '100%'
    }} />
  )
}

export default Loading