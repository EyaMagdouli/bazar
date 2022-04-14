import React, {useState} from 'react'
import swal from "sweetalert"
import axios from "axios";
import { useNavigate } from 'react-router';


const AddCategory = () => {

  const navigate = useNavigate();
  const [categoryInput, setCategory] = useState({
    'name':'',
    'slug':'',
    'description':'',
    error_list: []

  })
  const handleInput = (e) =>{
    e.persist();
    setCategory({...categoryInput,[e.target.name]: e.target.value})
  }
  const categorySubmit = (e ) =>{
    e.preventDefault();

    const data = {
      name: categoryInput.name,
      slug: categoryInput.slug,
      description: categoryInput.description,
      
    }

    axios.post('/api/addCategory', data).then(res =>{
        if (res.data.status === 200){
          swal('Success',res.data.message,'success');
          // document.getElementById('category_from').reset;
          navigate('/buyer/dashboard/categories');
        }
        else if (res.data.status === 400){
          setCategory({...categoryInput, error_list:res.data.errors})
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

            <form className="login100-form validate-form" onSubmit={categorySubmit} id="category_from">
            <span className="login100-form-title">Add Category</span>

            <div
              className="wrap-input100 validate-input"
              data-validate="name is required">
                <input
                className="input100"
                type="text"
                name="name" placeholder="Name"  onChange={handleInput}
                value={categoryInput.name || ""} />
                <span style={{ color: "red" }}>
                {categoryInput.error_list.name}
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
                {categoryInput.error_list.slug}
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
                <span style={{ color: "red" }}>
                {categoryInput.error_list.description}
              </span>
              <div className="container-login100-form-btn">
              <button type="submit" className="login100-form-btn">
                Create
              </button>
            </div>
            </div>

            </form>
              

          </div>
        </div>
      </div>

  )}

export default AddCategory