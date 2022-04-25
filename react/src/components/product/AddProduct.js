import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'
import { useNavigate } from 'react-router'



const AddProduct = () => {


    const navigate = useNavigate()
    const [categoryList, setCategory] = useState([])
    const [productInput, setProduct] = useState({
        category_id:'',
        slug:'',
        name:'',
        description:'',
        price:'',
        error_list: []
    })

const [image, setImage] = useState([])
const handleInput = (e) => {
    e.persist();
    setProduct({...productInput, [e.target.name]:e.target.value})
}
const handleImage = (e) => {
    setImage({image:e.target.files[0]})
}



    useEffect(() => {
    const token = localStorage.getItem("auth_token");
        axios.get(`api/categories`, {
            headers: {
              Authorization: `Bearer ${token}`,
            }},).then(res => {
            if(res.data.status === 200){
                setCategory(res.data.category); 
            }
        })
    }, [])

const submitProduct = (e) =>{
    e.preventDefault();

    const formData = new FormData()
    formData.append('image', image.image)
    formData.append('category_id', productInput.category_id)
    formData.append('name', productInput.name)
    formData.append('slug', productInput.slug)
    formData.append('price', productInput.price)
    formData.append('description', productInput.description)
    formData.append('token', localStorage.getItem('auth_token'))        // attching toen

    const token = localStorage.getItem("auth_token");

    axios.post(`/api/addProduct`,formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },}).then(res=>{

        if(res.data.status === 200){
            swal('Success',res.data.message,"success")
            navigate('/dashboard/products')

        }
        else if(res.data.status === 422){
            setProduct({...productInput, error_list:res.data.errors})

        }

    })
}



  return (
    <div  className='data'>
        <div className='recentData'>
            <div className='cardHeader'>
                <h1 className='title'>Add Product</h1>
                <Link to="/dashboard/products">
                    <button className="button" type="button" >Back</button>
                </Link>
            </div>
            <form className="form-card" onSubmit={submitProduct}>
            <div className="row justify-content-between text-left">
                        <div className="form-group col-sm-6 flex-column d-flex"> 
                        <label style={{fontSize:"15px"}} className="form-control-label px-3">Name
                        <span className="text-danger"> *</span>
                        </label> 
                        <input name='name' type="text" className="form-control"  onChange={handleInput} value={productInput.name}/>
                        <span style={{ color: "red" }}>
                        {productInput.error_list.name}
                        </span>
                        </div>
                        <div className="form-group col-sm-6 flex-column d-flex"> 
                        <label style={{fontSize:"15px"}} className="form-control-label px-3" >Slug
                        <span className="text-danger"> *</span>
                        </label>
                        <input name='slug' type="text" className="form-control" onChange={handleInput} value={productInput.slug}/>
                        <span style={{ color: "red" }}>
                        {productInput.error_list.slug}
                        </span> 
                        </div>
            </div>
            <div className="row justify-content-between text-left">
                        <div className="form-group col-sm-6 flex-column d-flex"> 
                        <label style={{fontSize:"15px"}} className="form-control-label px-3">Category
                        <span className="text-danger"> *</span>
                        </label> 
                        <select name="category_id" className="form-control" onChange={handleInput} value={productInput.category_id}>
                        <option> Select Category </option>
                        
                        {categoryList.map( (item)=>{
                            return(
                                <option value={item.id} key={item.id}> {item.name} </option>
                            )
                        }
                            
                        )}
                        </select>
                        <span style={{ color: "red" }}>
                        {productInput.error_list.category_id}
                    </span>
                        </div>
                        <div className="form-group col-sm-6 flex-column d-flex"> 
                        <label style={{fontSize:"15px"}} className="form-control-label px-3">Price
                        <span className="text-danger"> *</span>
                        </label>
                        <input name='price' type="text" className="form-control" onChange={handleInput} value={productInput.price}/>
                        <span style={{ color: "red" }}>
                        {productInput.error_list.price}
                        </span> 
                        </div>
            </div>
            <div className="row justify-content-between text-left">
            <div className="form-group col-sm-6 flex-column d-flex"> 
                        <label style={{fontSize:"15px"}} className="form-control-label px-3">Description</label> 
                        <textarea name='description' className="form-control" rows="3" onChange={handleInput} value={productInput.description} />
                        </div>
                        <div className="form-group col-sm-6 flex-column d-flex"> 
                        <label style={{fontSize:"15px"}} className="form-control-label px-3">Image
                        <span className="text-danger"> *</span>
                        </label>
                        <input type="file" name='image' className="form-control-file" onChange={handleImage} />
                        <span style={{ color: "red" }}>
                        {productInput.error_list.image}
                        </span> 
                        </div>
                        
            </div>
            <br>
            </br>


                <button style={{width:"600px", marginLeft:"200px",fontSize:"17px"}} type="submit" className="btn btn-outline-success">Add Product</button>
            </form>
        </div>

    </div>

    
  )
}

export default AddProduct