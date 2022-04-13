import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import pic from "../../assets/images/auth.jpg";
import swal from "sweetalert";
import { isLoggedIn } from "./checkIsLoggedIn";

export default function Register() {
  const navigate = useNavigate();
  const { state } = useLocation()
  const [registerInput, setRegister] = useState({
	
    kind: state?.kind,
    error_list: [],
  });
  const handleInput = (e) => {
    e.persist();
    setRegister({ ...registerInput, [e.target.name]: e.target.value });
  };
  const registerSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post("/api/register", registerInput);
    if (data.status === 200) {
      localStorage.setItem("auth_token", data.token);
      localStorage.setItem("auth_name", data.name);
      localStorage.setItem("user_type", state.kind);
    //   swal("Success", data.message, "success");
	  if(state.kind === "simpleUser"){
      navigate("/");}
	  else {
		  navigate("/createMarket");
	  }
    } else {
      setRegister({ ...registerInput, error_list: res.data.validation_errors });
    }
  };

  useEffect(() => {
    if(isLoggedIn()) navigate("/")
  }, [])
  return (
    <div className="container py-5">
      <div
        className="card"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div
          className="card-body"
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <div className="login100-pic " data-tilt>
            <img src={pic} alt="image" />
          </div>
          <form
            className="login100-form validate-form"
            onSubmit={registerSubmit}
          >
            <span className="login100-form-title">Register</span>
            <div
              className="wrap-input100 validate-input"
              data-validate="name is required"
            >
              <input
                className="input100"
                type="text"
                name="name"
                onChange={handleInput}
                value={registerInput.name || ""}
                placeholder="Full Name"
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-user-circle" aria-hidden="true"></i>
              </span>
              <span style={{ color: "red" }}>
                {registerInput.error_list.name}
              </span>
            </div>

            <div
              className="wrap-input100 validate-input"
              data-validate="Valid email is required: ex@abc.xyz"
            >
              <input
                className="input100"
                type="email"
                name="email"
                onChange={handleInput}
                value={registerInput.email || ""}
                placeholder="Email"
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-envelope" aria-hidden="true"></i>
              </span>
              <span style={{ color: "red" }}>
                {registerInput.error_list.email}
              </span>
            </div>

            <div
              className="wrap-input100 validate-input"
              data-validate="phone number is required"
            >
              <input
                className="input100"
                type="text"
                name="phone_number"
                onChange={handleInput}
                value={registerInput.phone_number || ""}
                placeholder="Phone number"
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
			  <i className="fa fa-phone-square" aria-hidden="true"></i>
              </span>
              <span style={{ color: "red" }}>
                {registerInput.error_list.phone_number}
              </span>
            </div>

            <div
              className="wrap-input100 validate-input"
              data-validate="Password is required"
            >
              <input
                className="input100"
                type="password"
                name="password"
                onChange={handleInput}
                value={registerInput.password || ""}
                placeholder="Password"
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-lock" aria-hidden="true"></i>
              </span>
              <span style={{ color: "red" }}>
                {registerInput.error_list.password}
              </span>
            </div>


            <div className="container-login100-form-btn">
              <button type="submit" className="login100-form-btn">
                Register
              </button>
            </div>

            <div className="text-center p-t-20">
              <Link to={"/login"}>
                Login
                <i
                  className="fa fa-long-arrow-right m-l-5"
                  aria-hidden="true"
                ></i>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
