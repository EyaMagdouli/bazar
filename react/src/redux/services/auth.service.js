import axios from 'axios'
import React from 'react'


const API_URL ="http://127.0.0.1:8000/api/auth/"
const register= (name,email,password) => {
  return (
    axios.post(API_URL+"register",{
        name,
        email,
        password
    })
  )
}


const login =(email,password) => {
    return axios.post(API_URL="login",
    {
        email,
        password
    })
    .then((response)=>{
        if(response.data.accessToken){
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
    })
}

const logout = () => {
    localStorage.removeItem("user");
}
export default {
    register,
    login,
    logout
}