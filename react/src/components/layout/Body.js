import React from 'react';
import {  Link, Navigate, Route, Routes } from 'react-router-dom';
import  Login from '../auth/Login';
import Register from '../auth/Register';
import Home from './Home';
import CreateMarketplace from '../marketplace/CreateMarketplace';
import ChooseKind from '../auth/ChooseKind';
import ForgotPassword from '../auth/ForgotPassword';


export default function Body() {

  return (
    <Routes> 
      <Route path="/" element={<Home />} />
      <Route path="/login" element={ localStorage.getItem('auth_token') ? <Home /> : <Login />} />
      <Route path="/register" element={ localStorage.getItem('auth_token') ? <Home />  : <Register /> } />
      <Route path="/login/forgotPassword" element={ localStorage.getItem('auth_token') ? <Home />  : <ForgotPassword /> } /> 
      <Route path="/chooseKind" element={ localStorage.getItem('auth_token') ? <Home />  : <ChooseKind /> } />
      <Route path="/createMarket" element={ localStorage.getItem('auth_token') ? <Home />  : <CreateMarketplace /> } />
    </Routes> 
  )
}
