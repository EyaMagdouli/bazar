import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Product = () => {


  const [product, setProduct] = useState([])
  
  useEffect(() => {
      axios.get(`/api/viewProduct`).then(res=>{
        if(res.data.status === 200){
          setProduct(res.data.products)
        }
      })
  }, [])

  const deleteProduct= (e, id) => {
    e.preventDefault();

    axios.delete(`api/deleteProduct/${id}`).then(res=>{
      if(res.data.status === 200){
        swal("Success",res.data.message,"success")

      }
      else if(res.data.status === 404) {
        swal("Success",res.data.message,"success")

      }

    })
  }

var displayProductData =""

displayProductData = product.map( (item, i) => {
  return(
    <tr key={item.id}>
      <td>{item.id}</td>
      <td> <img src={`http://127.0.0.1:8000/${item.image}`} width="50px" alt={item.name} /> </td>
      <td>{item.name}</td>
      <td>{item.slug}</td>
      <td>{item.category.name}</td>
      <td>{item.price}</td>
      <td>{item.description}</td>
      <td>
      <div className="btn-group align-top">
        <button type="button" >
            <Link to={`/buyer/dashboard/products/edit/${item.id}`} style={{color:"blue", fontSize:"17px" ,marginRight:"10px", textDecoration:"none"}}  >
            <i className="far fa-edit" ></i> Edit </Link>
        </button>
        <button type="button" onClick={(e)=>deleteProduct(e, item.id)} style={{color:"red", fontSize:"16px" }} >
            <i className="fa fa-trash" ></i>
            Delete
         </button>
        </div>
      </td>



    </tr>
  )
} )

  return (
    <div className='data'>
    <div className='recentData' >
    <div className='cardHeader' >
            <h1 className='title' >Products</h1>
            <Link to="/buyer/dashboard/products/add">
            <button className="button" type="button" >Add Product</button>
            </Link>
    </div>
                  <table>
                    <thead>
                        <tr>
                        <td>ID</td>
                        <td>Image</td>
                        <td>Name</td>
                        <td>Slug</td>
                        <td>Category</td>
                        <td>Price</td>
                        <td>Description</td>
                        <td>Actions</td>
                        </tr>
                    </thead>
                    
                    <tbody>
                    {displayProductData}
                    </tbody>
                
                  </table>
              
            </div>
            </div>
            
  

  )
}

export default Product