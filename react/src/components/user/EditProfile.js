import React, { useState } from "react";
import { Link } from "react-router-dom";

const EditProfile = () => {

    const [passwordShown, setPasswordShown] = useState(false);
  // Password toggle handler
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className="data">
      <div className="recentData" style={{top:"60px", left:"50px"}}>
        <div className="cardHeader">
          <h1 className="title">Edit Profile</h1>
          <Link to="/profile">
            <button className="button" type="button">
              Back
            </button>
          </Link>
        </div>
        <form className="form-card" /* onSubmit={updateProduct} */>
          <div className="row justify-content-between text-left">
            <div className="form-group col-sm-6 flex-column d-flex">
              <label
                style={{ fontSize: "15px" }}
                className="form-control-label px-3"
              >
                Email
              </label>
              <input
                name="email"
                type="text"
                className="form-control" /* onChange={handleInput} value={productInput.name} */
              />
              {/*  {<span style={{ color: "red" }}>
                      {error.name}
                      </span>} */}
            </div>

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
                className="form-control" /* onChange={handleInput} value={productInput.name} */
              />
              {/*  {<span style={{ color: "red" }}>
                      {error.name}
                      </span>} */}
            </div>
          </div>
          <div className="row justify-content-between text-left">
                    <div className="form-group col-sm-6 flex-column d-flex"> 
                      <label style={{fontSize:"15px"}} className="form-control-label px-3">Kind

                      </label> 
                      <select name='kibd' className="form-control" /* onChange={handleInput} value={productInput.category_id} */>
                      {/* {categoryList.map( (item)=>{
                          return(
                              <option value={item.id} key={item.id}> {item.name} </option>
                          )
                      }
                          
                      )} */}
                      </select>
                      {/* <span style={{ color: "red" }}>
                      {error.category_id}
                      </span> */}
                    </div>
                    <div className="form-group col-sm-6 flex-column d-flex"> 
                      <label style={{fontSize:"15px"}} className="form-control-label px-3">Phone

                      </label>
                      <input name='phone' type="text" className="form-control" /* onChange={handleInput} value={productInput.price} *//>

                      {/* <span style={{ color: "red" }}>
                      {error.price}
                      </span>  */}
                    </div>
        </div>
        <div className="row justify-content-between text-left">
            <div className="form-group col-sm-6 flex-column d-flex">
              <label
                style={{ fontSize: "15px" }}
                className="form-control-label px-3"
              >
                Password
              </label>
              <input
                name="password"
                type={passwordShown ? "text" : "password"}
                className="form-control" /* onChange={handleInput} value={productInput.name} */
              />
              <br></br>
              <div style={{top:"40px", justifyContent:"space-evenly"}}>
              <input type="checkbox" onClick={togglePassword} />Show Password
              </div>
              {/*  {<span style={{ color: "red" }}>
                      {error.name}
                      </span>} */}
            </div>
            <div className="form-group col-sm-6 flex-column d-flex">
              <label
                style={{ fontSize: "15px" }}
                className="form-control-label px-3"
              >
                New Password
              </label>
              <input
                name="email"
                type={passwordShown ? "text" : "password"}
                className="form-control" /* onChange={handleInput} value={productInput.name} */
                
              />
              <br></br>
              <div style={{top:"40px"}}>
              <input type="checkbox" onClick={togglePassword} />Show Password
              </div>
              {/*  {<span style={{ color: "red" }}>
                      {error.name}
                      </span>} */}
            </div>
            </div>
            <br>
            </br>
            <button style={{width:"600px", marginLeft:"200px", fontSize:"17px"}} type="submit" className="btn btn-outline-success">Edit Profile</button>

        </form>
      </div>
    </div>
  );
};

export default EditProfile;
