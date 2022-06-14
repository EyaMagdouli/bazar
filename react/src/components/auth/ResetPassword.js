import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router';
import { useParams } from 'react-router';

const ResetPassword = () => {

  const navigate = useNavigate();

  const [password, setPassword] = useState('')
  const { token } = useParams();


  const submit = async (e) => {
    e.preventDefault()

    axios.post('/api/reset', {
      token,
      password
    }).then((res) => {
      if(res.data.status === 200){
        navigate("/login")
      }
    })
  }

  return (
    <div className='container py-5' style={{top: 90, left: 50}}>
    <div className='card-header' style={{fontSize: 20}}>
        Reset password
    </div>
    <div className="card" style={{display: 'flex',  justifyContent:'center'}}>
      <div className="card-body" style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
        <form onSubmit={submit} className="login100-form validate-form">
        <div className="wrap-input100 validate-input">
            <input className="input100" type="password" name="password" placeholder="New password" 
            onChange={e => setPassword(e.target.value)}/>
            <span className="focus-input100"></span>
        </div>
        <div className="container-login100-form-btn">
          <button type='submit' className="login100-form-btn">
            Reset your password
          </button>
        </div>

        </form>
      </div>
    </div>
  </div>
  )
}

export default ResetPassword