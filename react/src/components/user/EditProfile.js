import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import swal from "sweetalert";

const EditProfile = () => {
const navigate = useNavigate();

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const [error, setError] = useState([]);

  const [profileInput, setProfile] = useState([]);
  const token = localStorage.getItem("auth_token");

  useEffect(() => {
    axios
      .get(`/api/editProfile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.status === 200) {
          const {user: [actualUser]} = res.data
          
          setProfile(actualUser);
        } 
      });
  }, []);
  const handleInput = (e) => {
    e.persist();
    setProfile({...profileInput,[e.target.name]: e.target.value})
  }

  const updateProfile = (e) =>{
    e.preventDefault();
    const data = profileInput;
    // console.log(profileInput)
    axios.post(`/api/updateProfile`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(res=>{
      console.log(res.data.status)
      if(res.data.status === 200){
        swal('success',res.data.message,"success")

      }
      else if(res.data.status === 422){
        setError(res.data.errors)
      }
    })
  }

  return (
    <div className="data">
      <div className="recentData" style={{ top: "60px", left: "50px" }}>
        <div className="cardHeader">
          <h1 className="title">Edit Profile</h1>
        </div>
        <form className="form-card" onSubmit={updateProfile}>
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
                className="form-control" onChange={handleInput} value={profileInput.email||''}
              />
               {<span style={{ color: "red" }}>
                      {error.email}
                      </span>}
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
                className="form-control" onChange={handleInput} value={profileInput.name||''}
              />
               {<span style={{ color: "red" }}>
                      {error.name}
                      </span>}
            </div>
          </div>
          <div className="row justify-content-between text-left">
            <div className="form-group col-sm-6 flex-column d-flex">
              <label
                style={{ fontSize: "15px" }}
                className="form-control-label px-3"
              >
                Phone
              </label>
              <input
                name="phone_number"
                type="text"
                className="form-control" onChange={handleInput} value={profileInput.phone_number||''}
              />

              <span style={{ color: "red" }}>
                      {error.phone_number}
                      </span> 
            </div>
            
          </div>
          <br></br>
          <button
            style={{ width: "600px", marginLeft: "200px", fontSize: "17px" }}
            type="submit"
            className="btn btn-outline-success"
          >
            Edit Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
