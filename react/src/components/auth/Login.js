import React from "react";
import { Link } from "react-router-dom";
import './css/auth.css';
import pic from './images/auth.jpg'
export default function Login(props) {
    return (
      <div className='container py-5'>
      <div className="card" style={{display: 'flex',  justifyContent:'center'}}>
        <div className="card-body" style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
				<div className="login100-pic js-tilt" data-tilt>
					<img src={pic} alt="image"/>
				</div>
				<form className="login100-form validate-form">
					<span className="login100-form-title">
						Login
					</span>

					<div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
						<input className="input100" type="text" name="email" placeholder="Email"/>
						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<i className="fa fa-envelope" aria-hidden="true"></i>
						</span>
					</div>

					<div className="wrap-input100 validate-input" data-validate = "Password is required">
						<input className="input100" type="password" name="pass" placeholder="Password"/>
						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<i className="fa fa-lock" aria-hidden="true"></i>
						</span>
					</div>
					
					<div className="container-login100-form-btn">
						<button className="login100-form-btn">
							Login
						</button>
					</div>

					<div className="text-center p-t-12">
						<Link to={'forgotPassword'}>
						<a className="txt2" href="#">
							 Forgot Password?
						</a>
						</Link>
					</div>

					<div className="text-center p-t-20">
						<Link to={'/register'}>
						<a className="txt2" href="#">
							Register
							<i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
						</a>
						</Link>
					</div>
				</form>
			</div>
		</div>
	</div>
    );
  }