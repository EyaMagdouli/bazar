import React from 'react'
import { Link } from 'react-router-dom'

const CreateMarketplace = () => {
  return (
    <div className='container py-5'>
        <div className="card" style={{display: 'flex',  justifyContent:'center'}}>
          <div className="card-body" style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
				<div className="login100-pic " data-tilt>
					<img src={pic} alt="image"/>
				</div>
				<form className="login100-form validate-form">
					<span className="login100-form-title">
						Register
					</span>
          <div className="wrap-input100 validate-input" data-validate = "name is required">
						<input className="input100" type="text" name="name" placeholder="Name"/>
						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<i className="fa fa-user-circle" aria-hidden="true"></i>
						</span>
					</div>

					<div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
						<input className="input100" type="text" name="email" placeholder="Email"/>
						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<i className="fa fa-envelope" aria-hidden="true"></i>
						</span>
					</div>

          <div className="wrap-input100 validate-input" data-validate = "phone number is required">
						<input className="input100" type="text" name="phone_number" placeholder="Phone number"/>
						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<i className="fa fa-address-book-o" aria-hidden="true"></i>
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
							Register
						</button>
					</div>
					<div className="text-center p-t-20">
            <Link to={'/login'}>
							Login
							<i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
            </Link>
					</div>
				</form>
          </div>  
        </div>
      </div>
  )
}

export default CreateMarketplace