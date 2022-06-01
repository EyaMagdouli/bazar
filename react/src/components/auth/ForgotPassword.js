import React from 'react'
import '../../assets/css/auth/auth.css';

export default function ForgotPassword() {
  return (
    <div className='container py-5' style={{top: 90, left: 50}}>
      <div className='card-header' style={{fontSize: 20}}>
          Reset password
      </div>
      <div className="card" style={{display: 'flex',  justifyContent:'center'}}>
        <div className="card-body" style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
          <form className="login100-form validate-form">
          <div className="wrap-input100 validate-input" data-validate = "Valid email is required">
              <input className="input100" type="text" name="email" placeholder="Email Adress"/>
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-envelope" aria-hidden="true"></i>
              </span>
          </div>
          <div className="container-login100-form-btn">
						<button className="login100-form-btn">
							Send Password Reset Link
						</button>
					</div>

          </form>
        </div>
      </div>
    </div>
  )
}
