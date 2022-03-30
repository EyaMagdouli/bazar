import React, { useState } from 'react';
import Header from './components/layout/Header';
import "bootstrap/dist/css/bootstrap.min.css";
import Body from './components/layout/Body';
import Footer from './components/layout/Footer';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


// axios.defaults.baseURL = "http://127.0.0.1:8000/";
// axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.headers.post['Accept'] = 'application/json';
// axios.defaults.withCredentials = true;
// axios.interceptors.request.use({
//   function(config) {
//     const token = localStorage.getItem('auth_token');
//     config.headers.Authorization = 'Bearer ' + token;
//     return config;
//   }
// });


export default function App() {
  return (
    <>
      <Header />
      <Body />
      <Footer />
    </>
  )
};
