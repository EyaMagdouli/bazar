import axios from "axios";
import React from "react";
import { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import "../../assets/css/auth/auth.css";
import pic from "../../assets/images/auth.jpg";
import { isLoggedIn } from "./checkIsLoggedIn";

export default function Login(props) {

  const navigate = useNavigate();
  const [loginInput, setLogin] = useState({
    email: "",
    password: "",
    error_list: [],
  });
  const handleInput = (e) => {
    e.persist();
    setLogin({ ...loginInput, [e.target.name]: e.target.value });
  };

  const loginSubmit = async(e) => {
    e.preventDefault();
    const {data } = await axios.post(`api/login`, loginInput)
		const {status, name, token, message, validation_errors, kind} = data
      if (status === 200) {
        localStorage.setItem("auth_token", token);
        localStorage.setItem("auth_name", name);
        localStorage.setItem("kind", kind);

        

        //swal('Logged In successfully',message,"success");
        navigate("/");
      } else if (status === 401) {
        swal("warning", message, "warning");
      } else if (status === 422) {
        setLogin({ ...loginInput, error_list: validation_errors });
      }
  };
  useEffect(() => {
    if(isLoggedIn()) {
      navigate("/")
    } 
  }, [])
  return (
    <div className="container py-5" style={{top:"60px", left:"200px", justifyContent:"center"}}>
      <div
        className="card"
        style={{ marginTop: 50, display: "flex", justifyContent: "center",width:800 }}
      >
        <div
          className="card-body"
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}>
          <div className="login100-pic js-tilt" data-tilt>
            <img src={pic} alt="image" style={{ height:"300px"}} />
          </div>
          <form onSubmit={loginSubmit} className="login100-form validate-form">
            <h1 style={{padding:"30px", color:"green", fontWeight:"bold", textAlign:"center" }}>Login</h1>

            <div className="wrap-input100 validate-input">
              <input
                className="input100"
                type="email"
                name="email"
                onChange={handleInput}
                value={loginInput.email}
                placeholder="Email"
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-envelope" aria-hidden="true"></i>
              </span>
              <span style={{ color: "red" }}>
                {loginInput.error_list.email}
              </span>
            </div>

            <div className="wrap-input100 validate-input">
              <input
                className="input100"
                type="password"
                name="password"
                onChange={handleInput}
                value={loginInput.password}
                placeholder="Password"
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i  className="fa fa-lock" aria-hidden="true" ></i>
              </span>
              <span style={{ color: "red" }}>
                {loginInput.error_list.password}
              </span>
            </div>

            <div className="container-login100-form-btn">
              <button type="submit" className="login100-form-btn" style={{fontSize:"20px"}}>
                Login
              </button>
            </div>

            <div className="text-center p-t-12 txt2">
              <Link to={"forgotPassword"} style={{fontSize:"15px"}}>Forgot Password?</Link>
            </div>

            <div className="text-center p-t-20 txt2">
              <Link to={"/register"} style={{fontSize:"15px"}}>
                Register
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
