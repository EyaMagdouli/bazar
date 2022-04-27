import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import swal from 'sweetalert'

const EditMarketplace = () => {

  const navigate = useNavigate()
  const [marketplaceInput, setMarketplaceInput] = useState({
    'name':'',
    'description':'',
})

const [error, setError]  = useState([])
const [image, setImage] = useState([])

const handleImage = (e) => {
  setImage({image:e.target.files[0]})
} 

useEffect(() => {
  const token = localStorage.getItem("auth_token");
  axios.get(`/api/editMarket`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }},).then(res=>{
      if(res.data.status === 200){
        const { name, description} = (res.data.marketplace[0])
        setMarketplaceInput({
          name,
          description
        })
      }
      else if(res.data.status === 404){
        swal('Error',res.data.message)
        navigate('/dashboard/marketplace')
      }
    })
}, [])

const handleInput = (e) => {
  e.persist();
  setMarketplaceInput({...marketplaceInput, [e.target.name]:e.target.value})
}

const updateMarket = (e) =>{
  e.preventDefault();

  const formData = new FormData()
  formData.append('image',image.image)
  formData.append('name',marketplaceInput.name)
  formData.append('description',marketplaceInput.description)

  const token = localStorage.getItem("auth_token");
  axios.post(`/api/updateMarket`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    }},).then(res=>{
      if(res.data.status === 200){
        swal('Success',res.data.message,"success")
        navigate('/dashboard/marketplace')
      }
    })

  


}

  return (
    <div className="data">
      <div className="recentData" style={{ top: "20px" }}>
        <div className="cardHeader">
          <h1 className="title">Edit Marketplace</h1>
          <Link to="/dashboard/marketplace">
            <button className="button" type="button">
              Back
            </button>
          </Link>
        </div>
        <form className="form-card" onSubmit={updateMarket}>
          <div className="row justify-content-between text-left">
            <div className="form-group col-sm-6 flex-column d-flex">
              <label
                style={{ fontSize: "15px" }}
                className="form-control-label px-3"
              >
                Name
              </label>
              <input
                name="name"
                type="text"
                className="form-control" onChange={handleInput} value={marketplaceInput.name}
              />
               {<span style={{ color: "red" }}>
                      {error.name}
                      </span>}
            </div>
            <div className="form-group col-sm-6 flex-column d-flex">
            <label style={{fontSize:"15px"}} className="form-control-label px-3">Image
                    </label>
                    <input type="file" name='image' className="form-control-file" onChange={handleImage} />
                    <span style={{ color: "red" }}>
                    {error.image}
                    </span> 
              </div>
        
          </div>
          <div className="row justify-content-between text-left">
            <div className="form-group col-sm-6 flex-column d-flex">
              <label
                style={{ fontSize: "15px" }}
                className="form-control-label px-3"
              >
                Description
              </label>
              <textarea
                 className="form-control"
                type="text"
                name="description" rows="4" cols="50" 
                onChange={handleInput}
                value={marketplaceInput.description ?? ""} />
            </div>
            
          </div>
          <br></br>
          <button
            style={{ width: "600px", marginLeft: "200px", fontSize: "17px" }}
            type="submit"
            className="btn btn-outline-success"
          >
            Edit Marketplace
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditMarketplace