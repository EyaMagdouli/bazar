import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router';
import swal from 'sweetalert';


const EditCategory = () => {
  const navigate = useNavigate();
  const [categoryInput, setCategory] = useState([]);
  const [error, setError] = useState([])
  
  
  const { Category_id } = useParams();
  useEffect(() => {
   axios.get(`/api/editCategory/${Category_id}`).then(res =>{
     
      if(res.data.status === 200){
          console.log(res.data.Category_id);
          setCategory(res.data.category);
      }
      else if(res.data.status === 404){
        swal("error",res.data.message,"error");
        navigate('/buyer/dashboard/categories');

      }
   })
  },[Category_id])

  const handleInput = (e) => {
    e.persist();
    setCategory({...categoryInput,[e.target.name]: e.target.value})
  }

  const categoryUpdate = (e) =>{
    e.preventDefault();

    const data = categoryInput;

    axios.put(`/api/updateCategory/${Category_id}`, data).then(res => {
      if(res.data.status === 200){
          swal('success',res.data.message,"success")
          setError([])

      }
      else if(res.data.status === 422){
        setError(res.data.errors)
      }
      else if(res.data.status === 404){
        swal('Error',res.data.message,"error")
        navigate('/buyer/dashboard/categories');


      }

    })
  }




  return (
    <div className='container py-5'>
        <div className="card" style={{display: 'flex',  justifyContent:'center', width:"600px", marginLeft:"140px", top:"-30px"}}>
        <div
          className="card-body"
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >

            <form className="login100-form validate-form" onSubmit={categoryUpdate} /* id="category_from" */>
            <span className="login100-form-title">Edit Category</span>

            <div
              className="wrap-input100 validate-input"
              data-validate="name is required">
                <input
                className="input100"
                type="text"
                name="name" placeholder="Name"  onChange={handleInput}
                value={categoryInput.name } />
                <span style={{ color: "red" }}>
                {error.name}
              </span>
           
            </div>
            <div
              className="wrap-input100 validate-input"
              data-validate="slug is required">
                <input
                className="input100"
                type="text"
                name="slug" placeholder="Slug"  onChange={handleInput}
                value={categoryInput.slug || ""} />  
                <span style={{ color: "red" }}>
                {error.slug}
              </span>
            </div>
            <div
              className="wrap-input100 validate-input"
              data-validate="Description is required">
                <textarea
                className="input100"
                type="text"
                name="description" placeholder="Description" rows="4" cols="50" 
                 onChange={handleInput}
                value={categoryInput.description || ""} />
           
  
              <div className="container-login100-form-btn">
              <button type="submit" className="login100-form-btn">
                Edit
              </button>
            </div>
            </div>

            </form>
              

          </div>
        </div>
      </div>
  )
}

export default EditCategory