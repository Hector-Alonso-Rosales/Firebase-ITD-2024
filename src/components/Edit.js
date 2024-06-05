import {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import {db} from '../firebaseConfig/firebase'

const Edit = () => {
  const [Nombre, setNombre] = useState('')
  const [piezas, setPiezas] = useState(0)
  const [stock, setStock] = useState(0)
  const [precio, setPrecio] = useState(0)
  const [talla, setTalla] = useState('')

  const navigate = useNavigate()
  const {id} = useParams()

  const update = async (e) => {
    e.preventDefault()
    const UniformDoc = doc(db, "Uniformes", id)
    const data = {Nombre: Nombre, piezas: piezas, stock: stock, precio: precio, talla: talla}
    await updateDoc(UniformDoc, data)
    navigate('/')
  }

  const getProductById = async (id) => {
    const UniformDoc = await getDoc(doc(db, "Uniformes", id))

    if(UniformDoc.exists()){
      setNombre(UniformDoc.data().Nombre)
      setPiezas(UniformDoc.data().piezas)
      setStock(UniformDoc.data().stock)
      setPrecio(UniformDoc.data().precio)
      setTalla(UniformDoc.data().talla)
    }else{
      console.log('No existe ese uniforme')
    }
  }

  useEffect(() => {
    getProductById(id)
  }, [])

  return (
    <div className="container">
    <div className="row">
    <div className="col">
        <h1>Editar Uniforme</h1>
        <form onSubmit={update}>
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
          <button type='submit' className='btn btn-primary'>Actualizar</button>
        </form>
    </div>
    </div>
    </div>

  )
}

export default Edit