import React, { useState } from 'react'
import { useNavigate} from "react-router-dom";

const CreateMarketplace = () => {
  const navigate = useNavigate();
  const [marketInput, setMarket] = useState({
    error_list: []
})

const handleInput = (e) => {
  e.persist();
  setMarket({ ...marketInput, [e.target.name]: e.target.value });
};

const marketSubmit = async (e) => {
  e.preventDefault();
  const { data } = await axios.post("/api/createMarket", marketInput);
  if (data.status === 200) {
    swal("Success", data.message, "success");
    navigate("/createProduct");
  }
   else {
    setmarket({ ...marketInput, error_list: res.data.validation_errors });
  }
};


  return (
    <div className='container py-5'>
        <div className="card" style={{display: 'flex',  justifyContent:'center', width:"800px", marginLeft:"140px"}}>
        <div
          className="card-body"
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <form className="login100-form validate-form" onSubmit={marketSubmit}>
          <span className="login100-form-title">Create Marketplace</span>

            <div
              className="wrap-input100 validate-input"
              data-validate="name is required">
                <input
                className="input100"
                type="text"
                name="name" placeholder="Name" onChange={handleInput}
                value={marketInput.name || ""}/>
                <span style={{ color: "red" }}>
                {marketInput.error_list.name}
              </span>
            </div>
            <div
              className="wrap-input100 validate-input"
              data-validate="slug is required">
                <input
                className="input100"
                type="text"
                name="slug" placeholder="Slug" onChange={handleInput}
                value={marketInput.slug || ""}/>
                <span style={{ color: "red" }}>
                {marketInput.error_list.slug}
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
                value={marketInput.description || ""}/>
                <span style={{ color: "red" }}>
                {marketInput.error_list.description}
              </span>
            </div>
            <label>
            <button type="button" style={{width:'300px', height:'30px', fontSize:'14px'}} className="btn btn-success ">Import Picture</button>
              
            </label>
            <i className="fa fa-picture-o" aria-hidden="true"></i>

            <div className="container-login100-form-btn">
              <button type="submit" className="login100-form-btn">
                Create
              </button>
            </div>
          </form>
          </div>
        </div>
      </div>
  )
}

export default CreateMarketplace