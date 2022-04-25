import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';


const EditCategory = () => {
  const navigate = useNavigate();
  const [categoryInput, setCategory] = useState({
    'name' : '',
    'slug' : '',
    'description':''
  });
  const [error, setError]     = useState([])
    
const { Category_id } = useParams();

 useEffect(() => {
    
   axios.get(`/api/editCategory/${Category_id}`).then(res =>{
     
      if(res.data.status === 200){
          console.log(res.data.Category_id);
          setCategory(res.data.category);
      }
      else if(res.data.status === 404){
        swal("error",res.data.message,"error");
        navigate('/dashboard/categories');

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
          navigate('/dashboard/categories');
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
    <div className='data'>
        <div className='recentData'>
        <div className='cardHeader'>
        <h1 className='title'>Edit Category</h1>
            <Link to="/buyer/dashboard/categories">
            <button className='button' type="button" >
              Back
              </button>
            </Link>
        </div>
        <form className="form-card" onSubmit={categoryUpdate}>
            <div className="row justify-content-between text-left">
            <div className="form-group col-sm-6 flex-column d-flex">
            <label style={{fontSize:"15px"}} className="form-control-label px-3">Name
                        <span className="text-danger"> *</span>
                        </label> 
                <input
                className="form-control" type="text" name="name"  onChange={handleInput}
                value={categoryInput.name } />
                <span style={{ color: "red" }}>
                {error.name}
              </span>
            </div>
            <div className="form-group col-sm-6 flex-column d-flex" >
            <label style={{fontSize:"15px"}} className="form-control-label px-3" >Slug
                        <span className="text-danger"> *</span>
                        </label>
                <input
                className="form-control"
                type="text"
                name="slug"   onChange={handleInput}
                value={categoryInput.slug } />
                <span style={{ color: "red" }}>
                {error.slug}
              </span>
            </div>
            </div>
            <div className="form-group col-sm-6 flex-column d-flex">
            <label style={{fontSize:"15px"}}>Description</label>
                <textarea
                 className="form-control"
                type="text"
                name="description" rows="4" cols="50" 
                onChange={handleInput}
                value={categoryInput.description ?? ""} />
                <span style={{ color: "red" }}>
                {error.description}
              </span>
              </div>
              <br></br>
              <button style={{width:"600px", marginLeft:"200px",fontSize:"17px"}} type="submit" className="btn btn-outline-success">Edit Category</button>

            

            </form>
              
              

          </div>
        </div>
  )
}

export default EditCategory