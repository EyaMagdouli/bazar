import React, {useState} from 'react'
import swal from "sweetalert"
import axios from "axios";
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

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


    const token = localStorage.getItem("auth_token");

    axios.post('/api/addCategory', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      }},).then(res =>{
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
<div className='data'>
        <div className='recentData'>
        <div className='cardHeader'>
           <h1 className='title'>Add Category</h1>
                <Link to="/buyer/dashboard/categories">
                    <button className="button" type="button" >Back</button>
                </Link>
        </div>
            <form className="form-card" onSubmit={categorySubmit} id="category_from">
            <div className="row justify-content-between text-left">
            <div className="form-group col-sm-6 flex-column d-flex">
            <label style={{fontSize:"15px"}} className="form-control-label px-3">Name
                        <span className="text-danger"> *</span>
                        </label> 
                <input
                className="form-control" type="text" name="name"  onChange={handleInput}
                value={categoryInput.name || ""} />
                <span style={{ color: "red" }}>
                {categoryInput.error_list.name}
              </span>
            </div>
            <div className="form-group col-sm-6 flex-column d-flex" >
            <label style={{fontSize:"15px"}} className="form-control-label px-3" >Slug
                        <span className="text-danger"> *</span>
                        </label>
                <input
                className="form-control"
                type="text"
                name="slug" placeholder="Slug"  onChange={handleInput}
                value={categoryInput.slug || ""} />
                <span style={{ color: "red" }}>
                {categoryInput.error_list.slug}
              </span>
            </div>
            </div>
            <div className="form-group col-sm-6 flex-column d-flex">
            <label style={{fontSize:"15px"}}>Description</label>
                <textarea
                 className="form-control"
                type="text"
                name="description" placeholder="Description" rows="4" cols="50" 
                 onChange={handleInput}
                value={categoryInput.description || ""} />
                <span style={{ color: "red" }}>
                {categoryInput.error_list.description}
              </span>
              </div>
              <br></br>
              <button style={{width:"600px", marginLeft:"200px",fontSize:"17px"}} type="submit" className="btn btn-outline-success">Add Category</button>

            

            </form>
              

          </div>
        </div>

  )}

export default AddCategory