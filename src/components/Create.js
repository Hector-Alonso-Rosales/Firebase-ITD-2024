import React, {useState} from 'react'
import { useNavigate} from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import {db} from '../firebaseConfig/firebase'

const Create = () => {
  const [Nombre, setNombre] = useState('')
  const [piezas, setPiezas] = useState(0)
  const [stock, setStock] = useState(0)
  const [precio, setPrecio] = useState(0)
  const [talla, setTalla] = useState('')

  const navigate = useNavigate()
  const UniformesCollection = collection(db, "Uniformes")

  const store = async (e) => {
    e.preventDefault()
    await addDoc(UniformesCollection, {Nombre: Nombre, piezas: piezas, stock: stock, precio: precio, talla: talla})
    navigate('/')
  }


  return (
    <div className="container">
    <div className="row">
    <div className="col">
        <h1>Crear Uniforme</h1>
        <form onSubmit={store}>
          <div className="mb-3">
            <label className='form-label'>Nombre</label>
            <input value={Nombre} onChange={ (e) => setNombre(e.target.value)} type='text' className='form-control'/>
          </div>

          <div className="mb-3">
            <label className='form-label'>Talla</label>
            <input value={talla} onChange={ (e) => setTalla(e.target.value)} type='text' className='form-control'/>
          </div>

          <div className="mb-3">
            <label className='form-label'>Stock</label>
            <input value={stock} onChange={ (e) => setStock(e.target.value)} type='number' className='form-control'/>
          </div>

          <div className="mb-3">
            <label className='form-label'>Piezas</label>
            <input value={piezas} onChange={ (e) => setPiezas(e.target.value)} type='number' className='form-control'/>
          </div>

          <div className="mb-3">
            <label className='form-label'>Precio</label>
            <input value={precio} onChange={ (e) => setPrecio(e.target.value)} type='number' className='form-control'/>
          </div>
          <button type='submit' className='btn btn-primary'>Guardar</button>
        </form>
    </div>
    </div>
    </div>
  )
}

export default Create