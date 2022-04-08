import axios from "axios";
import React from "react";
import {useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import '../../assets/css/auth/auth.css';
import pic from '../../assets/images/auth.jpg'


export default function Login(props) {

	const navigate = useNavigate();
	const [loginInput,setLogin] = useState({
		email: '',
		password: '',
		error_list: [],
	});
	const handleInput = (e) => {
		e.persist();
		setLogin({...loginInput, [e.target.name]: e.target.value })
			
	}

	const loginSubmit = (e) => {
		e.preventDefault();
		const data 	= {
			email: loginInput?.email,
			password: loginInput?.password
		}
		axios.get('/sanctum/csrf-cookie').then(response => {
		axios.post(`api/login`,data).then(res =>{
			if(res.data.status === 200){
				localStorage.setItem('auth_token',res.data.token);
				localStorage.setItem('auth_name',res.data.name);
				//swal('Logged In successfully',res.data.message,"success");
				navigate('/');
			}
			else if(res.data.status === 401){
				swal('warning',res.data.message,"warning");
			}
			else{
				setLogin({...loginInput, error_list: res.data.validation_errors });
			}
		})
	});

	}




    return (
      <div className='container py-5'>
      <div className="card" style={{display: 'flex',  justifyContent:'center'}}>
        <div className="card-body" style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
				<div className="login100-pic js-tilt" data-tilt >
					<img src={pic} alt="image" />
				</div>
				<form onSubmit={loginSubmit} className="login100-form validate-form">
					<span className="login100-form-title">
						Login
					</span>

					<div className="wrap-input100 validate-input" >
						<input className="input100" type="email" name="email" onChange={handleInput} value={loginInput.email} placeholder="Email"/>
						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<i className="fa fa-envelope" aria-hidden="true"></i>
						</span>
						<span style={{ 'color': "red" }}>
							{loginInput.error_list.email}
						</span>
					</div>

					<div className="wrap-input100 validate-input" >
						<input className="input100" type="password" name="password" onChange={handleInput} value={loginInput.password}  placeholder="Password"/>
						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<i className="fa fa-lock" aria-hidden="true"></i>
						</span>
						<span style={{ 'color': "red" }}>
							{loginInput.error_list.password}
						</span>
					</div>
					
					<div className="container-login100-form-btn">
						<button type="submit" className="login100-form-btn">
							Login
						</button>
					</div>

					<div className="text-center p-t-12 txt2">
						<Link to={'forgotPassword'}>
							 Forgot Password?
						</Link>
					</div>

					<div className="text-center p-t-20 txt2">
						<Link to={'/register'}>
							Register
							<i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
						</Link>
					</div>
				</form>
			</div>
		</div>
	</div>
    );
  }