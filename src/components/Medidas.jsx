import React from 'react'
import './Medidas.css'

const Medidas = () => {
  return (
    <div className='notificacao'>
      <h2>Medidas e Infrações</h2>

      <div className="form">
        <input type="text" name="fullName" placeholder='Nome do aluno' />

        <select className='turmas'>
          <option value="">1202</option>
          <option value="">1203</option>
        </select>

        <div className="categoria">
          <div className="categoria_info">
            <label htmlFor="medida">Medida</label>
            <input type="radio" name="categoria" value={'Medida'} id="medida" />
          </div>

          <div className="categoria_info">
            <label htmlFor="infracao">Infração</label>
              <input type="radio" name="categoria" value={'Infração'} id="infracao" />
          </div>
        </div>

        <button>Safo</button>
      </div>

      <hr />

      <div className="container">
        <div className="card">
          <div className="left">
            <h3>Nome do aluno</h3>
            <div className="infos">
              <span>1202</span>
              <span>situação: pedente</span>
            </div>         
          </div>

          <div className="rigth">
            <button>excluir</button>
            <button>editar</button>
          </div>
        </div>

        <div className="card">
          <div className="left">
            <h3>Nome do aluno</h3>
            <div className="infos">
              <span>1202</span>
              <span>situação: pedente</span>
            </div>         
          </div>

          <div className="rigth">
            <button>excluir</button>
            <button>editar</button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Medidas