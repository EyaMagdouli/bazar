import React, { useState } from 'react'
import '../../assets/css/auth/auth.css';
import axios from 'axios';
import swal from 'sweetalert';

export default function ForgotPassword() {

  const [email, setEmail] = useState('')
  // const [notify, setNotify] = useState({
  //   show: false,
  //   error: false,
  //   message: ''
  // })

  const submit = async (e) => {
    e.preventDefault();
    axios.post(`/api/forgot`, {email}).then((res) => {
    // console.log(email)
      if(res.data.status === 200){
        swal("Success",'An email was sent', "success")
        console.log(email)
      }
      else if(res.data.status === 404) {
        swal("Waring",'Email does not exist', "warning")

      }
    })/* .catch((e)=> {
      console.log('hh')
    }) */
  }



  return (
    <div className='container py-5' style={{top: 90, left: 50}}>
      <div className='card-header' style={{fontSize: 20}}>
          Forgot password
      </div>
      <div className="card" style={{display: 'flex',  justifyContent:'center'}}>
        <div className="card-body" style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
          <form onSubmit={submit} className="login100-form validate-form">
          <div className="wrap-input100 validate-input" data-validate = "Valid email is required">
              <input className="input100" type="text" name="email" placeholder="Email Adress" 
              onChange={e => setEmail(e.target.value)}/>
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-envelope" aria-hidden="true"></i>
              </span>
          </div>
          <div className="container-login100-form-btn">
						<button type='submit' className="login100-form-btn">
							Send Password Reset Link
						</button>
					</div>

          </form>
        </div>
      </div>
    </div>
  )
}
