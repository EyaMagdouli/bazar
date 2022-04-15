import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'



const AddProduct = () => {

    const [categoryList, setCategoryList] = useState([])
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
        axios.get(`api/categories`).then(res => {
            if(res.data.status === 200){
                setCategoryList(res.data.category); 
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



    axios.post(`/api/addProduct`,formData).then(res=>{

        if(res.data.status === 200){
            swal('Success',res.data.message,"success")

        }
        else if(res.data.status === 422){
            setCategory({...productInput, error_list:res.data.errors})

        }

    })
}


  return (
    <div  className='container-fluid px-4'>
        <div className='card mt-4'>
            <div className='card-header'>
                <h3>Add Product</h3>
                <Link to="/buyer/dashboard/products">
                    <button className="btn btn-success" type="button" data-toggle="modal" data-target="#user-form-modal">Back</button>
                </Link>
            </div>
            <div className='card-body'>
            <form onSubmit={submitProduct}>
            <div className="form-row">
                <div className="col-md-4 mb-3">
                <label >Name</label>
                <input  type="text" name='name' className="form-control is-invalid" id="validationServer" onChange={handleInput} value={productInput.name}/>
                <span style={{ color: "red" }}>
                {productInput.error_list.name}
              </span>
                </div>
                                
              <div className="col-md-4 mb-3">
                <label >Slug</label>
                <input  type="text" name='slug' className="form-control is-invalid" id="validationServer" onChange={handleInput} value={productInput.slug} />
                </div>
                <span style={{ color: "red" }}>
                {productInput.error_list.slug}
              </span>  
                <div className="col-md-4 mb-3">
                <label >Category</label>
                <select onChange={handleInput} value={productInput.category_id} className="custom-select custom-select-sm form-control">

                {categoryList.map( (item)=>{
                    return(
                        <option value={item.id} key={item.id}> {item.name} </option>
                    )
                }
                     
                )}
                    
                </select>
                </div>
                <span style={{ color: "red" }}>
                {productInput.error_list.category_id}
              </span>  
                <div className="col-md-4 mb-3">
                <label >Price</label>
                <input type="text" name='price' className="form-control is-invalid" id="validationServer" onChange={handleInput} value={productInput.price}/>
                </div>
                <span style={{ color: "red" }}>
                {productInput.error_list.price}
              </span>
                <div className="form-group">
                    <label htmlFor="exampleFormControlFile1">Import picture of the product </label>
                    <br></br>
                    <input type="file" name='image' className="form-control-file" id="exampleFormControlFile1" onChange={handleImage} />
                </div>
                <span style={{ color: "red" }}>
                {productInput.error_list.image}
              </span>
                <div className="col-md-4 mb-3">
                <label >Description</label>
                <textarea type="text" name='description' className="form-control is-valid" id="validationServer"  onChange={handleInput} value={productInput.description} />
                </div>
              
                <button type="submit" className="btn btn-outline-success">Add Category</button>
  </div>
  
</form>
            </div>

        </div>

    </div>
    
  )
}

export default AddProduct