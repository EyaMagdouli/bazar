import React, { useRef } from 'react';
import Header from './components/layout/Header';
import "bootstrap/dist/css/bootstrap.min.css";
import Body from './components/layout/Body';
import Footer from './components/layout/Footer';

import axios from 'axios';


 axios.defaults.baseURL = "http://127.0.0.1:8000/";
 axios.defaults.headers.post['Content-Type'] = 'application/json';
 axios.defaults.headers.post['Accept'] = 'application/json';
 axios.defaults.withCredentials = true; //to gender with the csrf token
 axios.interceptors.request.use({   //to check if the bearer token has come or not
   function(config) {
     const token = localStorage.getItem('auth_token');
     config.headers.Authorization = 'Bearer ' + token;
     return config;
   }
 });  


export default function App() {
  const prodsRef = useRef(["prdcts","mrktplc","ftrs"])

  /**
   * useEffect(()=>{
   *  pusher.subscribe(`user-${idUSER}-inbox`)
   * },[])
   */

  return (
    <>
      <Header ref={prodsRef} />
      <Body ref={prodsRef} />
      <Footer />
    </>
  )
};
