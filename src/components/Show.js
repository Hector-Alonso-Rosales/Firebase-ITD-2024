import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { collection,getDocs, getDoc, deleteDoc, doc } from 'firebase/firestore'
import {db} from '../firebaseConfig/firebase'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content' 
const MySwal= withReactContent(Swal)

const Show = () => {
    //Configuramos hooks
    const [products,setProducts] = useState( [] )
    //Referneciamos DB Firestore
    const productsCollection = collection(db, "Uniformes")
    //Función para mostrar todos los Docs
    const getProducts = async () => {
        const data = await getDocs(productsCollection)
        setProducts(
            data.docs.map( (doc) => ({...doc.data(), id:doc.id}))
        )
        
    console.log(products)
    }
    //Función para eliminar un Doc
    const deleteProduct = async (id) => {
       const productDoc= doc(db , "Uniformes", id)
       await deleteDoc(productDoc)
       getProducts()

    }
    //Funciónde confirmación para SWAL2
    const confirmDelete = (id) => {
        
        MySwal.fire({
            title: "¿Seguro?",
            text: "¡Ya borrado no se podrá recuperar!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, ¡revelate!"
          }).then((result) => {
            if (result.isConfirmed) {
              deleteProduct(id);
              Swal.fire({
                title: "Borrado",
                text: "Se ha eliminado la entrada",
                icon: "success"
              });
            }
          });


    }
    //Usamos Useffect
    useEffect(() => {
        getProducts()
    }, [])
    //Proporcionamos la vista

    return (
        <>
            <div className="container">
            <div className="row">
            <div className="col">
                <div className="d-grid gap-2">
                    <Link to="/create" className='btn btn-secondary mt-2 '>Create</Link>
                </div>
                <table className='table table-dark table-hover'> 
                 <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Piezas</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Talla</th>
                        <th>Acciones</th>
                    </tr>
                 </thead>
                 
                 <tbody>
                    {products.map( (Uniformes) => (
                        <tr key={Uniformes.id}>
                            <td>{Uniformes.Nombre}</td>
                            <td>{Uniformes.piezas}</td>
                            <td>{Uniformes.precio}</td>
                            <td>{Uniformes.stock}</td>
                            <td>{Uniformes.talla}</td>
                            <td>
                                <Link to={`/edit/${Uniformes.id}`} className='btn btn-light'><i className='fa-solid fa-pencil'></i></Link>
                                <button onClick={ () => {confirmDelete(Uniformes.id)}} className='btn btn-danger'><i className='fa-solid fa-trash'></i></button>
                            </td>
                        </tr>

                    ))}


                 </tbody>
                </table>
            </div>  
            </div>
            </div>
        </>
  )
}


export default Show;